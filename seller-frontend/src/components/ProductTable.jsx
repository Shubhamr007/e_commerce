import React from 'react';
import { Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import ProductApprovalActions from './product/ProductApprovalActions';

export default function ProductTable({
  products,
  columns,
  pageSize,
  setPageSize,
  onRowClick,
  onEditProduct,
}) {
  return (
    <Box sx={{ width: '100%', maxWidth: '100%', overflowX: 'auto' }}>
      <DataGrid
        rows={products.map((p) => ({ ...p, id: p.id }))}
        columns={[
          ...columns,
          {
            field: 'approval',
            headerName: 'Approval',
            flex: 1,
            renderCell: (params) => (
              <ProductApprovalActions
                status={params.row.status}
                onApprove={() =>
                  onEditProduct(params.row.id, { ...params.row, status: 'approved' })
                }
                onReject={() =>
                  onEditProduct(params.row.id, { ...params.row, status: 'rejected' })
                }
              />
            ),
          },
        ]}
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
