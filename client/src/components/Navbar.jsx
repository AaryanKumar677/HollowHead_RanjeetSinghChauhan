import { Link, useNavigate } from 'react-router-dom';
import { Search, Ticket, LayoutDashboard, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-text">FlickyFest</span>
          <span className="logo-dot">.</span>
        </Link>
        
        <div className="nav-links">
          <Link to="/explore" className="nav-item">
            <Search size={20} />
            <span>Explore</span>
          </Link>
          
          {currentUser && (
            <Link to="/profile" className="nav-item">
              <Ticket size={20} />
              <span>My Tickets</span>
            </Link>
          )}

          {currentUser && currentUser.role === 'organizer' && (
            <Link to="/organizer/dashboard" className="nav-item org-portal-btn" style={{ background: 'var(--primary-color)', color: '#fff', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', fontWeight: '600' }}>
              <LayoutDashboard size={18} />
              <span>Organizer Portal</span>
            </Link>
          )}
        </div>
        
        <div className="nav-profile">
          {!currentUser ? (
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Link to="/login" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: '500' }}>Login</Link>
              <Link to="/signup" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Sign Up</Link>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <img src={currentUser.avatar || "https://i.pravatar.cc/150?img=11"} alt="avatar" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid var(--border-color)'}} />
                <span style={{ fontWeight: '500', display: 'none' }} className="user-name-desktop">{currentUser.name}</span>
              </div>
              <button className="profile-btn" onClick={handleLogout} title="Logout" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none' }}>
                <LogOut size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
