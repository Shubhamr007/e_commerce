import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider, Box, Toolbar, Typography, Collapse } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const drawerWidth = 220;

const navGroups = [
  {
    label: 'Main',
    items: [
      { key: 'dashboard', icon: <DashboardIcon />, text: 'Dashboard' },
    ],
  },
  {
    label: 'Management',
    items: [
      { key: 'orders', icon: <ShoppingCartIcon />, text: 'Orders' },
      { key: 'products', icon: <InventoryIcon />, text: 'Products' },
      { key: 'users', icon: <PeopleIcon />, text: 'Users' },
    ],
  },
  {
    label: 'Reports',
    items: [
      { key: 'reports', icon: <BarChartIcon />, text: 'Reports' },
    ],
  },
  {
    label: 'Settings',
    items: [
      { key: 'settings', icon: <SettingsIcon />, text: 'Settings' },
    ],
  },
];

export default function AdminSidebar({ selectedPage, onSelectPage = () => {}, collapsed, onToggleCollapse }) {
  const [openGroups, setOpenGroups] = useState({});

  const handleGroupClick = (label) => {
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
      {/* Collapse/Expand Button at the top, always visible */}
      <Toolbar sx={{ justifyContent: collapsed ? 'center' : 'space-between', px: 2, minHeight: 64 }}>
        {!collapsed && <Typography variant="h6" color="primary">Admin</Typography>}
        <IconButton onClick={onToggleCollapse} size="large">
          {collapsed ? <MenuIcon /> : <MenuIcon sx={{ transform: 'rotate(180deg)' }} />}
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        {navGroups.map((group) => (
          <Box key={group.label}>
            {!collapsed && (
              <ListItem button onClick={() => handleGroupClick(group.label)}>
                <ListItemText primary={group.label} primaryTypographyProps={{ fontWeight: 600, fontSize: 13, color: 'text.secondary' }} />
                {openGroups[group.label] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
            )}
            <Collapse in={openGroups[group.label] || collapsed} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {group.items.map((item) => (
                  <ListItem
                    button
                    key={item.key}
                    selected={selectedPage === item.key}
                    onClick={() => onSelectPage(item.key)}
                    sx={{ pl: collapsed ? 2 : 4 }}
                  >
                    <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 'auto' : 2, justifyContent: 'center' }}>{item.icon}</ListItemIcon>
                    {!collapsed && <ListItemText primary={item.text} />}
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </Box>
        ))}
      </List>
    </Box>
  );
}
