import React from 'react';
import { Typography, Box } from '@mui/material';
import SellerAnalyticsGraphs from './SellerAnalyticsGraphs';

export default function SellerAnalyticsPage({ products = [], orders = [] }) {
  // Mock sales and inventory data for demonstration
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [1200, 2100, 1800, 2500, 3000, 2700],
  };
  const inventoryData = {
    labels: products.map(p => p.name),
    values: products.map(p => Number(p.stock)),
  };
  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Analytics & Graphs</Typography>
      <SellerAnalyticsGraphs salesData={salesData} inventoryData={inventoryData} />
      {/* Add more analytics or charts as needed */}
    </Box>
  );
}
