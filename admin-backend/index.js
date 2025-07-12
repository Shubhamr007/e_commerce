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

// Admin: List all products (all statuses) with seller info
app.get('/products', auth('ADMIN'), async (req, res) => {
  try {
    // Fetch products from product-service
    const { data: products } = await axios.get(`${PRODUCT_SERVICE_URL}/admin/products`, {
      headers: { Authorization: req.headers.authorization },
    });
    // Fetch all users from user-service
    const { data: users } = await axios.get(`${USER_SERVICE_URL}/users`, {
      headers: { Authorization: req.headers.authorization },
    });
    // Map seller info into products
    const userMap = {};
    users.forEach(u => { userMap[u.id] = u; });
    const enriched = products.map(p => {
      const seller = userMap[p.sellerId] || {};
      return {
        ...p,
        sellerName: seller.name || seller.email || p.sellerId,
        sellerEmail: seller.email || '',
        sellerId: p.sellerId,
      };
    });
    res.json(enriched);
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

// Admin: List all orders
app.get('/orders', auth('ADMIN'), async (req, res) => {
  try {
    const { data } = await axios.get(`${ORDER_SERVICE_URL}/orders`, {
      headers: { Authorization: req.headers.authorization },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Modular route for dashboard endpoints
const dashboardRoutes = require('./routes/dashboard');
app.use('/api/admin/dashboard', dashboardRoutes);

// Error handler middleware (should be last)
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

const PORT = process.env.PORT || 4102;
app.listen(PORT, () => console.log(`Admin backend running on port ${PORT}`));
