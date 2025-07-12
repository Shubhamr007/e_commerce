import React from 'react';
import { Card, CardContent, Typography, Stepper, Step, StepLabel, Box } from '@mui/material';

const STATUS_STEPS = ['Pending', 'Processing', 'Shipped', 'Delivered'];

export default function OrderStatusBoard({ order }) {
  if (!order) return null;
  const currentStep = STATUS_STEPS.findIndex(
    s => s.toLowerCase() === (order.status || 'pending').toLowerCase()
  );
  return (
    <Card sx={{ my: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Order Status</Typography>
        <Stepper activeStep={currentStep >= 0 ? currentStep : 0} alternativeLabel>
          {STATUS_STEPS.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box mt={2}>
          <Typography variant="body2">Order ID: {order.id}</Typography>
          <Typography variant="body2">Placed: {order.createdAt ? new Date(order.createdAt).toLocaleString() : ''}</Typography>
          <Typography variant="body2">Current Status: {order.status}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
