import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/booking', label: 'Book Now' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/videos', label: 'Videos' },
  ];

  const styles = {
    navbar: {
      background: 'white',
      height: '80px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    },
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      maxWidth: '1200px',
      padding: '0 24px',
    },
    logo: {
      color: '#ff69b4',
      fontSize: '1.8rem',
      fontWeight: 'bold',
      textDecoration: 'none',
    },
    logoSpan: {
      color: '#ffc107',
    },
    navMenu: {
      display: 'flex',
      listStyle: 'none',
      gap: '2rem',
      margin: 0,
      padding: 0,
    },
    navItem: {
      listStyle: 'none',
    },
    navLinks: {
      color: '#333',
      textDecoration: 'none',
      padding: '0 1rem',
      fontWeight: 500,
      transition: 'all 0.3s ease',
    },
    adminLink: {
      background: 'linear-gradient(135deg, #ff69b4, #ff1493)',
      color: 'white',
      padding: '8px 20px',
      borderRadius: '25px',
    },
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          Glam<span style={styles.logoSpan}>Studio</span>
        </Link>
        <ul style={styles.navMenu}>
          {navLinks.map((link) => (
            <li key={link.path} style={styles.navItem}>
              <Link
                to={link.path}
                style={{
                  ...styles.navLinks,
                  color: isActive(link.path) ? '#ff69b4' : '#333',
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li style={styles.navItem}>
            <Link
              to="/admin-login"
              style={{ ...styles.navLinks, ...styles.adminLink }}
            >
              Admin
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;