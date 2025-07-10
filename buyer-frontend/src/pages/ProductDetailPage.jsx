import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Divider,
  TextField,
  Chip,
  Paper,
  Grid,
  CircularProgress,
  Rating,
} from '@mui/material';

export default function ProductDetailPage({ onAddToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [qty, setQty] = useState(1);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(4);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:4001/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load product');
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  if (error)
    return (
      <Typography textAlign="center" color="error" mt={4}>
        {error}
      </Typography>
    );
  if (!product) return null;

  return (
    <Box sx={{ py: 6, px: 2, background: 'linear-gradient(to bottom right, #fefce8, #f0fdf4)' }}>
      <Grid container spacing={4} maxWidth="xl" mx="auto">
        {/* Product Image */}
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 4, textAlign: 'center' }}>
            <Box
              component="img"
              src={product.imageUrl || '/vite.svg'}
              alt={product.name}
              sx={{
                width: '100%',
                maxHeight: 400,
                objectFit: 'contain',
                borderRadius: 2,
                background: '#f9f9f9',
              }}
            />
          </Paper>
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              {product.name}
            </Typography>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <Rating value={product.rating || 4.5} precision={0.1} readOnly />
              <Typography variant="body2" color="text.secondary">
                ({product.reviewCount || 24} reviews)
              </Typography>
            </Box>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Availability: <Chip label="In stock" color="success" size="small" />
            </Typography>

            <Box display="flex" alignItems="center" gap={2} my={2}>
              <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
                M.R.P: ${Number(product.mrp || product.price * 1.2).toFixed(2)}
              </Typography>
              <Typography variant="h5" color="error" fontWeight={700}>
                ${Number(product.price).toFixed(2)}
              </Typography>
              <Chip label="38% OFF" color="primary" size="small" />
            </Box>

            <Typography variant="body2" mb={1} color="text.secondary">
              Free shipping for orders above 50 units. Prices are per unit.
            </Typography>

            <Box display="flex" alignItems="center" gap={2} my={2}>
              <Typography>Qty:</Typography>
              <TextField
                type="number"
                size="small"
                value={qty}
                onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                inputProps={{ min: 1, style: { width: 60, textAlign: 'center' } }}
              />
              <Typography variant="caption" color="text.secondary">
                Min. order: 1
              </Typography>
            </Box>

            <Box display="flex" gap={2} mt={3} mb={4} flexWrap="wrap">
              <Button
                variant="contained"
                color="warning"
                size="large"
                sx={{ fontWeight: 700 }}
                onClick={() => onAddToCart(product.id, qty)}
              >
                Add to Cart
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ fontWeight: 700 }}
                onClick={() => window.open('/cart', '_blank')}
              >
                Proceed to Checkout
              </Button>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box>
              <Typography variant="subtitle1" fontWeight={600}>Delivery</Typography>
              <Typography variant="body2" color="text.secondary">
                Usually delivers in 12 to 48 hours
              </Typography>

              <Typography variant="subtitle1" fontWeight={600} mt={2}>Shipping</Typography>
              <Typography variant="body2" color="text.secondary">
                Free shipping on all orders above 50 units*
              </Typography>

              <Typography variant="subtitle1" fontWeight={600} mt={2}>Payment Options</Typography>
              <ul style={{ paddingLeft: '1.2rem', color: '#4b5563', fontSize: '0.9rem' }}>
                <li>Net Banking, Credit/Debit, UPI</li>
                <li>Cash on Delivery</li>
                <li>Bank Transfer / Cheque / DD</li>
              </ul>
            </Box>
          </Paper>
        </Grid>

        {/* Description */}
        <Grid item xs={12}>
          <Paper elevation={1} sx={{ p: 4, borderRadius: 4 }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Product Description
            </Typography>
            <Box display="flex" alignItems="center" gap={2}>
              {product.brandLogo && (
                <img src={product.brandLogo} alt="Brand" style={{ width: 64, height: 32, objectFit: 'contain' }} />
              )}
              <Typography variant="body1" color="text.secondary">
                {product.description}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Specifications */}
        <Grid item xs={12}>
          <Paper elevation={1} sx={{ p: 4, borderRadius: 4 }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Product Specifications
            </Typography>
            <Typography variant="body2" color="text.secondary">(Coming soon...)</Typography>
          </Paper>
        </Grid>

        {/* Reviews */}
        <Grid item xs={12}>
          <Paper elevation={1} sx={{ p: 4, borderRadius: 4 }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Customer Reviews
            </Typography>

            {/* Sample Reviews */}
            <Box mb={2}>
              <Typography fontWeight={600}>Ravi Kumar</Typography>
              <Rating value={5} readOnly size="small" />
              <Typography variant="body2" color="text.secondary">
                Great product. Arrived quickly and quality is excellent.
              </Typography>
            </Box>

            <Box mb={2}>
              <Typography fontWeight={600}>Sneha Mehta</Typography>
              <Rating value={4} readOnly size="small" />
              <Typography variant="body2" color="text.secondary">
                Works well for our project. Would buy again.
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Review Submission */}
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Submit Your Review
            </Typography>
            <Rating
              value={reviewRating}
              onChange={(e, value) => setReviewRating(value)}
            />
            <TextField
              multiline
              rows={3}
              fullWidth
              placeholder="Write your review..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              sx={{ my: 2 }}
            />
            <Button variant="contained" color="primary" sx={{ fontWeight: 600 }}>
              Submit Review
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
