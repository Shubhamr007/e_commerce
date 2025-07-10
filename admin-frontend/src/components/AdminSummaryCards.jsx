import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import SummaryCardDetailsDialog from './SummaryCardDetailsDialog';

export default function AdminSummaryCards({ summary, details = {} }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const items = [
    { label: 'Total Sales', value: summary.totalSales, color: 'primary' },
    { label: 'Orders Today', value: summary.ordersToday, color: 'success' },
    { label: 'Active Users', value: summary.activeUsers, color: 'info' },
    { label: 'Low Stock', value: summary.lowStock, color: 'error' },
  ];
  const columnsMap = {
    'Total Sales': ['Order ID', 'Buyer', 'Seller', 'Order Date', 'Product Details', 'Amount'],
    'Orders Today': ['Order ID', 'Buyer', 'Seller', 'Order Date', 'Product Details', 'Status'],
    'Active Users': ['User ID', 'Name', 'Email', 'Role', 'Last Active'],
    'Low Stock': ['Product ID', 'Product Name', 'Stock', 'Category', 'Seller'],
  };
  return (
    <>
      <Grid container spacing={2} mb={3}>
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.label}>
            <Card sx={{ borderLeft: `6px solid`, borderColor: `${item.color}.main`, cursor: 'pointer' }}
              onClick={() => { setSelectedCard(item.label); setDialogOpen(true); }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">{item.label}</Typography>
                <Typography variant="h5" color={item.color + ".main"}>{item.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <SummaryCardDetailsDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title={selectedCard}
        columns={columnsMap[selectedCard] || []}
        rows={selectedCard ? (details[selectedCard] || []) : []}
      />
    </>
  );
}
