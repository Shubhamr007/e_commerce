import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box, Button, Chip, Divider } from '@mui/material';

export default function ProductDetailDialog({ open, onClose, product, onApprove, onReject, loading }) {
  if (!product) return null;
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Product Details</DialogTitle>
      <DialogContent dividers>
        <Box display="flex" gap={4}>
          <Box flex={1}>
            <img src={product.imageUrl || '/vite.svg'} alt={product.name} style={{ width: 180, height: 180, objectFit: 'contain', borderRadius: 12, background: '#f9f9f9', marginBottom: 16 }} />
            <Typography variant="h6" fontWeight={700}>{product.name}</Typography>
            <Typography variant="body2" color="text.secondary">Category: {product.categoryName}</Typography>
            <Typography variant="body2" color="text.secondary">
              Seller: {product.sellerName || product.sellerEmail || product.sellerId || 'Unknown'}
            </Typography>
            <Typography variant="body2" color="text.secondary">Status: <Chip label={product.status} color={product.status === 'APPROVED' ? 'success' : product.status === 'REJECTED' ? 'error' : 'warning'} size="small" /></Typography>
            <Typography variant="body2" color="text.secondary">Price: ${product.price}</Typography>
            <Typography variant="body2" color="text.secondary">Stock: {product.stock}</Typography>
          </Box>
          <Box flex={2}>
            <Typography variant="subtitle1" fontWeight={600}>Description</Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>{product.description}</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" fontWeight={600}>Additional Info</Typography>
            <Typography variant="body2" color="text.secondary">Created: {product.createdAt ? new Date(product.createdAt).toLocaleString() : '-'}</Typography>
            <Typography variant="body2" color="text.secondary">Last Updated: {product.updatedAt ? new Date(product.updatedAt).toLocaleString() : '-'}</Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        {onApprove && product.status !== 'APPROVED' && (
          <Button onClick={() => onApprove(product.id)} color="success" disabled={loading}>Approve</Button>
        )}
        {onReject && product.status !== 'REJECTED' && (
          <Button onClick={() => onReject(product.id)} color="error" disabled={loading}>Reject</Button>
        )}
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
