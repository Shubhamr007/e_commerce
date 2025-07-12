import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import OrderStatusBoard from '../components/OrderStatusBoard';
import { CircularProgress, Alert, Box } from '@mui/material';

export default function OrderStatusPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchOrder() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        if (!res.ok) throw new Error('Order not found');
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    }
    fetchOrder();
  }, [orderId]);

  return (
    <Box p={3}>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {order && <OrderStatusBoard order={order} />}
    </Box>
  );
}
