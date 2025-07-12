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

function authSeller(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token' });
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (payload.role !== 'SELLER') return res.status(403).json({ error: 'Forbidden' });
    req.sellerId = payload.userId;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

app.get('/my/products', authSeller, async (req, res) => {
  try {
    const { data } = await axios.get(`${PRODUCT_SERVICE_URL}/seller/products`, {
      headers: { Authorization: req.headers.authorization },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/my/products', authSeller, async (req, res) => {
  try {
    const { data } = await axios.post(`${PRODUCT_SERVICE_URL}/products`, req.body, {
      headers: { Authorization: req.headers.authorization },
    });
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.response?.data?.error || err.message });
  }
});

app.get('/api/orders', authSeller, async (req, res) => {
  try {
    const { data } = await axios.get(`${ORDER_SERVICE_URL}/orders/seller`, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.response?.data?.error || err.message });
  }
});

const PORT = process.env.PORT || 4101;
app.listen(PORT, () => console.log(`Seller backend running on port ${PORT}`));
