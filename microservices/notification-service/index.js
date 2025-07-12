const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// In-memory notification store (replace with DB in production)
let notifications = [];

// Create notification
app.post('/notifications', (req, res) => {
  const { userId, type, message, meta } = req.body;
  if (!userId || !type || !message) {
    return res.status(400).json({ error: 'userId, type, and message are required' });
  }
  const notification = {
    id: uuidv4(),
    userId,
    type,
    message,
    meta: meta || {},
    read: false,
    createdAt: new Date().toISOString(),
  };
  notifications.push(notification);
  res.status(201).json(notification);
});

// Get notifications for a user
app.get('/notifications/:userId', (req, res) => {
  const { userId } = req.params;
  const userNotifications = notifications.filter(n => n.userId === userId);
  res.json(userNotifications);
});

// Mark notification as read
app.post('/notifications/:id/read', (req, res) => {
  const { id } = req.params;
  const notif = notifications.find(n => n.id === id);
  if (!notif) return res.status(404).json({ error: 'Notification not found' });
  notif.read = true;
  res.json(notif);
});

const PORT = process.env.PORT || 4005;
app.listen(PORT, () => console.log(`Notification service running on port ${PORT}`));
