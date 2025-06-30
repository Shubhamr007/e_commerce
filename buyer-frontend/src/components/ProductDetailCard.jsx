import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';

export default function ProductDetailCard({ product, onAddToCart }) {
  if (!product) return null;
  return (
    <Card sx={{ maxWidth: 600, m: 'auto', mt: 4, p: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        <CardMedia
          component="img"
          image={product.imageUrl || '/vite.svg'}
          alt={product.name}
          sx={{ width: 260, height: 260, objectFit: 'contain', bgcolor: '#f9f9f9', borderRadius: 2 }}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h4" color="primary.main" fontWeight={700} gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h6" color="secondary.main" gutterBottom>
            ${product.price}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {product.description}
          </Typography>
          <Button variant="contained" color="primary" size="large" onClick={() => onAddToCart(product.id)}>
            Add to Cart
          </Button>
        </CardContent>
      </Box>
    </Card>
  );
}
