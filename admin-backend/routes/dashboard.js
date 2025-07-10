const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const dashboardController = require('../controllers/dashboardController');

// All routes require ADMIN role
router.get('/summary', auth('ADMIN'), dashboardController.getSummary);
router.get('/trends', auth('ADMIN'), dashboardController.getTrends);
router.get('/order-status', auth('ADMIN'), dashboardController.getOrderStatus);
router.get('/metrics', auth('ADMIN'), dashboardController.getMetrics);
router.get('/activities', auth('ADMIN'), dashboardController.getActivities);

module.exports = router;
