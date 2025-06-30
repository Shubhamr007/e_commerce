import { AppBar, Toolbar, Typography, IconButton, InputBase, Badge, Box, Avatar } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import UserMenuDialog from './UserMenuDialog';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.1),
  },
  marginLeft: theme.spacing(3),
  marginRight: theme.spacing(3),
  width: '100%',
  maxWidth: 600,
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  pointerEvents: 'none',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
}));

export default function Header({ user, onLogout, cartCount, onLoginClick, onRegisterClick, onUserClick }) {
  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase()
    : user?.email?.[0]?.toUpperCase() || 'U';

  return (
    <AppBar position="fixed" color="inherit" elevation={1}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src="/vite.svg" alt="Logo" style={{ height: 40 }} />
          <Typography variant="h6" sx={{ ml: 1, color: 'primary.main', fontWeight: 700 }}>
            ShopEase
          </Typography>
        </Box>

        {/* Search */}
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search for products..." />
        </Search>

        {/* Cart + Avatar */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton aria-label="cart" onClick={() => window.location.href = '/cart'}>
            <Badge badgeContent={cartCount} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {/* Avatar/User Section */}
          <IconButton onClick={onUserClick}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36 }}>
              {initials}
            </Avatar>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
