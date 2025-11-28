import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; 

// Helper to get initials
const getInitials = (fullName) => {
    if (!fullName) return 'U';
    const parts = fullName.split(' ').filter(p => p.length > 0);
    if (parts.length > 1) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
};

const TopNavBar = ({ activeLink }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' }, 
    { name: 'Messages', path: '/messages' },
    { name: 'Matches', path: '/matches' },
    { name: 'Profile', path: '/profile' }, 
  ];

  const userInitials = getInitials(user?.fullName);

  return (
    <header className="navbar-container">
      {/* Logo */}
      <Link to="/dashboard" className="navbar-logo">
        <span className="logo-icon">⬢</span> RoomieFind
      </Link>

      {/* Desktop Navigation */}
      <nav className="navbar-links-desktop">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`navbar-link ${activeLink === item.name ? 'active' : ''}`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Actions (Notifications & Avatar) */}
      <div className="navbar-actions">
        <button className="notification-btn">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <div 
          className="user-avatar" 
          style={{ 
              backgroundColor: '#00aeef', 
              color: 'white', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '1rem',
          }} 
          data-alt={`${user?.fullName || 'User Profile'}`}
        >
            {userInitials}
        </div>
        <button onClick={handleLogout} className="logout-btn-mobile">
            Logout
        </button>
      </div>

      {/* Mobile Menu Button (Optional, for future implementation) */}
      <div className="navbar-menu-mobile">
        <span className="material-symbols-outlined">menu</span>
      </div>
    </header>
  );
};

export default TopNavBar;