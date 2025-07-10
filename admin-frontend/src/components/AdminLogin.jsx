import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Tabs, Tab, Link, CircularProgress } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

// Simple SVG illustration placeholder
const DoorIllustration = () => (
  <Box display="flex" alignItems="center" justifyContent="center" height="100%" width="100%">
    <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="40" y="40" width="80" height="140" rx="6" fill="#e3e8f7" />
      <rect x="120" y="40" width="40" height="140" rx="6" fill="#bfcbe6" />
      <circle cx="60" cy="110" r="4" fill="#bfcbe6" />
      <rect x="90" y="120" width="20" height="40" rx="3" fill="#bfcbe6" />
      <rect x="150" y="120" width="10" height="40" rx="2" fill="#a0aec0" />
      <ellipse cx="110" cy="200" rx="70" ry="10" fill="#e3e8f7" />
      <rect x="100" y="80" width="10" height="40" rx="2" fill="#a0aec0" />
      <rect x="80" y="60" width="10" height="30" rx="2" fill="#a0aec0" />
      <rect x="60" y="100" width="10" height="30" rx="2" fill="#a0aec0" />
    </svg>
  </Box>
);

export default function AdminLogin({ onLogin, loading, error }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authMode, setAuthMode] = useState('login');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password, authMode);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #3b5bdb 0%, #4263eb 100%)',
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', sm: 600, md: 900 },
          height: { xs: '100%', sm: 480 },
          background: '#fff',
          borderRadius: 4,
          boxShadow: 6,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          overflow: 'hidden',
        }}
      >
        {/* Illustration Left */}
        <Box
          sx={{
            flex: 1,
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f4f7fe',
            minWidth: 320,
          }}
        >
          <DoorIllustration />
        </Box>
        {/* Login Form Right */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            px: { xs: 3, md: 6 },
            py: { xs: 4, md: 0 },
            minWidth: 320,
          }}
        >
          <Typography variant="h5" fontWeight={700} color="#234" mb={3} align="center">
            Login to Dashboard
          </Typography>
          <Tabs
            value={authMode === 'login' ? 0 : 1}
            onChange={(_, v) => setAuthMode(v === 0 ? 'login' : 'register')}
            centered
            sx={{ mb: 2 }}
          >
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
          <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 340 }}>
            <TextField
              label="Email Address"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              fullWidth
              required
              margin="normal"
              autoComplete="email"
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              fullWidth
              required
              margin="normal"
              autoComplete="current-password"
            />
            <Box display="flex" justifyContent="flex-end" mb={1}>
              <Link href="#" underline="hover" fontSize={14} color="#4263eb">
                Forgot password?
              </Link>
            </Box>
            {error && (
              <Typography color="error" variant="body2" mb={1}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                mt: 1,
                mb: 2,
                borderRadius: 8,
                background: '#4263eb',
                fontWeight: 600,
                fontSize: 16,
                letterSpacing: 1,
                py: 1.2,
                boxShadow: 'none',
                '&:hover': { background: '#3b5bdb' },
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={22} color="inherit" /> : 'LOGIN'}
            </Button>
          </form>
          <Typography variant="body2" color="text.secondary" align="center">
            Don&apos;t have an account?{' '}
            <Link href="#" underline="hover" color="#4263eb">
              Sign up.
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
