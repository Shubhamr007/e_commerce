import { Box, Typography } from '@mui/material';

export default function ComingSoon({ message }) {
  return (
    <Box sx={{ width: '100%', minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', py: 8, background: 'transparent' }}>
      <Typography variant="h4" color="primary" fontWeight={700} gutterBottom>
        🚧 Coming Soon
      </Typography>
      <Typography variant="h6" color="text.secondary">
        {message || 'This page/feature is under development. Please check back soon!'}
      </Typography>
    </Box>
  );
}
