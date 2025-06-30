import React from 'react';
import { Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export default function ProductTable({
  products,
  columns,
  pageSize,
  setPageSize,
  onRowClick,
}) {
  return (
    <Box sx={{ width: '100%', maxWidth: '100%', overflowX: 'auto' }}>
      <DataGrid
        rows={products.map((p) => ({ ...p, id: p.id }))}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
        autoHeight
        disableSelectionOnClick
        sx={{ minWidth: 900 }}
        onRowClick={onRowClick}
      />
    </Box>
  );
}
