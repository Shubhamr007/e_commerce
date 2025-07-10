import React from 'react';
import {
  Toolbar,
  Container,
  Grid,
  Box,
  CssBaseline,
  Drawer,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import './AppFrame.css'; // 🔥 Custom CSS file

export default function AppFrame({
  user,
  lastLogin,
  onLogout,
  selectedPage,
  onSelectPage,
  onChangePassword, // optional if you support change password
  children,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const drawerWidth = 240;
  const collapsedWidth = 64;
  const [collapsed, setCollapsed] = React.useState(false);

  // Sidebar toggle handler
  const handleToggleSidebar = () => setCollapsed((prev) => !prev);

  return (
    <Box className="appframe-main" sx={{ minHeight: '100vh', background: '#f7f8fa' }}>
      <CssBaseline />
      {/* Header - always at the very top, full width, no side gap */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 64,
          zIndex: theme.zIndex.drawer + 1,
          background: 'transparent',
          boxShadow: 'none',
          borderBottom: 'none',
        }}
      >
        <Toolbar disableGutters sx={{ minHeight: 64 }}>
          <AdminHeader
            adminName={user?.name || user?.email || 'Admin User'}
            logoUrl="/vite.svg"
            onLogout={onLogout}
            lastLogin={lastLogin}
            onChangePassword={onChangePassword}
          />
        </Toolbar>
      </Box>
      {/* Main layout below header: sidebar and content horizontally aligned */}
      <Box sx={{ display: 'flex', pt: '64px', minHeight: '100vh' }}>
        {/* Sidebar - collapsible, starts below header, white bg only for actual width */}
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open
          onClose={() => {}}
          PaperProps={{
            sx: {
              width: collapsed ? collapsedWidth : drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: '#fff',
              borderRight: '1px solid #e0e0e0',
              paddingTop: 0,
              transition: 'width 0.3s',
              overflowX: 'hidden',
              top: 64, // start below header
              height: 'calc(100vh - 64px)',
              left: 0,
            },
          }}
          sx={{
            width: collapsed ? collapsedWidth : drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: collapsed ? collapsedWidth : drawerWidth,
              transition: 'width 0.3s',
            },
          }}
        >
          <AdminSidebar
            selectedPage={selectedPage}
            onSelectPage={onSelectPage}
            collapsed={collapsed}
            onToggleCollapse={handleToggleSidebar}
          />
        </Drawer>
        {/* Main Content - adjust width based on sidebar, starts below header */}
        <Box
          sx={{
            flex: 1,
            ml: 0,
            pt: 3,
            px: 3,
            minHeight: 'calc(100vh - 64px)',
            transition: 'margin-left 0.3s',
          }}
        >
          <Container maxWidth="xl" sx={{ pt: 0 }}>
            {/* Remove the white background box for main content */}
            {children}
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
