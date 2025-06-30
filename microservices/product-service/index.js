const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4001;
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cors());
app.use(express.json());
const upload = multer();

// Auth middleware
function auth(requiredRole) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token' });
    const token = authHeader.split(' ')[1];
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'supersecretkey');
      if (requiredRole && payload.role !== requiredRole) {
        return res.status(403).json({ error: 'Forbidden' });
      }
      req.user = payload;
      next();
    } catch {
      res.status(401).json({ error: 'Invalid token' });
    }
  };
}

// Get all approved products (for buyers)
app.get('/products', async (req, res) => {
  const products = await prisma.product.findMany({ where: { status: 'APPROVED' } });
  res.json(products);
});

// Seller creates a new product (status: pending)
app.post('/products', auth('SELLER'), async (req, res) => {
  const { name, price, description, imageUrl, categoryId } = req.body;
  try {
    const product = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        description,
        imageUrl,
        sellerId: req.user.userId,
        status: 'PENDING',
        categoryId,
      },
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin approves a product
app.post('/products/:id/approve', auth('ADMIN'), async (req, res) => {
  try {
    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: { status: 'APPROVED' },
    });
    res.json(product);
  } catch (err) {
    res.status(404).json({ error: 'Product not found or already approved' });
  }
});

// Admin rejects a product
app.post('/products/:id/reject', auth('ADMIN'), async (req, res) => {
  try {
    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: { status: 'REJECTED' },
    });
    res.json(product);
  } catch (err) {
    res.status(404).json({ error: 'Product not found or already rejected' });
  }
});

// Seller can view their own products (all statuses)
app.get('/seller/products', auth('SELLER'), async (req, res) => {
  const products = await prisma.product.findMany({ where: { sellerId: req.user.userId } });
  res.json(products);
});

// Seller creates a new product (status: pending) - correct endpoint for /seller/products
app.post('/seller/products', auth('SELLER'), async (req, res) => {
  const { name, price, description, imageUrl } = req.body;
  try {
    const product = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        description,
        imageUrl,
        sellerId: req.user.userId,
        status: 'PENDING',
      },
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Image upload endpoint
app.post('/products/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'products' },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };
    const result = await streamUpload(req.file.buffer);
    res.json({ url: result.secure_url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Get all products pending moderation
app.get('/products/moderation', auth('ADMIN'), async (req, res) => {
  try {
    const products = await prisma.product.findMany({ where: { status: 'PENDING' } });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get product by ID (only if approved)
app.get('/products/:id', async (req, res) => {
  const product = await prisma.product.findUnique({ where: { id: req.params.id } });
  if (!product || product.status !== 'APPROVED') return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// Get all categories
app.get('/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get category by ID
app.get('/categories/:id', async (req, res) => {
  try {
    const category = await prisma.category.findUnique({ where: { id: req.params.id } });
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get products by category
app.get('/categories/:id/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany({ where: { categoryId: req.params.id, status: 'APPROVED' } });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Product search endpoint
app.get('/products/search', async (req, res) => {
  const q = req.query.q || '';
  const products = await prisma.product.findMany({
    where: {
      status: 'APPROVED',
      OR: [
        { name: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
      ],
    },
  });
  res.json(products);
});

// Seller updates a product
app.put('/seller/products/:id', auth('SELLER'), async (req, res) => {
  try {
    const { name, price, description, imageUrl, categoryId, stock, categoryName } = req.body;
    let updateData = { name, price: parseFloat(price), description, imageUrl, stock: parseInt(stock) };
    if (categoryName) {
      // Create new category if not exists
      let category = await prisma.category.findUnique({ where: { name: categoryName } });
      if (!category) {
        category = await prisma.category.create({ data: { name: categoryName } });
      }
      updateData.categoryId = category.id;
    } else if (categoryId) {
      updateData.categoryId = categoryId;
    }
    const product = await prisma.product.update({
      where: { id: req.params.id, sellerId: req.user.userId },
      data: updateData,
    });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Seller deletes a product
app.delete('/seller/products/:id', auth('SELLER'), async (req, res) => {
  try {
    await prisma.product.delete({ where: { id: req.params.id, sellerId: req.user.userId } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Product Service running on port ${PORT}`);
});
