import React from 'react';
import { Dialog, DialogTitle, DialogContent, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import * as XLSX from 'xlsx';

export default function SummaryCardDetailsDialog({ open, onClose, title, rows, columns }) {
  const handleExport = (type = 'csv') => {
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Details');
    if (type === 'csv') {
      XLSX.writeFile(wb, `${title.replace(/\s/g, '_')}_details.csv`, { bookType: 'csv' });
    } else {
      XLSX.writeFile(wb, `${title.replace(/\s/g, '_')}_details.xlsx`, { bookType: 'xlsx' });
    }
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {title}
        <span>
          <Button size="small" onClick={() => handleExport('csv')}>Export CSV</Button>
          <Button size="small" onClick={() => handleExport('xlsx')}>Export Excel</Button>
          <IconButton onClick={onClose} size="small"><CloseIcon /></IconButton>
        </span>
      </DialogTitle>
      <DialogContent>
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map(col => <TableCell key={col}>{col}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow><TableCell colSpan={columns.length} align="center">No data found</TableCell></TableRow>
            ) : rows.map((row, idx) => (
              <TableRow key={idx}>
                {columns.map(col => <TableCell key={col}>{row[col]}</TableCell>)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
