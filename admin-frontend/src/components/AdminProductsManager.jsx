import React, { useState } from 'react';
import { Box, Tabs, Tab, CircularProgress, Alert } from '@mui/material';
import useApiResource from './useApiResource';
import AdminProductsTable from './AdminProductsTable';

const PRODUCT_STATUSES = [
  { label: 'Pending', value: 'PENDING' },
  { label: 'Approved', value: 'APPROVED' },
  { label: 'Rejected', value: 'REJECTED' }
];

export default function AdminProductsManager() {
  const [tab, setTab] = useState(0);
  const {
    data: products,
    error,
    loading,
    refetch
  } = useApiResource('/products');

  const filtered = products?.filter(p => (p.status || 'PENDING') === PRODUCT_STATUSES[tab].value) || [];

  // If no products match the selected status, show all products as fallback
  const displayProducts = filtered.length > 0 ? filtered : products || [];

  const handleApprove = async (productId) => {
    await fetch(`/products/${productId}/approve`, { method: 'POST' });
    refetch();
  };
  const handleReject = async (productId) => {
    await fetch(`/products/${productId}/reject`, { method: 'POST' });
    refetch();
  };
  const handleView = (product) => {
    // TODO: Implement view product details dialog
    alert(`View product: ${product.name}`);
  };

  return (
    <Box mt={4}>
      <Tabs value={tab} onChange={(_, v) => setTab(v)}>
        {PRODUCT_STATUSES.map((status, idx) => (
          <Tab key={status.value} label={status.label} />
        ))}
      </Tabs>
      {loading ? (
        <Box display="flex" justifyContent="center" my={4}><CircularProgress /></Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <AdminProductsTable
          products={displayProducts}
          onApprove={handleApprove}
          onReject={handleReject}
          onView={handleView}
        />
      )}
    </Box>
  );
}
