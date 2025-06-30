import { Box, Typography, Button } from '@mui/material';
import CartItemCard from '../components/CartItemCard';

export default function CartPage({ cart, onRemove, onQuantityChange, onCheckout }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <Box sx={{ minHeight: '80vh', p: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" fontWeight={700} mb={3} color="primary.main">Your Cart</Typography>
      {cart.length === 0 ? (
        <Typography color="text.secondary">Your cart is empty.</Typography>
      ) : (
        <>
          {cart.map(item => (
            <CartItemCard
              key={item.productId}
              item={item}
              onRemove={onRemove}
              onQuantityChange={onQuantityChange}
            />
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 3, gap: 2 }}>
            <Typography variant="h6" fontWeight={700}>Total: ${total.toFixed(2)}</Typography>
            <Button variant="contained" color="primary" size="large" onClick={onCheckout}>Checkout</Button>
          </Box>
        </>
      )}
    </Box>
  );
}
