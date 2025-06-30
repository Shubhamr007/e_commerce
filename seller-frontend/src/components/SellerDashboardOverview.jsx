import React from 'react';
import { Typography, Box } from '@mui/material';
import DashboardMetrics from './DashboardMetrics';
import RecentOrdersTable from './RecentOrdersTable';

export default function SellerDashboardOverview({ metrics = {}, recentOrders = [], onViewOrder }) {
  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Welcome to your Seller Dashboard
      </Typography>
      <Typography variant="body1" mb={3}>
        Here you can manage your products, view orders, track analytics, and receive notifications.
      </Typography>
      <DashboardMetrics metrics={metrics} />
      <RecentOrdersTable orders={recentOrders} onViewOrder={onViewOrder} />
    </Box>
  );
}
