import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Box, Alert } from '@mui/material';

export default function AddressUpdateForm({ initialAddress = '', initialLocation = null, onSave }) {
  const [address, setAddress] = useState(initialAddress);
  const [location, setLocation] = useState(initialLocation);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await onSave({ address, location });
      setSuccess('Address updated successfully!');
    } catch (err) {
      setError(err.message || 'Failed to update address');
    }
    setLoading(false);
  };

  return (
    <Card sx={{ my: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Update Delivery Address</Typography>
        <form onSubmit={handleSave}>
          <TextField
            label="Address"
            value={address}
            onChange={e => setAddress(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          {/* Optionally add location fields (lat/lng) here */}
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save Address'}
            </Button>
          </Box>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
        </form>
      </CardContent>
    </Card>
  );
}
