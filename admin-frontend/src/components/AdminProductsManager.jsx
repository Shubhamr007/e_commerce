import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab, CircularProgress, Alert } from '@mui/material';
import useApiResource from './useApiResource';
import AdminProductsTable from './AdminProductsTable';
import ProductDetailDialog from './ProductDetailDialog';
import { useAuth } from '../context/AuthContext';

const PRODUCT_STATUSES = [
  { label: 'Pending', value: 'PENDING' },
  { label: 'Approved', value: 'APPROVED' },
  { label: 'Rejected', value: 'REJECTED' }
];

const API_BASE = 'http://localhost:4004'; // Update to your admin-backend base URL

export default function AdminProductsManager() {
  const [tab, setTab] = useState(0);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [users, setUsers] = useState([]);
  const { token } = useAuth();
  const {
    data: products,
    error,
    loading,
    refetch
  } = useApiResource('/products');

  useEffect(() => {
    // Fetch all users once on mount
    fetch(`${API_BASE}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.ok ? res.json() : [])
      .then(data => setUsers(Array.isArray(data) ? data : []) )
      .catch(() => setUsers([]));
  }, [token]);

  const filtered = products?.filter(p => (p.status || 'PENDING') === PRODUCT_STATUSES[tab].value) || [];

  // If no products match the selected status, show all products as fallback
  const displayProducts = filtered.length > 0 ? filtered : products || [];

  const handleApprove = async (productId) => {
    await fetch(`/products/${productId}/approve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    refetch();
    setDetailOpen(false);
  };
  const handleReject = async (productId) => {
    await fetch(`/products/${productId}/reject`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    refetch();
    setDetailOpen(false);
  };
  const handleView = (product) => {
    // Find seller info from cached users
    let seller = users.find(u => u.id === product.sellerId);
    let sellerName = seller ? (seller.name || seller.email || seller.id) : product.sellerName || product.sellerId;
    setSelectedProduct({ ...product, sellerName });
    setDetailOpen(true);
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
        <>
          <AdminProductsTable
            products={displayProducts}
            onApprove={handleApprove}
            onReject={handleReject}
            onView={handleView}
          />
          <ProductDetailDialog
            open={detailOpen}
            onClose={() => setDetailOpen(false)}
            product={selectedProduct}
            onApprove={handleApprove}
            onReject={handleReject}
            loading={loading}
          />
        </>
      )}
    </Box>
  );
}
