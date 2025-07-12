import React from 'react';
import { AppBar, Toolbar, Typography, Box, Avatar, IconButton, InputBase, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminNotifications from './AdminNotifications';

export default function AdminHeader({ adminName, onSearch, logoUrl, onLogout, lastLogin }) {
  return (
    <AppBar position="static" color="default" elevation={1} sx={{ mb: 3 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar src={logoUrl} sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
            <AdminPanelSettingsIcon />
          </Avatar>
          <Typography variant="h6" color="primary">E-Commerce Admin</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: 'grey.100', px: 2, borderRadius: 2 }}>
          <SearchIcon color="action" />
          <InputBase placeholder="Search..." onChange={e => onSearch && onSearch(e.target.value)} sx={{ ml: 1, flex: 1 }} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <AdminNotifications />
          <Box textAlign="right">
            <Typography variant="body1" color="text.secondary">{adminName}</Typography>
            {lastLogin && (
              <Typography variant="caption" color="text.secondary">
                Last login: {new Date(lastLogin).toLocaleString()}
              </Typography>
            )}
          </Box>
          <Avatar sx={{ bgcolor: 'secondary.main' }}>{adminName?.[0] || 'A'}</Avatar>
          <Button onClick={onLogout} color="error" size="small" startIcon={<LogoutIcon />}>Sign out</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
