import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box, Button, Chip } from '@mui/material';

export default function UserDetailDialog({ open, onClose, user, onApprove, onReject, onBlock, loading }) {
  if (!user) return null;
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>User Details</DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="h6">{user.name}</Typography>
          <Typography variant="body2" color="text.secondary">Email: {user.email}</Typography>
          <Typography variant="body2">Role: <Chip label={user.role} size="small" /></Typography>
          <Typography variant="body2">Status: <Chip label={user.status} color={user.status === 'APPROVED' ? 'success' : user.status === 'REJECTED' ? 'error' : 'warning'} size="small" /></Typography>
          {user.createdAt && <Typography variant="body2">Created: {new Date(user.createdAt).toLocaleString()}</Typography>}
          {user.updatedAt && <Typography variant="body2">Updated: {new Date(user.updatedAt).toLocaleString()}</Typography>}
          {user.phone && <Typography variant="body2">Phone: {user.phone}</Typography>}
          {user.address && <Typography variant="body2">Address: {user.address}</Typography>}
          {/* Add more fields as needed */}
        </Box>
      </DialogContent>
      <DialogActions>
        {onApprove && user.status !== 'APPROVED' && (
          <Button onClick={() => onApprove(user.id)} color="success" disabled={loading}>Approve</Button>
        )}
        {onReject && user.status !== 'REJECTED' && (
          <Button onClick={() => onReject(user.id)} color="error" disabled={loading}>Reject</Button>
        )}
        {onBlock && (
          <Button onClick={() => onBlock(user.id)} color="warning" disabled={loading}>Block</Button>
        )}
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
