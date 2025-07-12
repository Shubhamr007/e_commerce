import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent, Button, CircularProgress, Alert, List, ListItem, ListItemText } from '@mui/material';

export default function CheckoutPage({ cart, token }) {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAddress() {
      try {
        const res = await fetch('/api/me/address', {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const data = await res.json();
        setAddress(data.address || '');
      } catch {
        setAddress('');
      }
    }
    fetchAddress();
  }, [token]);

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          items: cart.map(item => ({ productId: item.productId, quantity: item.quantity })),
          address,
        }),
      });
      const data = await res.json();
      if (res.ok && data.id) {
        setSuccess('Order placed successfully!');
        setOrderId(data.id);
        setTimeout(() => navigate(`/order/${data.id}`), 1500);
      } else {
        setError(data.error || 'Order failed');
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  return (
    <Box p={3} maxWidth={600} mx="auto">
      <Typography variant="h4" gutterBottom>Checkout</Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Delivery Address</Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>{address || 'No address on file.'}</Typography>
          <Button variant="outlined" href="/address" sx={{ mb: 2 }}>Edit Address</Button>
        </CardContent>
      </Card>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Order Summary</Typography>
          <List>
            {cart.map(item => (
              <ListItem key={item.productId}>
                <ListItemText primary={`${item.name || item.productId} x${item.quantity}`} secondary={`₹${item.price} each`} />
              </ListItem>
            ))}
          </List>
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Total: ₹{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
          </Typography>
        </CardContent>
      </Card>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      <Button variant="contained" color="primary" fullWidth size="large" onClick={handlePlaceOrder} disabled={loading || !address || cart.length === 0}>
        {loading ? <CircularProgress size={24} /> : 'Place Order'}
      </Button>
    </Box>
  );
}
