import React, { useState } from 'react';
import {
  Typography,
  Box,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  InputLabel,
  Select,
  FormControl,
  Alert,
  Grid,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { ProductForm, ProductTable, ProductDetailDialog } from './product';

export default function SellerProductsPage({
  products = [],
  categories = [],
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  loading = false,
  error = '',
  notification = '',
}) {
  const [form, setForm] = useState({ name: '', price: '', description: '', categoryId: '', stock: '', imageUrl: '', newCategory: '' });
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [editRow, setEditRow] = useState(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await fetch('http://localhost:4001/products/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) setForm((f) => ({ ...f, imageUrl: data.url }));
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitForm = { ...form };
    if (form.newCategory.trim()) {
      submitForm.categoryName = form.newCategory.trim();
      delete submitForm.categoryId;
    }
    if (editRow && onEditProduct) {
      onEditProduct(editRow.id, submitForm);
    } else if (onAddProduct) {
      onAddProduct(submitForm);
    }
    resetForm();
  };

  const resetForm = () => {
    setForm({ name: '', price: '', description: '', categoryId: '', stock: '', imageUrl: '', newCategory: '' });
    setEditRow(null);
    setShowForm(false);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'price', headerName: 'Price', flex: 0.5, valueFormatter: ({ value }) => `$${value}` },
    { field: 'stock', headerName: 'Stock', flex: 0.5 },
    {
      field: 'category',
      headerName: 'Category',
      flex: 1,
      valueGetter: (params) => {
        const cat = categories.find((c) => c.id === params.row.categoryId);
        return cat ? cat.name : '';
      },
    },
    { field: 'status', headerName: 'Status', flex: 0.5 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" color="primary" onClick={() => { setEditRow(params.row); setForm(params.row); setShowForm(true); }}>Edit</Button>
          <Button variant="outlined" color="error" onClick={() => onDeleteProduct && onDeleteProduct(params.row.id)}>Delete</Button>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ px: { xs: 2, sm: 3 }, py: 4, maxWidth: '1400px', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>Manage Your Products</Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => { setShowForm(true); setEditRow(null); }}>
          Add Product
        </Button>
        <Box display="flex" alignItems="center">
          <SearchIcon sx={{ mr: 1 }} />
          <TextField size="small" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </Box>
      </Box>
      {showForm && (
        <ProductForm
          form={form}
          onChange={handleChange}
          onImageChange={handleImageChange}
          onSubmit={handleSubmit}
          onCancel={resetForm}
          uploading={uploading}
          loading={loading}
          categories={categories}
          error={error}
          notification={notification}
          editMode={!!editRow}
        />
      )}
      <ProductTable
        products={filteredProducts}
        columns={columns}
        pageSize={pageSize}
        setPageSize={setPageSize}
        onRowClick={(params) => {
          setSelectedProduct(params.row);
          setDetailDialogOpen(true);
        }}
      />
      <ProductDetailDialog
        open={detailDialogOpen}
        onClose={() => setDetailDialogOpen(false)}
        product={selectedProduct}
        categories={categories}
      />
    </Box>
  );
}
