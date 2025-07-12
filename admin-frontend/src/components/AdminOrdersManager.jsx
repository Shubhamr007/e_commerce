import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Alert } from '@mui/material';
import AdminOrdersTable from './AdminOrdersTable';
import OrderDetailDialog from './OrderDetailDialog';
import useApiResource from './useApiResource';
import { useAuth } from '../context/AuthContext';

export default function AdminOrdersManager() {
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { token } = useAuth();
  const {
    data: orders,
    error,
    loading,
    refetch
  } = useApiResource('/orders');

  const handleView = (order) => {
    setSelectedOrder(order);
    setDetailOpen(true);
  };

  return (
    <Box mt={4}>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      <AdminOrdersTable orders={orders || []} onView={handleView} />
      <OrderDetailDialog open={detailOpen} order={selectedOrder} onClose={() => setDetailOpen(false)} />
    </Box>
  );
}
