import React, { useState } from 'react';
import { Typography, Box, CircularProgress, Alert } from '@mui/material';
import RecentOrdersTable from './RecentOrdersTable';
import useApiResource from './useApiResource';

export default function SellerOrdersPage() {
  const { data: orders, error, loading, refetch } = useApiResource('/api/orders');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    // Optionally open a dialog for order details
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Order Management
      </Typography>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {orders && (
        <RecentOrdersTable orders={orders} onViewOrder={handleViewOrder} />
      )}
      {/* TODO: Add OrderDetailDialog for selectedOrder if needed */}
    </Box>
  );
}
