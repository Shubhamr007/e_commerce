import React from 'react';
import { Typography, Box } from '@mui/material';

export default function SellerNotificationsPage() {
  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Notifications
      </Typography>
      {/* Notifications list and management UI will go here */}
      <Typography variant="body2">Coming soon: Get notified about new orders and updates here.</Typography>
    </Box>
  );
}
