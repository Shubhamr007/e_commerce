import { Card, CardContent, CardMedia, Typography, Button, Box, Chip } from '@mui/material';

export default function ProductCard({ product, onAddToCart, onViewDetails }) {
  return (
    <Card
      sx={{
        minWidth: 220,
        maxWidth: 300,
        m: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 360,
        borderRadius: 3,
        boxShadow: '0 2px 16px 0 #f8b50022',
        border: '1px solid #ffe082',
        transition: 'box-shadow 0.2s, border-color 0.2s',
        '&:hover': {
          boxShadow: '0 6px 32px 0 #ff6a0033',
          borderColor: '#ffb300',
        },
        background: '#fffbe6',
      }}
    >
      <Box sx={{ position: 'relative' }}>
        {product.tag && (
          <Chip
            label={product.tag}
            color={product.tag === 'Hot' ? 'error' : 'primary'}
            size="small"
            sx={{ position: 'absolute', top: 8, left: 8, zIndex: 2 }}
          />
        )}
        <CardMedia
          component="img"
          height="180"
          image={product.imageUrl || '/vite.svg'}
          alt={product.name}
          sx={{ objectFit: 'contain', bgcolor: '#f9f9f9', borderRadius: 2, mt: 1 }}
        />
      </Box>
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', pb: 2 }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 700, color: 'primary.main', minHeight: 48 }}>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, minHeight: 40 }}>
          {product.description?.slice(0, 60) || ''}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="h6" color="secondary.main">${product.price}</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button size="small" variant="outlined" color="primary" onClick={() => window.open(`/product/${product.id}`, '_blank', 'noopener,noreferrer')}>
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
