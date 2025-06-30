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
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:4004';

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

// Admin: List all products (all statuses)
app.get('/products', auth('ADMIN'), async (req, res) => {
  try {
    const { data } = await axios.get(`${PRODUCT_SERVICE_URL}/admin/products`, {
      headers: { Authorization: req.headers.authorization },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Approve product
app.post('/products/:id/approve', auth('ADMIN'), async (req, res) => {
  try {
    const { data } = await axios.post(`${PRODUCT_SERVICE_URL}/products/${req.params.id}/approve`, {}, {
      headers: { Authorization: req.headers.authorization },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.response?.data?.error || err.message });
  }
});

// Admin: Reject product
app.post('/products/:id/reject', auth('ADMIN'), async (req, res) => {
  try {
    const { data } = await axios.post(`${PRODUCT_SERVICE_URL}/products/${req.params.id}/reject`, {}, {
      headers: { Authorization: req.headers.authorization },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.response?.data?.error || err.message });
  }
});

// Admin: List all users
app.get('/users', auth('ADMIN'), async (req, res) => {
  try {
    const { data } = await axios.get(`${USER_SERVICE_URL}/users`, {
      headers: { Authorization: req.headers.authorization },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 4102;
app.listen(PORT, () => console.log(`Admin backend running on port ${PORT}`));
