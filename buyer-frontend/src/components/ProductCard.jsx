import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';

export default function ProductCard({ product, onAddToCart, onViewDetails }) {
  return (
    <Card sx={{ minWidth: 220, maxWidth: 300, m: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 360 }}>
      <CardMedia
        component="img"
        height="180"
        image={product.imageUrl || '/vite.svg'}
        alt={product.name}
        sx={{ objectFit: 'contain', bgcolor: '#f9f9f9' }}
      />
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 700, color: 'primary.main' }}>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, minHeight: 40 }}>
          {product.description?.slice(0, 60) || ''}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="h6" color="secondary.main">${product.price}</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button size="small" variant="outlined" color="primary" onClick={() => onViewDetails(product.id)}>
              Details
            </Button>
            <Button size="small" variant="contained" color="primary" onClick={() => onAddToCart(product.id)}>
              Add to Cart
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
