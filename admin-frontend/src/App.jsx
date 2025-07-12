import { useEffect, useState } from 'react';
import './App.css';
import AdminLogin from './components/AdminLogin';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminProductsPage from './pages/AdminProductsPage';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminChangePasswordDialog from './components/AdminChangePasswordDialog';
import { AuthProvider, useAuth } from './context/AuthContext';
import AppFrame from './components/AppFrame';
import { jwtDecode } from 'jwt-decode'; // Optional: for token expiry
import ErrorBoundary from './components/ErrorBoundary';
import ComingSoon from './pages/ComingSoon';
import AdminOrdersPage from './pages/AdminOrdersPage';

function AppContent() {
  const { user, token, lastLogin, loading, error, login, logout } = useAuth();

  // Set default page based on role or fallback
  const defaultPage = user?.role === 'agent' ? 'products' : 'dashboard';
  const [selectedPage, setSelectedPage] = useState(defaultPage);
  const [showChangePassword, setShowChangePassword] = useState(false);

  // 🔐 Token auto-expiry check (if not handled inside AuthContext)
  useEffect(() => {
    if (token) {
      try {
        const { exp } = jwtDecode(token);
        if (exp * 1000 < Date.now()) {
          logout();
        }
      } catch {
        logout(); // fallback logout on error
      }
    }
  }, [token, logout]);

  // 🪪 Dynamic document title
  useEffect(() => {
    if (token) {
      const pageTitle = selectedPage.charAt(0).toUpperCase() + selectedPage.slice(1);
      document.title = `Admin | ${pageTitle}`;
    } else {
      document.title = 'Admin Login';
    }
  }, [token, selectedPage]);

  // 🔐 Show login screen if not authenticated
  if (!token) {
    return <AdminLogin onLogin={login} loading={loading} error={error} />;
  }

  return (
    <>
      <AppFrame
        user={user}
        lastLogin={lastLogin}
        onLogout={logout}
        selectedPage={selectedPage}
        onSelectPage={setSelectedPage}
        onChangePassword={() => setShowChangePassword(true)}
      >
        {selectedPage === 'dashboard' && <AdminDashboardPage metrics={{}} activities={[]} />}
        {selectedPage === 'products' && <AdminProductsPage />}
        {selectedPage === 'users' && <AdminUsersPage />}
        {selectedPage === 'orders' && <AdminOrdersPage />}
        {/* Show ComingSoon for any not-yet-developed page */}
        {['reports', 'settings'].includes(selectedPage) && (
          <ComingSoon message={`The "${selectedPage.charAt(0).toUpperCase() + selectedPage.slice(1)}" page is under development.`} />
        )}
      </AppFrame>

      {/* 🔒 Change Password Dialog */}
      <AdminChangePasswordDialog
        open={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ErrorBoundary>
  );
}
