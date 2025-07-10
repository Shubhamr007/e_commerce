import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box, Button, TextField } from '@mui/material';

export default function CategorySelect({ categories, value, onChange, onAddCategory }) {
  const [newCategory, setNewCategory] = React.useState('');
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select name="categoryId" value={value} label="Category" onChange={onChange}>
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        size="small"
        label="New Category"
        value={newCategory}
        onChange={e => setNewCategory(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter' && newCategory.trim()) {
            onAddCategory(newCategory.trim());
            setNewCategory('');
          }
        }}
        sx={{ minWidth: 150 }}
      />
      <Button
        variant="outlined"
        size="small"
        onClick={() => {
          if (newCategory.trim()) {
            onAddCategory(newCategory.trim());
            setNewCategory('');
          }
        }}
      >
        Add
      </Button>
    </Box>
  );
}
