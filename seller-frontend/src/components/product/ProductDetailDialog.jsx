import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box, Button } from '@mui/material';

export default function ProductDetailDialog({ open, onClose, product, categories }) {
  if (!product) return null;
  const category = categories.find(c => c.id === product.categoryId);
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Product Details</DialogTitle>
      <DialogContent dividers>
        <Box>
          <Typography variant="h6">{product.name}</Typography>
          <Typography variant="subtitle1" color="text.secondary">Category: {category ? category.name : ''}</Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>Description: {product.description}</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>Price: ${product.price}</Typography>
          <Typography variant="body2">Stock: {product.stock}</Typography>
          <Typography variant="body2">Status: {product.status}</Typography>
          {product.imageUrl && (
            <Box mt={2}><img src={product.imageUrl} alt="Product" style={{ maxWidth: 200, borderRadius: 8 }} /></Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
