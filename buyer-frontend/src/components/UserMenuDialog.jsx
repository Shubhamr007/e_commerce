import { Avatar, Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { useState } from 'react';

export default function UserMenuDialog({ open, onClose, user, onLogout, onLoginClick, onRegisterClick }) {
  const [showLogin, setShowLogin] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Show login/register form if not logged in
  const handleLogin = (e) => {
    e.preventDefault();
    if (onLoginClick) onLoginClick(loginEmail, loginPassword, setLoginError);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>User Information</DialogTitle>
      <DialogContent>
        {user ? (
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, fontSize: 28 }}>
              {user?.name
                ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase()
                : user?.email?.[0]?.toUpperCase() || 'U'}
            </Avatar>
            <Typography variant="h6" align="center">
              {user?.name || 'Guest'}
            </Typography>
            {user?.email && (
              <Typography variant="body2" color="text.secondary" align="center">
                {user.email}
              </Typography>
            )}
          </Box>
        ) : (
          <Box component="form" onSubmit={handleLogin} display="flex" flexDirection="column" gap={2} mt={2}>
            <TextField
              label="Email"
              type="email"
              value={loginEmail}
              onChange={e => setLoginEmail(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              value={loginPassword}
              onChange={e => setLoginPassword(e.target.value)}
              required
              fullWidth
            />
            {loginError && <Typography color="error" variant="body2">{loginError}</Typography>}
            <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
            <Button variant="text" color="primary" fullWidth onClick={onRegisterClick}>Register</Button>
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ flexDirection: 'column', gap: 1, pb: 2 }}>
        {user && (
          <Button variant="contained" color="primary" fullWidth onClick={onLogout}>
            Logout
          </Button>
        )}
        <Button variant="outlined" color="primary" fullWidth onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
