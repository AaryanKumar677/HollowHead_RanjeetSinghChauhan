import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ requiredRole }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    // Return a sleek loading spinner or blank page while checking auth
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--bg-main)' }}>
        <p style={{ color: 'var(--text-muted)' }}>Loading...</p>
      </div>
    );
  }

  // Not logged in? Go to login page
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Logged in, but wrong role?
  if (requiredRole && currentUser.role !== requiredRole) {
    return <Navigate to="/" replace />; // You can redirect to an "Access Denied" page if preferred
  }

  // All good, render the child routes!
  return <Outlet />;
}

export default ProtectedRoute;
