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
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:4004';

function auth(requiredRole) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('Authorization header:', authHeader);
    if (!authHeader) return res.status(401).json({ error: 'No token' });
    const token = authHeader.split(' ')[1];
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      console.log('Decoded JWT payload:', payload);
      if (requiredRole && payload.role !== requiredRole) {
        console.log('Role mismatch:', payload.role, 'required:', requiredRole);
        return res.status(403).json({ error: 'Forbidden' });
      }
      req.user = payload;
      next();
    } catch (err) {
      console.log('JWT error:', err.message);
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

// Buyer: Checkout (place order)
app.post('/checkout', auth('BUYER'), async (req, res) => {
  try {
    const { items, address, location } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Order must contain at least one item.' });
    }
    if (!address || typeof address !== 'string') {
      return res.status(400).json({ error: 'Address is required.' });
    }
    // Forward order to order-service with buyerId
    const orderPayload = {
      buyerId: req.user.userId,
      items,
      address,
      location
    };
    const { data } = await axios.post(`${ORDER_SERVICE_URL}/orders`, orderPayload);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.response?.data?.error || err.message });
  }
});

// Get user address
app.get('/me/address', auth('BUYER'), async (req, res) => {
  try {
    const { data } = await axios.get(`${USER_SERVICE_URL}/me/address`, {
      headers: { Authorization: req.headers.authorization },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.response?.data?.error || err.message });
  }
});

// Update user address
app.post('/me/address', auth('BUYER'), async (req, res) => {
  try {
    const { address, location } = req.body;
    const { data } = await axios.post(`${USER_SERVICE_URL}/me/address`, { address, location }, {
      headers: { Authorization: req.headers.authorization },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.response?.data?.error || err.message });
  }
});

const PORT = process.env.PORT || 4103;
app.listen(PORT, () => console.log(`Buyer backend running on port ${PORT}`));
