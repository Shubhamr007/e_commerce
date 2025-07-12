import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Card, CardContent, Box, Typography, Chip } from '@mui/material';

export default function AdminOrdersTable({ orders = [], onView }) {
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortDir, setSortDir] = useState('desc');

  const sorted = [...orders].sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];
    if (sortBy === 'createdAt') {
      aVal = new Date(aVal);
      bVal = new Date(bVal);
    }
    if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (col) => {
    if (sortBy === col) setSortDir(dir => dir === 'asc' ? 'desc' : 'asc');
    else { setSortBy(col); setSortDir('asc'); }
  };

  return (
    <Box mt={2}>
      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell onClick={() => handleSort('id')}>Order ID</TableCell>
                  <TableCell onClick={() => handleSort('buyerId')}>Buyer</TableCell>
                  <TableCell>Items</TableCell>
                  <TableCell onClick={() => handleSort('total')}>Total</TableCell>
                  <TableCell onClick={() => handleSort('status')}>Status</TableCell>
                  <TableCell onClick={() => handleSort('createdAt')}>Created At</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sorted.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <Typography color="text.secondary">No orders found.</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  sorted.map(order => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.buyerId}</TableCell>
                      <TableCell>
                        {Array.isArray(order.items) ? order.items.map(item => `${item.name} x${item.quantity}`).join(', ') : ''}
                      </TableCell>
                      <TableCell>${order.total}</TableCell>
                      <TableCell>
                        <Chip label={order.status} color={order.status === 'delivered' ? 'success' : order.status === 'cancelled' ? 'error' : 'warning'} size="small" />
                      </TableCell>
                      <TableCell>{order.createdAt ? new Date(order.createdAt).toLocaleString() : ''}</TableCell>
                      <TableCell>
                        <Button size="small" onClick={() => onView(order)}>View</Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}
