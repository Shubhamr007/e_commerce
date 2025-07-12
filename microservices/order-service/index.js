// =========================
// ✅ ORDER SERVICE (PORT 4002)
// =========================

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = process.env.PORT || 4002;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

app.use(cors());
app.use(express.json());

let orders = [];
let orderId = 1;

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

app.get('/orders', (req, res) => {
  res.json(orders);
});

app.post('/orders', async (req, res) => {
  const { buyerId, items, address, location } = req.body;
  if (!Array.isArray(items) || items.length === 0 || !buyerId || !address) {
    return res.status(400).json({ error: 'Invalid order data' });
  }
  try {
    const productRes = await axios.get('http://localhost:4001/products');
    const products = productRes.data;
    let total = 0;
    const orderItems = items.map(item => {
      const product = products.find(p => p.id === item.productId);
      if (!product) throw new Error(`Product ID ${item.productId} not found`);
      total += product.price * item.quantity;
      return {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        sellerId: product.sellerId
      };
    });
    const newOrder = {
      id: orderId++,
      buyerId,
      items: orderItems,
      address,
      location,
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    orders.push(newOrder);
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/orders/seller', authSeller, (req, res) => {
  const sellerId = req.sellerId;
  const sellerOrders = orders
    .filter(order => order.items.some(item => item.sellerId === sellerId))
    .map(order => ({
      ...order,
      items: order.items.filter(item => item.sellerId === sellerId)
    }));
  res.json(sellerOrders);
});

app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
});