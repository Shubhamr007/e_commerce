const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Register
app.post('/register', async (req, res) => {
  const { email, password, name, role } = req.body;
  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ error: 'Email already registered' });
    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hash, name, role: role?.toUpperCase() || 'BUYER' },
    });
    res.status(201).json({ id: user.id, email: user.email, name: user.name, role: user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Auth middleware
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

// Get current user
app.get('/me', auth(), async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.userId } });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ id: user.id, email: user.email, name: user.name, role: user.role, status: user.status });
});

// List all users (admin only)
app.get('/users', auth('ADMIN'), async (req, res) => {
  const users = await prisma.user.findMany({ select: { id: true, email: true, name: true, role: true, status: true } });
  res.json(users);
});

// Admin-only: Create admin user (one-time use, then remove or protect this route)
app.post('/create-admin', async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ error: 'Email already registered' });
    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hash, name, role: 'ADMIN' },
    });
    res.status(201).json({ id: user.id, email: user.email, name: user.name, role: user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Approve seller (admin only)
app.post('/users/:id/approve', auth('ADMIN'), async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { status: 'APPROVED' },
    });
    res.json({ id: user.id, status: user.status });
  } catch (err) {
    res.status(404).json({ error: 'User not found or already approved' });
  }
});

// Reject seller (admin only)
app.post('/users/:id/reject', auth('ADMIN'), async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { status: 'REJECTED' },
    });
    res.json({ id: user.id, status: user.status });
  } catch (err) {
    res.status(404).json({ error: 'User not found or already rejected' });
  }
});

const PORT = process.env.PORT || 4004;
app.listen(PORT, () => console.log(`User service running on port ${PORT}`));
