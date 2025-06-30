import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authMode, setAuthMode] = useState('login');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState('');

  // Fetch products and users if logged in
  useEffect(() => {
    if (!token) return;
    fetch('http://localhost:4001/products/moderation', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]));
    fetch('http://localhost:4004/users', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setUsers)
      .catch(() => setUsers([]));
  }, [token]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`http://localhost:4004/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
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

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
    setProducts([]);
    setUsers([]);
  };

  const handleApproveUser = async (userId) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`http://localhost:4004/users/${userId}/approve`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setUsers(users => users.map(u => u.id === userId ? { ...u, status: 'APPROVED' } : u));
        setNotification('Seller approved.');
      } else {
        const data = await res.json();
        setError(data.error || 'Approval failed');
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  const handleRejectUser = async (userId) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`http://localhost:4004/users/${userId}/reject`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setUsers(users => users.map(u => u.id === userId ? { ...u, status: 'REJECTED' } : u));
        setNotification('Seller rejected.');
      } else {
        const data = await res.json();
        setError(data.error || 'Rejection failed');
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  const handleApproveProduct = async (productId) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`http://localhost:4001/products/${productId}/approve`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setProducts(products => products.map(p => p.id === productId ? { ...p, status: 'APPROVED' } : p));
        setNotification('Product approved.');
      } else {
        const data = await res.json();
        setError(data.error || 'Approval failed');
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  const handleRejectProduct = async (productId) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`http://localhost:4001/products/${productId}/reject`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setProducts(products => products.map(p => p.id === productId ? { ...p, status: 'REJECTED' } : p));
        setNotification('Product rejected.');
      } else {
        const data = await res.json();
        setError(data.error || 'Rejection failed');
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
        <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm flex flex-col gap-4" onSubmit={handleAuth}>
          <h1 className="text-2xl font-bold text-blue-700 mb-2">Admin {authMode === 'login' ? 'Login' : 'Register'}</h1>
          {authMode === 'register' && (
            <input className="border p-2 rounded" type="text" placeholder="Name" value={email} onChange={e => setEmail(e.target.value)} required />
          )}
          <input className="border p-2 rounded" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input className="border p-2 rounded" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button className="bg-blue-600 text-white rounded px-3 py-2" type="submit" disabled={loading}>{loading ? 'Please wait...' : (authMode === 'login' ? 'Login' : 'Register')}</button>
          <button type="button" className="text-xs underline text-purple-600" onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}>
            {authMode === 'login' ? 'No account? Register' : 'Already have an account? Login'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-blue-700">Admin Dashboard</h1>
          <button className="text-xs text-purple-600 underline" onClick={handleLogout}>Logout</button>
        </div>
        {notification && <div className="mb-2 text-blue-600 text-sm">{notification}</div>}
        <h2 className="text-xl font-semibold mb-2">Product Moderation</h2>
        <ul className="divide-y divide-gray-200 mb-6">
          {products.length === 0 && <li className="text-gray-500">No products found.</li>}
          {products.map(p => (
            <li key={p.id} className="py-2 flex justify-between items-center">
              <span>{p.name} <span className={`ml-2 px-2 py-1 rounded text-xs ${p.status === 'APPROVED' ? 'bg-green-100 text-green-700' : p.status === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{p.status}</span></span>
              <span className="text-blue-700 font-semibold">${p.price}</span>
              <div className="flex gap-2">
                <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => handleApproveProduct(p.id)} disabled={loading || p.status === 'APPROVED'}>Approve</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleRejectProduct(p.id)} disabled={loading || p.status === 'REJECTED'}>Reject</button>
              </div>
            </li>
          ))}
        </ul>
        <h2 className="text-xl font-semibold mb-2">Seller Management</h2>
        <ul className="divide-y divide-gray-200 mb-6">
          {users.length === 0 && <li className="text-gray-500">No sellers found.</li>}
          {users.filter(u => u.role === 'SELLER').map(u => (
            <li key={u.id} className="py-2 flex justify-between items-center">
              <span>{u.name} <span className={`ml-2 px-2 py-1 rounded text-xs ${u.status === 'APPROVED' ? 'bg-green-100 text-green-700' : u.status === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{u.status}</span></span>
              <span className="text-blue-700 font-semibold">{u.email}</span>
              <div className="flex gap-2">
                <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => handleApproveUser(u.id)} disabled={loading || u.status === 'APPROVED'}>Approve</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleRejectUser(u.id)} disabled={loading || u.status === 'REJECTED'}>Reject</button>
              </div>
            </li>
          ))}
        </ul>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </div>
    </div>
  );
}

export default App;
