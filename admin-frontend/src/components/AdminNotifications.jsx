import React, { useEffect, useState } from 'react';
import { IconButton, Badge, Menu, MenuItem, ListItemText, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function AdminNotifications({ adminId = 'admin' }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const res = await fetch(`http://localhost:4005/notifications/${adminId}`);
        const data = await res.json();
        setNotifications(Array.isArray(data) ? data : []);
        setUnread(data.filter(n => !n.read).length);
      } catch {
        setNotifications([]);
        setUnread(0);
      }
    }
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, [adminId]);

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleMarkRead = async (id) => {
    await fetch(`http://localhost:4005/notifications/${id}/read`, { method: 'POST' });
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    setUnread(notifications.filter(n => !n.read && n.id !== id).length);
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <Badge badgeContent={unread} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {notifications.length === 0 ? (
          <MenuItem disabled><ListItemText>No notifications</ListItemText></MenuItem>
        ) : notifications.map(n => (
          <MenuItem key={n.id} onClick={() => handleMarkRead(n.id)} selected={!n.read}>
            <ListItemText
              primary={n.message}
              secondary={<Typography variant="caption">{new Date(n.createdAt).toLocaleString()}</Typography>}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
