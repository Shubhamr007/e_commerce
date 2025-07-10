import React from 'react';
import { Box, Button } from '@mui/material';

export default function ProductApprovalActions({ status, onApprove, onReject }) {
  if (status === 'approved') return <Box color="success.main">Approved</Box>;
  if (status === 'rejected') return <Box color="error.main">Rejected</Box>;
  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Button size="small" color="success" variant="contained" onClick={onApprove}>Approve</Button>
      <Button size="small" color="error" variant="outlined" onClick={onReject}>Reject</Button>
    </Box>
  );
}
