import React from 'react';
import { Box, Typography, Button } from '@mui/material';

export default function ErrorPage({ error, resetErrorBoundary }) {
  return (
    <Box sx={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
      <Typography variant="h3" color="error" fontWeight={700} gutterBottom>
        Oops!
      </Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        {error?.message || 'Something went wrong.'}
      </Typography>
      <Button variant="contained" color="primary" onClick={resetErrorBoundary}>
        Try Again
      </Button>
    </Box>
  );
}
