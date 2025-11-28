import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; 

// Reusable Top Navigation Bar component
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
          style={{ backgroundImage: 'url("https://placehold.co/100x100?text=JD")' }} 
          data-alt="User avatar image"
        ></div>
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