import React from 'react';
import { Card, CardContent, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

export default function RecentOrdersTable({ orders, onViewOrder }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" mb={2}>Recent Orders</Typography>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Buyer</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.length === 0 && (
                <TableRow><TableCell colSpan={6} align="center">No recent orders</TableCell></TableRow>
              )}
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.buyerName}</TableCell>
                  <TableCell>${order.amount}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Button size="small" onClick={() => onViewOrder(order)}>View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
