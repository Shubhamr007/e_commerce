// Buyer detail dialog (modular, extend as needed)
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box, Button, Chip, List, ListItem, ListItemText } from '@mui/material';

export default function BuyerDetailDialog({ open, onClose, buyer, onApprove, onReject, loading }) {
  if (!buyer) return null;
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Buyer Details</DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="h6">{buyer.name}</Typography>
          <Typography variant="body2" color="text.secondary">Email: {buyer.email}</Typography>
          <Typography variant="body2">Role: <Chip label={buyer.role} size="small" /></Typography>
          <Typography variant="body2">Status: <Chip label={buyer.status} color={buyer.status === 'APPROVED' ? 'success' : buyer.status === 'REJECTED' ? 'error' : 'warning'} size="small" /></Typography>
          {buyer.createdAt && <Typography variant="body2">Created: {new Date(buyer.createdAt).toLocaleString()}</Typography>}
          {/* Buyer-specific info */}
          <Typography variant="subtitle1" sx={{ mt: 2 }}>Purchases</Typography>
          <List dense>
            {(buyer.purchases || []).length === 0 ? <ListItem><ListItemText primary="No purchases yet." /></ListItem> :
              buyer.purchases.map((purchase, idx) => (
                <ListItem key={idx}><ListItemText primary={purchase.productName} secondary={`Order: ${purchase.orderId}, Status: ${purchase.status}`} /></ListItem>
              ))}
          </List>
          <Typography variant="subtitle1" sx={{ mt: 2 }}>Cart Items</Typography>
          <List dense>
            {(buyer.cart || []).length === 0 ? <ListItem><ListItemText primary="Cart is empty." /></ListItem> :
              buyer.cart.map((item, idx) => (
                <ListItem key={idx}><ListItemText primary={item.productName} secondary={`Qty: ${item.quantity}`} /></ListItem>
              ))}
          </List>
          <Typography variant="subtitle1" sx={{ mt: 2 }}>Reviews</Typography>
          <List dense>
            {(buyer.reviews || []).length === 0 ? <ListItem><ListItemText primary="No reviews yet." /></ListItem> :
              buyer.reviews.map((review, idx) => (
                <ListItem key={idx}><ListItemText primary={review.productName} secondary={`Rating: ${review.rating} - ${review.comment}`} /></ListItem>
              ))}
          </List>
        </Box>
      </DialogContent>
      <DialogActions>
        {onApprove && buyer.status !== 'APPROVED' && (
          <Button onClick={() => onApprove(buyer.id)} color="success" disabled={loading}>Approve</Button>
        )}
        {onReject && buyer.status !== 'REJECTED' && (
          <Button onClick={() => onReject(buyer.id)} color="error" disabled={loading}>Reject</Button>
        )}
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
