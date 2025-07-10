import React from 'react';
import { Dialog, DialogTitle, DialogContent, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function OrderStatusDetailsDialog({ open, onClose, title, orders }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {title}
        <IconButton onClick={onClose} size="small"><CloseIcon /></IconButton>
      </DialogTitle>
      <DialogContent>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Buyer</TableCell>
              <TableCell>Seller</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Product Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow><TableCell colSpan={6} align="center">No orders found</TableCell></TableRow>
            ) : orders.map(order => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.buyerName}</TableCell>
                <TableCell>{order.sellerName}</TableCell>
                <TableCell>{order.reason || '-'}</TableCell>
                <TableCell>{order.orderDate}</TableCell>
                <TableCell>{order.productDetails}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
