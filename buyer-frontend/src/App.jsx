import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import SearchPage from './pages/SearchPage';
import CategoryPage from './pages/CategoryPage';
import Header from './components/Header';
import UserMenuDialog from './components/UserMenuDialog';
import CartPage from './pages/CartPage';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  // Add state to control auth dialog
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // or 'register'
  // Add state to control user info dialog
  const [showUserDialog, setShowUserDialog] = useState(false);

  useEffect(() => {
    fetch('http://localhost:4103/products', {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then(res => res.json())
      .then(data => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]));
  }, [token]);

  useEffect(() => {
    if (token) {
      fetch('http://localhost:4103/cart', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => setCart(data.items || []))
        .catch(() => setCart([]));
    }
  }, [token]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      let body = { email, password };
      if (authMode === 'register') body.name = name;
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

  const handleAddToCart = async (productId) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:4103/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });
      const data = await res.json();
      if (res.ok) {
        setCart((prev) => {
          const idx = prev.findIndex((i) => i.productId === productId);
          if (idx > -1) {
            const updated = [...prev];
            updated[idx].quantity += 1;
            return updated;
          }
          return [...prev, { ...data }];
        });
      } else {
        setError(data.error || 'Add to cart failed');
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  // Remove item from cart
  const handleRemoveFromCart = async (productId) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:4103/cart/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });
      if (res.ok) {
        setCart((prev) => prev.filter((item) => item.productId !== productId));
      } else {
        const data = await res.json();
        setError(data.error || 'Remove from cart failed');
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  // Change quantity in cart
  const handleQuantityChange = async (productId, quantity) => {
    if (quantity < 1) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:4103/cart/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });
      if (res.ok) {
        setCart((prev) => prev.map((item) => item.productId === productId ? { ...item, quantity } : item));
      } else {
        const data = await res.json();
        setError(data.error || 'Update cart failed');
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  // Checkout handler (placeholder)
  const handleCheckout = () => {
    alert('Checkout functionality coming soon!');
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
    setCart([]);
  };

  const handleViewDetails = (productId) => {
    window.open(`/product/${productId}`, '_blank', 'noopener,noreferrer');
  };

  const handleOpenCart = () => {
    window.open('/cart', '_blank', 'noopener,noreferrer');
  };

  const handleOpenCheckout = () => {
    window.open('/checkout', '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <Header
        user={token ? { name, email } : null}
        onLogout={handleLogout}
        cartCount={cart.length}
        onLoginClick={() => { setAuthMode('login'); setShowAuthDialog(true); }}
        onRegisterClick={() => { setAuthMode('register'); setShowAuthDialog(true); }}
        onUserClick={() => setShowUserDialog(true)}
        onCartClick={handleOpenCart}
      />
      {/* User Info Dialog (shows user info and login/register if not logged in) */}
      <UserMenuDialog
        open={showUserDialog}
        onClose={() => setShowUserDialog(false)}
        user={token ? { name, email } : null}
        onLogout={() => { setShowUserDialog(false); handleLogout(); }}
        onLoginClick={() => { setShowUserDialog(false); setAuthMode('login'); setShowAuthDialog(true); }}
        onRegisterClick={() => { setShowUserDialog(false); setAuthMode('register'); setShowAuthDialog(true); }}
      />
      {/* Auth Dialog (Login/Register) */}
      {showAuthDialog && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-30">
          <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm flex flex-col gap-4 relative" onSubmit={handleAuth}>
            <button type="button" className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl" onClick={() => setShowAuthDialog(false)}>&times;</button>
            <h1 className="text-2xl font-bold text-pink-700 mb-2">Buyer {authMode === 'login' ? 'Login' : 'Register'}</h1>
            {authMode === 'register' && (
              <input className="border p-2 rounded" type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
            )}
            <input className="border p-2 rounded" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input className="border p-2 rounded" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button className="bg-pink-600 text-white rounded px-3 py-2" type="submit" disabled={loading}>{loading ? 'Please wait...' : (authMode === 'login' ? 'Login' : 'Register')}</button>
            <button type="button" className="text-xs underline text-indigo-600" onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}>
              {authMode === 'login' ? 'No account? Register' : 'Already have an account? Login'}
            </button>
          </form>
        </div>
      )}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage products={products} onAddToCart={handleAddToCart} onViewDetails={handleViewDetails} />} />
          <Route path="/product/:id" element={<ProductDetailPage onAddToCart={handleAddToCart} />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/cart" element={<CartPage cart={cart} onRemove={handleRemoveFromCart} onQuantityChange={handleQuantityChange} onCheckout={handleCheckout} />} />
          {/* TODO: Add more routes as needed */}
        </Routes>
      </Router>
    </>
  );
}

export default App
