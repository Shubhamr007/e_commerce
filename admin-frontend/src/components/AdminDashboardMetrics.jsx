import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

export default function AdminDashboardMetrics({ metrics }) {
  // metrics: { totalUsers, totalSellers, totalProducts, totalOrders, totalRevenue, pendingApprovals }
  const items = [
    { label: 'Total Users', value: metrics.totalUsers, color: 'primary' },
    { label: 'Total Sellers', value: metrics.totalSellers, color: 'secondary' },
    { label: 'Total Products', value: metrics.totalProducts, color: 'info' },
    { label: 'Total Orders', value: metrics.totalOrders, color: 'success' },
    { label: 'Total Revenue', value: `$${metrics.totalRevenue}`, color: 'warning' },
    { label: 'Pending Approvals', value: metrics.pendingApprovals, color: 'error' },
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
