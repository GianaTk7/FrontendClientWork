import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLinks = [
    { path: '/',         label: 'Home',    },
    { path: '/services', label: 'Services', },
    { path: '/booking',  label: 'Book Now',},
    { path: '/gallery',  label: 'Gallery', },
    { path: '/videos',   label: 'Videos',  },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Jost:wght@200;300;400;500&display=swap');

        :root {
          --rose:       #c2185b;
          --rose-deep:  #880e4f;
          --rose-light: #f8bbd0;
          --rose-pale:  #fce4ec;
          --rose-blush: #fff0f5;
          --dark:       #1a0a10;
          --muted:      #a08090;
          --sidebar-w:  230px;
        }

        /* ── SIDEBAR ── */
        .eg-sidebar {
          position: fixed;
          top: 0; left: 0; bottom: 0;
          width: var(--sidebar-w);
          background: #fff;
          border-right: 1px solid var(--rose-pale);
          z-index: 500;
          display: flex;
          flex-direction: column;
          padding: 2.5rem 0 2rem;
          transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
        }

        /* ── BRAND ── */
        .eg-brand {
          padding: 0 1.8rem 2.2rem;
          border-bottom: 1px solid var(--rose-pale);
          margin-bottom: 1.8rem;
          text-decoration: none;
          display: block;
        }
        .eg-brand-tag {
          font-family: 'Jost', sans-serif;
          font-size: 0.52rem;
          letter-spacing: 0.42em;
          text-transform: uppercase;
          color: var(--rose);
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 400;
        }
        .eg-brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 500;
          color: var(--dark);
          line-height: 1.15;
          display: block;
        }
        .eg-brand-name em {
          font-style: italic;
          color: var(--rose);
          display: block;
          font-size: 1.7rem;
        }

        /* ── NAV LINKS ── */
        .eg-nav {
          flex: 1;
          padding: 0 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          list-style: none;
        }
        .eg-nav-item { list-style: none; }
        .eg-nav-link {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.8rem 1rem;
          color: black;
          text-decoration: none;
          font-family: 'Jost', sans-serif;
          font-size: 0.80rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          font-weight: 400;
          border-left: 2px solid transparent;
          border-radius: 0 6px 6px 0;
          transition: all 0.22s ease;
          position: relative;
        }
        .eg-nav-link:hover {
          color: var(--rose);
          border-left-color: var(--rose-light);
          background: var(--rose-blush);
        }
        .eg-nav-link.active {
          color: var(--rose);
          border-left-color: var(--rose);
          background: var(--rose-blush);
          font-weight: 500;
        }
        .eg-nav-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: currentColor;
          flex-shrink: 0;
          opacity: 0.6;
        }
        .eg-nav-link.active .eg-nav-dot { opacity: 1; }

        /* ── BOTTOM ── */
        .eg-sidebar-bottom {
          padding: 1.8rem 1.8rem 0;
          border-top: 1px solid var(--rose-pale);
          margin-top: 1rem;
        }
        .eg-book-btn {
          display: block;
          background: var(--rose);
          color: #fff;
          text-align: center;
          padding: 0.9rem 1rem;
          text-decoration: none;
          font-family: 'Jost', sans-serif;
          font-size: 0.62rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          font-weight: 500;
          margin-bottom: 1.5rem;
          transition: background 0.2s;
        }
        .eg-book-btn:hover { background: var(--rose-deep); }

        .eg-admin-btn {
          display: block;
          border: 1px solid var(--rose-pale);
          color: var(--muted);
          text-align: center;
          padding: 0.7rem 1rem;
          text-decoration: none;
          font-family: 'Jost', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          font-weight: 400;
          margin-bottom: 1.5rem;
          transition: all 0.2s;
        }
        .eg-admin-btn:hover {
          border-color: var(--rose);
          color: var(--rose);
          background: var(--rose-blush);
        }

        .eg-hours {
          font-family: 'Jost', sans-serif;
          font-size: 0.62rem;
          color: #ddd;
          letter-spacing: 0.04em;
          line-height: 1.9;
        }
        .eg-hours strong {
          display: block;
          font-size: 0.56rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--rose-light);
          margin-bottom: 0.3rem;
          font-weight: 400;
        }

        /* ── MOBILE TOPBAR ── */
        .eg-topbar {
          display: none;
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 62px;
          background: #fff;
          border-bottom: 1px solid var(--rose-pale);
          z-index: 600;
          align-items: center;
          justify-content: space-between;
          padding: 0 1.2rem;
        }
        .eg-topbar-brand {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 500;
          color: var(--dark);
          text-decoration: none;
        }
        .eg-topbar-brand em { font-style: italic; color: var(--rose); }

        /* Hamburger */
        .eg-hamburger {
          width: 38px; height: 38px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
          border-radius: 4px;
        }
        .eg-hamburger span {
          display: block;
          height: 1.5px;
          background: var(--rose);
          transition: all 0.3s ease;
          transform-origin: center;
          border-radius: 2px;
        }
        .eg-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .eg-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .eg-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* Overlay */
        .eg-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(26,10,16,0.5);
          z-index: 490;
          backdrop-filter: blur(2px);
        }
        .eg-overlay.visible { display: block; }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .eg-sidebar {
            transform: translateX(-100%);
            box-shadow: none;
          }
          .eg-sidebar.open {
            transform: translateX(0);
            box-shadow: 8px 0 40px rgba(26,10,16,0.18);
          }
          .eg-topbar { display: flex; }
        }
      `}</style>

      {/* MOBILE TOPBAR */}
      <div className="eg-topbar">
        <Link to="/" className="eg-topbar-brand">
          Esther's <em>Glowious</em>
        </Link>
        <button
          className={`eg-hamburger ${sidebarOpen ? 'open' : ''}`}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* OVERLAY */}
      <div
        className={`eg-overlay ${sidebarOpen ? 'visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* SIDEBAR */}
      <aside className={`eg-sidebar ${sidebarOpen ? 'open' : ''}`}>

        <Link to="/" className="eg-brand" onClick={() => setSidebarOpen(false)}>
          <span className="eg-brand-tag">Luxury Beauty Studio</span>
          <span className="eg-brand-name">
            Esther's
            <em>Glowious</em>
          </span>
        </Link>

        <ul className="eg-nav">
          {navLinks.map((link) => (
            <li key={link.path} className="eg-nav-item">
              <Link
                to={link.path}
                className={`eg-nav-link ${isActive(link.path) ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <span className="eg-nav-dot" />
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="eg-sidebar-bottom">
          <Link
            to="/booking"
            className="eg-book-btn"
            onClick={() => setSidebarOpen(false)}
          >
            Book Appointment
          </Link>
          <Link
            to="/admin-login"
            className="eg-admin-btn"
            onClick={() => setSidebarOpen(false)}
          >
            Admin Login
          </Link>
          <div className="eg-hours">
            <strong>Studio Hours</strong>
            Mon – Sat · 8am – 7pm<br />
            Johannesburg, South Africa
          </div>
        </div>

      </aside>
    </>
  );
};

export default Navbar;