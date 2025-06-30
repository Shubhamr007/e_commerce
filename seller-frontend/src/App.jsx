import { useEffect, useState } from 'react';
import './App.css';
import SellerAuthPage from './pages/SellerAuthPage';
import SellerSidebar from './components/SellerSidebar';
import SellerDashboardOverview from './components/SellerDashboardOverview';
import SellerProductsPage from './components/SellerProductsPage';
import SellerOrdersPage from './components/SellerOrdersPage';
import SellerNotificationsPage from './components/SellerNotificationsPage';
import SellerAnalyticsPage from './components/SellerAnalyticsPage';
import { Box, Toolbar, AppBar, Typography, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [authMode, setAuthMode] = useState('login');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', categoryId: '' });
  const [notification, setNotification] = useState('');
  const [selectedPage, setSelectedPage] = useState('dashboard');
  const [products, setProducts] = useState([]);

  // Fetch seller info and products if logged in
  useEffect(() => {
    if (!token) return;
    fetch('http://localhost:4004/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setName(data.name);
        setStatus(data.status);
      });
    // Fetch categories for product creation
    fetch('http://localhost:4001/categories')
      .then(res => res.json())
      .then(data => setCategories(Array.isArray(data) ? data : []))
      .catch(() => setCategories([]));
    // Fetch notifications (stub)
    fetch('http://localhost:4004/notifications', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setNotification(data[0]?.message || ''))
      .catch(() => setNotification(''));
    // Fetch products
    fetch('http://localhost:4001/seller/products', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]));
  }, [token]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      let body = { email, password };
      if (authMode === 'register') {
        body.name = name;
        body.role = 'SELLER'; // Ensure seller registration sets role
      }
      const res = await fetch(`http://localhost:4004/${authMode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
      } else {
        setError(data.error || 'Auth failed');
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:4001/seller/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProduct),
      });
      const data = await res.json();
      if (res.ok) {
        setNewProduct({ name: '', price: '', description: '', categoryId: '' });
        setNotification('Product submitted for approval.');
      } else {
        setError(data.error || 'Add product failed');
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
    setName('');
    setStatus('');
    setNotification('');
  };

  // Dashboard metrics and recent orders mock (replace with real API calls as needed)
  const dashboardMetrics = {
    totalSales: 120,
    totalRevenue: 54000,
    totalOrders: 98,
    productsInStock: products.reduce((sum, p) => sum + Number(p.stock || 0), 0),
    lowStock: products.filter(p => Number(p.stock) < 5).length,
    pendingOrders: 7,
  };
  const recentOrders = [
    { id: 'ORD-1001', buyerName: 'Alice', amount: 120, status: 'Pending', date: '2025-06-29' },
    { id: 'ORD-1002', buyerName: 'Bob', amount: 250, status: 'Shipped', date: '2025-06-28' },
    { id: 'ORD-1003', buyerName: 'Charlie', amount: 80, status: 'Delivered', date: '2025-06-27' },
    { id: 'ORD-1004', buyerName: 'Diana', amount: 300, status: 'Pending', date: '2025-06-27' },
    { id: 'ORD-1005', buyerName: 'Eve', amount: 150, status: 'Cancelled', date: '2025-06-26' },
  ];

  if (!token) {
    return <SellerAuthPage onAuth={(tok, nm, em) => {
      setToken(tok);
      setName(nm);
      setEmail(em);
      localStorage.setItem('token', tok);
    }} />;
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(to bottom right, #f0fdf4, #fef9c3)' }}>
      <SellerSidebar selectedPage={selectedPage} onSelectPage={setSelectedPage} />
      <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: '#22c55e' }}>
          <Toolbar>
            <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
              Seller Dashboard
            </Typography>
            <Typography variant="body1" sx={{ mr: 2 }}>
              {name}
            </Typography>
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Box sx={{ p: 3 }}>
          {selectedPage === 'dashboard' && (
            <SellerDashboardOverview
              metrics={dashboardMetrics}
              recentOrders={recentOrders}
              onViewOrder={(order) => {
                // TODO: Implement order detail dialog/modal
                alert(`Order details for ${order.id}`);
              }}
            />
          )}
          {selectedPage === 'products' && (
            <SellerProductsPage
              products={products}
              categories={categories}
              onAddProduct={async (form) => {
                setLoading(true);
                setError('');
                try {
                  const res = await fetch('http://localhost:4001/seller/products', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(form),
                  });
                  const data = await res.json();
                  if (res.ok) {
                    setNotification('Product submitted for approval.');
                    setProducts((prev) => [...prev, data]);
                  } else {
                    setError(data.error || 'Add product failed');
                  }
                } catch (err) {
                  setError('Network error');
                }
                setLoading(false);
              }}
              onEditProduct={async (id, form) => {
                setLoading(true);
                setError('');
                try {
                  const res = await fetch(`http://localhost:4001/seller/products/${id}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(form),
                  });
                  const data = await res.json();
                  if (res.ok) {
                    setNotification('Product updated.');
                    setProducts((prev) => prev.map(p => p.id === id ? data : p));
                  } else {
                    setError(data.error || 'Update failed');
                  }
                } catch (err) {
                  setError('Network error');
                }
                setLoading(false);
              }}
              onDeleteProduct={async (id) => {
                setLoading(true);
                setError('');
                try {
                  const res = await fetch(`http://localhost:4001/seller/products/${id}`, {
                    method: 'DELETE',
                    headers: { Authorization: `Bearer ${token}` },
                  });
                  if (res.ok) {
                    setNotification('Product deleted.');
                    setProducts((prev) => prev.filter(p => p.id !== id));
                  } else {
                    const data = await res.json();
                    setError(data.error || 'Delete failed');
                  }
                } catch (err) {
                  setError('Network error');
                }
                setLoading(false);
              }}
              loading={loading}
              error={error}
              notification={notification}
            />
          )}
          {selectedPage === 'orders' && <SellerOrdersPage />}
          {selectedPage === 'notifications' && <SellerNotificationsPage />}
          {selectedPage === 'analytics' && <SellerAnalyticsPage />}
        </Box>
      </Box>
    </Box>
  );
}

export default App;
