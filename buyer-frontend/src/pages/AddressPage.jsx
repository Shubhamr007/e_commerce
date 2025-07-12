import React, { useEffect, useState } from 'react';
import AddressUpdateForm from '../components/AddressUpdateForm';
import { CircularProgress, Alert, Box } from '@mui/material';

export default function AddressPage() {
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchAddress() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('/api/me/address', {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!res.ok) throw new Error('Failed to fetch address');
        const data = await res.json();
        setAddress(data.address || '');
        setLocation(data.location || null);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    }
    fetchAddress();
  }, [token]);

  const handleSave = async ({ address, location }) => {
    const res = await fetch('/api/me/address', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ address, location }),
    });
    if (!res.ok) throw new Error('Failed to update address');
    const data = await res.json();
    setAddress(data.address);
    setLocation(data.location);
  };

  return (
    <Box p={3}>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {!loading && !error && (
        <AddressUpdateForm initialAddress={address} initialLocation={location} onSave={handleSave} />
      )}
    </Box>
  );
}
