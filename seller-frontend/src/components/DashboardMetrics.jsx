import React from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';

export default function DashboardMetrics({ metrics }) {
  // metrics: { totalSales, totalRevenue, totalOrders, productsInStock, lowStock, pendingOrders }
  const items = [
    { label: 'Total Sales', value: metrics.totalSales, color: 'primary' },
    { label: 'Total Revenue', value: `$${metrics.totalRevenue}`, color: 'success' },
    { label: 'Total Orders', value: metrics.totalOrders, color: 'info' },
    { label: 'Products In Stock', value: metrics.productsInStock, color: 'secondary' },
    { label: 'Low Stock Alerts', value: metrics.lowStock, color: 'warning' },
    { label: 'Pending Orders', value: metrics.pendingOrders, color: 'error' },
  ];
  return (
    <Grid container spacing={2} mb={3}>
      {items.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.label}>
          <Card sx={{ borderLeft: `6px solid`, borderColor: `${item.color}.main` }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">{item.label}</Typography>
              <Typography variant="h5" color={item.color + ".main"}>{item.value}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
