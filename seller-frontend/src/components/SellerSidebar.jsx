import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, AppBar, Typography, Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BarChartIcon from '@mui/icons-material/BarChart';

const drawerWidth = 220;

const navItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, page: 'dashboard' },
  { text: 'Products', icon: <InventoryIcon />, page: 'products' },
  { text: 'Orders', icon: <ShoppingCartIcon />, page: 'orders' },
  { text: 'Notifications', icon: <NotificationsIcon />, page: 'notifications' },
  { text: 'Analytics', icon: <BarChartIcon />, page: 'analytics' },
];

export default function SellerSidebar({ selectedPage, onSelectPage }) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {navItems.map((item) => (
            <ListItem
              button
              key={item.text}
              selected={selectedPage === item.page}
              onClick={() => onSelectPage(item.page)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
