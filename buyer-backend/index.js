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
const CART_SERVICE_URL = process.env.CART_SERVICE_URL || 'http://localhost:4003';
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

// Buyer: List approved products
app.get('/products', auth('BUYER'), async (req, res) => {
  try {
    const { data } = await axios.get(`${PRODUCT_SERVICE_URL}/products`);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Buyer: Add to cart
app.post('/cart/add', auth('BUYER'), async (req, res) => {
  try {
    const { data } = await axios.post(`${CART_SERVICE_URL}/cart/${req.user.userId}/add`, req.body, {
      headers: { Authorization: req.headers.authorization },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.response?.data?.error || err.message });
  }
});

// Buyer: View cart
app.get('/cart', auth('BUYER'), async (req, res) => {
  try {
    const { data } = await axios.get(`${CART_SERVICE_URL}/cart/${req.user.userId}`, {
      headers: { Authorization: req.headers.authorization },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Buyer: Update cart item quantity
app.post('/cart/update', auth('BUYER'), async (req, res) => {
  try {
    const { data } = await axios.post(`${CART_SERVICE_URL}/cart/${req.user.userId}/update`, req.body, {
      headers: { Authorization: req.headers.authorization },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.response?.data?.error || err.message });
  }
});

// Buyer: Remove from cart
app.post('/cart/remove', auth('BUYER'), async (req, res) => {
  try {
    const { data } = await axios.post(`${CART_SERVICE_URL}/cart/${req.user.userId}/remove`, req.body, {
      headers: { Authorization: req.headers.authorization },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.response?.data?.error || err.message });
  }
});

// Buyer: Checkout (place order) - placeholder
app.post('/checkout', auth('BUYER'), async (req, res) => {
  res.status(501).json({ error: 'Checkout endpoint not implemented in scaffold' });
});

const PORT = process.env.PORT || 4103;
app.listen(PORT, () => console.log(`Buyer backend running on port ${PORT}`));
