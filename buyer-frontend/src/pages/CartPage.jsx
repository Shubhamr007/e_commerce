import { Box, Typography, Button } from '@mui/material';
import CartItemCard from '../components/CartItemCard';
import './CartPage.css';

export default function CartPage({ cart, onRemove, onQuantityChange, onCheckout }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <div className="cart-main bg-gradient-to-br from-pink-50 to-indigo-50 min-h-screen flex flex-col items-center">
      <Box sx={{ minHeight: '80vh', p: 4, maxWidth: 800, mx: 'auto', width: '100%' }}>
        <Typography variant="h4" fontWeight={700} mb={3} color="primary.main">Your Cart</Typography>
        {cart.length === 0 ? (
          <div className="cart-empty">
            <img src="/assets/empty-cart-screenshot.png" alt="Empty Cart" className="cart-empty-img" />
            <Typography color="text.secondary">Your cart is empty.</Typography>
            <button className="cart-empty-btn" onClick={() => window.location.href = '/'}>Shop now</button>
          </div>
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
              <Typography variant="h6" fontWeight={700}>Total: ₹{total.toFixed(2)}</Typography>
              <Button variant="contained" color="primary" size="large" onClick={onCheckout}>Checkout</Button>
            </Box>
          </>
        )}
      </Box>
    </div>
  );
}
