import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Chip, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

export default function AdminProductsTable({ products = [], onApprove, onReject, onView }) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortDir, setSortDir] = useState('asc');
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  // Filtering
  const filtered = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
      (product.categoryName || '').toLowerCase().includes(search.toLowerCase());
    let matchesDate = true;
    if (startDate && endDate && product.createdAt) {
      const created = dayjs(product.createdAt);
      matchesDate = created.isAfter(dayjs(startDate).subtract(1, 'day')) && created.isBefore(dayjs(endDate).add(1, 'day'));
    }
    return matchesSearch && matchesDate;
  });

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (!sortBy) return 0;
    let aVal = a[sortBy];
    let bVal = b[sortBy];
    if (typeof aVal === 'string') aVal = aVal.toLowerCase();
    if (typeof bVal === 'string') bVal = bVal.toLowerCase();
    if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (col) => {
    if (sortBy === col) setSortDir(dir => dir === 'asc' ? 'desc' : 'asc');
    else { setSortBy(col); setSortDir('asc'); }
  };

  return (
    <Box mt={4} sx={{ width: '100%', background: 'transparent' }}>
      <Card>
        <CardContent>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <TextField
              size="small"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ width: 240 }}
            />
            <DatePicker
              selectsRange
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => setDateRange(update)}
              isClearable
              placeholderText="Select date range"
              className="date-range-picker"
              style={{ width: 220, marginLeft: 8 }}
            />
          </Box>
          <TableContainer sx={{ mt: 2, width: '100%', background: 'transparent', boxShadow: 'none' }}>
            <Table sx={{ minWidth: 1100, width: '100%', background: 'transparent' }}>
              <TableHead>
                <TableRow>
                  {['name', 'categoryName', 'price', 'stock', 'status'].map((col) => (
                    <TableCell key={col} onClick={() => handleSort(col)} style={{ cursor: 'pointer' }}>
                      {col.charAt(0).toUpperCase() + col.slice(1)}
                      {sortBy === col && (sortDir === 'asc' ? <ArrowUpwardIcon fontSize="inherit" sx={{ ml: 0.5 }} /> : <ArrowDownwardIcon fontSize="inherit" sx={{ ml: 0.5 }} />)}
                    </TableCell>
                  ))}
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sorted.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      <Typography color="text.secondary">No products found. This feature/page is coming soon!</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  sorted.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.categoryName || product.categoryId}</TableCell>
                      <TableCell>${product.price}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>
                        <Chip 
                          label={(product.status || 'PENDING').charAt(0) + (product.status || 'PENDING').slice(1).toLowerCase()}
                          color={
                            (product.status || 'PENDING').toUpperCase() === 'APPROVED' ? 'success' :
                            (product.status || 'PENDING').toUpperCase() === 'REJECTED' ? 'error' :
                            'warning'
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Button size="small" onClick={() => onView(product)}>View</Button>
                        {product.status !== 'approved' && (
                          <Button size="small" color="success" onClick={() => onApprove(product.id)}>Approve</Button>
                        )}
                        {product.status !== 'rejected' && (
                          <Button size="small" color="error" onClick={() => onReject(product.id)}>Reject</Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}
