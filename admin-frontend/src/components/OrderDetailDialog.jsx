import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Table, TableBody, TableCell, TableRow } from '@mui/material';

export default function OrderDetailDialog({ open, order, onClose }) {
  if (!order) return null;
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Order Details</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1">Order ID: {order.id}</Typography>
        <Typography variant="subtitle2">Buyer: {order.buyerId}</Typography>
        <Typography variant="subtitle2">Status: {order.status}</Typography>
        <Typography variant="subtitle2">Total: ${order.total}</Typography>
        <Typography variant="subtitle2">Created At: {order.createdAt ? new Date(order.createdAt).toLocaleString() : ''}</Typography>
        <Typography variant="h6" mt={2}>Items</Typography>
        <Table size="small">
          <TableBody>
            {Array.isArray(order.items) && order.items.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>{item.name}</TableCell>
                <TableCell>Qty: {item.quantity}</TableCell>
                <TableCell>Price: ${item.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
