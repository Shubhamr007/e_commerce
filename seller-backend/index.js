const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || 'http://localhost:4001';
const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || 'http://localhost:4002';

function auth(requiredRole) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token' });
    const token = authHeader.split(' ')[1];
    try {
      const payload = jwt.verify(token, JWT_SECRET);
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

// Seller: List own products
app.get('/my/products', auth('SELLER'), async (req, res) => {
  try {
    const { data } = await axios.get(`${PRODUCT_SERVICE_URL}/seller/products`, {
      headers: { Authorization: req.headers.authorization },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Seller: Create product
app.post('/my/products', auth('SELLER'), async (req, res) => {
  try {
    const { data } = await axios.post(`${PRODUCT_SERVICE_URL}/products`, req.body, {
      headers: { Authorization: req.headers.authorization },
    });
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.response?.data?.error || err.message });
  }
});

// Seller: Upload product image
app.post('/my/products/upload', auth('SELLER'), async (req, res) => {
  // Proxy file upload to product-service (implementation needed for file handling)
  res.status(501).json({ error: 'Not implemented in scaffold' });
});

// Seller: View orders for their products (proxy to order-service, implementation placeholder)
app.get('/my/orders', auth('SELLER'), async (req, res) => {
  res.status(501).json({ error: 'Not implemented in scaffold' });
});

const PORT = process.env.PORT || 4101;
app.listen(PORT, () => console.log(`Seller backend running on port ${PORT}`));
