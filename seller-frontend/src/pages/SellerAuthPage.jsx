import { useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Tabs, Tab, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function SellerAuthPage({ onAuth }) {
  const [tab, setTab] = useState(0); // 0: Login, 1: Register
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      let body = { email, password };
      if (tab === 1) body.name = name;
      const res = await fetch(`http://localhost:4004/${tab === 0 ? 'login' : 'register'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...body, role: 'SELLER' }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        onAuth(data.token, data.name || name, email);
      } else {
        setError(data.error || 'Auth failed');
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  return (
    <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" bgcolor="linear-gradient(135deg, #e0ffe7 0%, #fffbe0 100%)">
      <Card sx={{ minWidth: 350, maxWidth: 400, p: 2 }}>
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
            <Avatar sx={{ bgcolor: 'primary.main', mb: 1 }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5" fontWeight={700} color="primary.main">
              Seller {tab === 0 ? 'Login' : 'Register'}
            </Typography>
          </Box>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} centered sx={{ mb: 2 }}>
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
          <form onSubmit={handleSubmit}>
            {tab === 1 && (
              <TextField
                label="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                fullWidth
                required
                margin="normal"
              />
            )}
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            {error && <Typography color="error" variant="body2" mt={1}>{error}</Typography>}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? 'Please wait...' : (tab === 0 ? 'Login' : 'Register')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
