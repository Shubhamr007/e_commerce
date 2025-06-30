import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';

export default function CartItemCard({ item, onRemove, onQuantityChange }) {
  return (
    <Card sx={{ minWidth: 220, maxWidth: 400, m: 1, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <CardMedia
        component="img"
        image={item.imageUrl || '/vite.svg'}
        alt={item.name}
        sx={{ width: 80, height: 80, objectFit: 'contain', bgcolor: '#f9f9f9', borderRadius: 2, ml: 2 }}
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="subtitle1" fontWeight={700}>{item.name}</Typography>
        <Typography variant="body2" color="text.secondary">${item.price} x {item.quantity}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
          <Button size="small" variant="outlined" color="primary" onClick={() => onQuantityChange(item.productId, item.quantity - 1)} disabled={item.quantity <= 1}>-</Button>
          <Typography>{item.quantity}</Typography>
          <Button size="small" variant="outlined" color="primary" onClick={() => onQuantityChange(item.productId, item.quantity + 1)}>+</Button>
          <Button size="small" color="error" onClick={() => onRemove(item.productId)}>Remove</Button>
        </Box>
      </CardContent>
    </Card>
  );
}
