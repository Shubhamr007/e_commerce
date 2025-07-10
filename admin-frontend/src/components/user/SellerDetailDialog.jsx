// Seller detail dialog (modular, extend as needed)
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box, Button, Chip } from '@mui/material';

export default function SellerDetailDialog({ open, onClose, seller, onApprove, onReject, loading }) {
  if (!seller) return null;
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Seller Details</DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="h6">{seller.name}</Typography>
          <Typography variant="body2" color="text.secondary">Email: {seller.email}</Typography>
          <Typography variant="body2">Role: <Chip label={seller.role} size="small" /></Typography>
          <Typography variant="body2">Status: <Chip label={seller.status} color={seller.status === 'APPROVED' ? 'success' : seller.status === 'REJECTED' ? 'error' : 'warning'} size="small" /></Typography>
          {seller.createdAt && <Typography variant="body2">Created: {new Date(seller.createdAt).toLocaleString()}</Typography>}
          {/* Seller-specific info */}
          <Typography variant="body2">Orders Fulfilled: <b>{seller.ordersFulfilled ?? 'N/A'}</b></Typography>
          <Typography variant="body2">Average Rating: <b>{seller.rating ?? 'N/A'}</b></Typography>
          {/* Add more seller stats as needed */}
        </Box>
      </DialogContent>
      <DialogActions>
        {onApprove && seller.status !== 'APPROVED' && (
          <Button onClick={() => onApprove(seller.id)} color="success" disabled={loading}>Approve</Button>
        )}
        {onReject && seller.status !== 'REJECTED' && (
          <Button onClick={() => onReject(seller.id)} color="error" disabled={loading}>Reject</Button>
        )}
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
