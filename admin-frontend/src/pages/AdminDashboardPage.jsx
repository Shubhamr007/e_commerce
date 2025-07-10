import React from 'react';
import { Grid, Box, Typography, Divider, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import AdminSummaryCards from '../components/AdminSummaryCards';
import AdminDashboardCharts from '../components/AdminDashboardCharts';
import AdminRecentActivityTable from '../components/AdminRecentActivityTable';

export default function AdminDashboardPage({ metrics, activities }) {
  // Placeholder/mock data
  const summary = {
    totalSales: '$34,456.00',
    ordersToday: 3456,
    activeUsers: 42456,
    lowStock: 12,
  };
  const details = {
    'Total Sales': [],
    'Orders Today': [],
    'Active Users': [],
    'Low Stock': [],
  };
  const trends = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    sales: [12000, 18000, 22000, 20000, 30000, 34000],
    orders: [800, 1200, 1500, 1400, 2000, 2100],
  };
  const orderStatus = {
    labels: ['Direct', 'Affiliate', 'Sponsored', 'E-mail'],
    data: [38.6, 30, 20, 11.4],
    values: [300.56, 135.18, 154.02, 48.96],
  };
  const salesByLocation = [
    { city: 'New York', value: 72000 },
    { city: 'San Francisco', value: 39000 },
    { city: 'Sydney', value: 25000 },
    { city: 'Singapore', value: 61000 },
  ];
  const topProducts = [
    { name: 'Shirt', price: 76.89, category: 'Man Cloths', quantity: 128, amount: 6647.15 },
    { name: 'T-Shirt', price: 79.80, category: 'Women Cloths', quantity: 89, amount: 6647.15 },
    { name: 'Pant', price: 86.65, category: 'Kid Cloths', quantity: 74, amount: 6647.15 },
    { name: 'Sweater', price: 56.07, category: 'Man Cloths', quantity: 59, amount: 6647.15 },
    { name: 'Light Jacket', price: 36.00, category: 'Women Cloths', quantity: 36, amount: 6647.15 },
    { name: 'Half Shirt', price: 46.78, category: 'Man Cloths', quantity: 58, amount: 6647.15 },
  ];

  return (
    <Box sx={{ p: { xs: 1, md: 2 }, width: '100%', background: 'transparent' }}>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Report Analysis
      </Typography>
      <Grid container spacing={2}>
        {/* Summary Cards - interactive grid */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ p: 2, borderRadius: 3, transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 6, transform: 'translateY(-2px)' }, background: 'transparent' }}>
                <Typography variant="subtitle2" color="text.secondary">Total Sales</Typography>
                <Typography variant="h5" color="primary.main">$34,456.00</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ p: 2, borderRadius: 3, transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 6, transform: 'translateY(-2px)' }, background: 'transparent' }}>
                <Typography variant="subtitle2" color="text.secondary">Total Orders</Typography>
                <Typography variant="h5" color="success.main">3,456</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ p: 2, borderRadius: 3, transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 6, transform: 'translateY(-2px)' }, background: 'transparent' }}>
                <Typography variant="subtitle2" color="text.secondary">Total Revenue</Typography>
                <Typography variant="h5" color="info.main">$1,456.00</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ p: 2, borderRadius: 3, transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 6, transform: 'translateY(-2px)' }, background: 'transparent' }}>
                <Typography variant="subtitle2" color="text.secondary">Total Customers</Typography>
                <Typography variant="h5" color="error.main">42,456</Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {/* Charts Section */}
        <Grid item xs={12} md={8}>
          <Box sx={{ p: 3, borderRadius: 3, background: 'transparent' }}>
            <AdminDashboardCharts trends={trends} orderStatus={orderStatus} />
          </Box>
        </Grid>

        {/* Sales By Location */}
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 3, borderRadius: 3, mb: 3, background: 'transparent' }}>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>
              Sales By Location
            </Typography>
            {salesByLocation.map((loc) => (
              <Box key={loc.city} display="flex" justifyContent="space-between" py={0.75}>
                <Typography color="text.secondary">{loc.city}</Typography>
                <Typography fontWeight={600}>{loc.value.toLocaleString()}K</Typography>
              </Box>
            ))}
          </Box>

          {/* Total Sales Chart Placeholder */}
          <Box sx={{ p: 3, borderRadius: 3, background: 'transparent' }}>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>
              Total Sales Channels
            </Typography>
            <Box display="flex" justifyContent="center" alignItems="center" height={120}>
              <Typography variant="h4" color="primary">
                38.6%
              </Typography>
            </Box>
            <Box mt={1}>
              {orderStatus.labels.map((label, idx) => (
                <Typography key={idx} variant="body2" color="text.secondary">
                  {label}: ${orderStatus.values[idx]}
                </Typography>
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Top Products Table */}
        <Grid item xs={12} md={8}>
          <Box sx={{ p: 3, borderRadius: 3, background: 'transparent' }}>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>
              Top Selling Products
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Product</strong></TableCell>
                    <TableCell><strong>Price</strong></TableCell>
                    <TableCell><strong>Category</strong></TableCell>
                    <TableCell><strong>Quantity</strong></TableCell>
                    <TableCell><strong>Amount</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topProducts.map((prod, idx) => (
                    <TableRow key={idx} hover>
                      <TableCell>{prod.name}</TableCell>
                      <TableCell>${prod.price}</TableCell>
                      <TableCell>{prod.category}</TableCell>
                      <TableCell>{prod.quantity}</TableCell>
                      <TableCell>${prod.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>

        {/* Monthly Target */}
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 3, borderRadius: 3, background: 'transparent' }}>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>
              Monthly Target
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height={120}
              textAlign="center"
            >
              <Typography variant="h4" color="primary">
                75.34%
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>
                You earned $3267 today — higher than last month. Keep up the good work!
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2">Target</Typography>
              <Typography variant="body2">$25k</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2">Revenue</Typography>
              <Typography variant="body2">$18k</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2">Today</Typography>
              <Typography variant="body2">$1.8k</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
