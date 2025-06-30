const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Add item to cart
app.post('/cart/:userId/add', async (req, res) => {
  const { productId, quantity } = req.body;
  const { userId } = req.params;
  try {
    let cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) {
      cart = await prisma.cart.create({ data: { userId } });
    }
    let item = await prisma.cartItem.findFirst({ where: { cartId: cart.id, productId } });
    if (item) {
      item = await prisma.cartItem.update({ where: { id: item.id }, data: { quantity: item.quantity + quantity } });
    } else {
      item = await prisma.cartItem.create({ data: { cartId: cart.id, productId, quantity } });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove item from cart
app.post('/cart/:userId/remove', async (req, res) => {
  const { productId } = req.body;
  const { userId } = req.params;
  try {
    const cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id, productId } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update item quantity in cart
app.post('/cart/:userId/update', async (req, res) => {
  const { productId, quantity } = req.body;
  const { userId } = req.params;
  try {
    const cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    const item = await prisma.cartItem.findFirst({ where: { cartId: cart.id, productId } });
    if (!item) return res.status(404).json({ error: 'Item not found in cart' });
    const updated = await prisma.cartItem.update({ where: { id: item.id }, data: { quantity } });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get cart for user
app.get('/cart/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });
    res.json(cart || { userId, items: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 4003;
app.listen(PORT, () => console.log(`Cart service running on port ${PORT}`));
