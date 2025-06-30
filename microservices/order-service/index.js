const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 4002;

app.use(cors());
app.use(express.json());

// In-memory order store
let orders = [];
let orderId = 1;

// Get all orders
app.get('/orders', (req, res) => {
  res.json(orders);
});

// Get order by ID
app.get('/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

// Create a new order
app.post('/orders', async (req, res) => {
  const { items } = req.body; // items: [{ productId, quantity }]
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Order must contain at least one item.' });
  }

  // Fetch product details from Product Service
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
        quantity: item.quantity
      };
    });
    const newOrder = {
      id: orderId++,
      items: orderItems,
      total,
      createdAt: new Date().toISOString()
    };
    orders.push(newOrder);
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
});
