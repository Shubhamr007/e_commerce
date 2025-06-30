import React from 'react';
import { Card, CardContent, Typography, Box, Grid, TextField, Button, CircularProgress, InputLabel, Select, MenuItem, FormControl, Alert } from '@mui/material';

export default function ProductForm({
  form,
  onChange,
  onImageChange,
  onSubmit,
  onCancel,
  uploading,
  loading,
  categories,
  error,
  notification,
  editMode = false,
}) {
  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h6" mb={2}>{editMode ? 'Edit Product' : 'Add New Product'}</Typography>
        <Box component="form" onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="Name" name="name" value={form.name} onChange={onChange} fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Price" name="price" value={form.price} onChange={onChange} type="number" fullWidth required />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Description" name="description" value={form.description} onChange={onChange} fullWidth multiline rows={2} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select name="categoryId" value={form.categoryId} label="Category" onChange={onChange}>
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Or enter new category" name="newCategory" value={form.newCategory} onChange={onChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Stock" name="stock" value={form.stock} onChange={onChange} type="number" fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" component="label" fullWidth disabled={uploading}>
                {uploading ? <CircularProgress size={20} /> : 'Upload Image'}
                <input type="file" accept="image/*" hidden onChange={onImageChange} />
              </Button>
            </Grid>
            {form.imageUrl && (
              <Grid item xs={12}><img src={form.imageUrl} alt="Preview" style={{ maxWidth: 150, borderRadius: 8 }} /></Grid>
            )}
            {error && <Grid item xs={12}><Alert severity="error">{error}</Alert></Grid>}
            {notification && <Grid item xs={12}><Alert severity="success">{notification}</Alert></Grid>}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading || uploading}>
                {loading ? <CircularProgress size={20} /> : (editMode ? 'Update Product' : 'Add Product')}
              </Button>
              <Button onClick={onCancel} fullWidth sx={{ mt: 1 }}>Cancel</Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}
