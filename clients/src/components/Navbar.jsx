import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/booking', label: 'Book Now' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/videos', label: 'Videos' },
  ];

  const isActive = (path) => location.pathname === path;

  // Close sidebar on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Jost:wght@200;300;400;500&display=swap');

        :root{
          --rose:#c2185b;
          --rose-deep:#880e4f;
          --rose-light:#f8bbd0;
          --rose-pale:#fce4ec;
          --rose-blush:#fff0f5;
          --dark:#1a0a10;
          --muted:#7c6b73;
          --sidebar-w:260px;
        }

        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
        }

        body{
          overflow-x:hidden;
        }

        /* =========================
           SIDEBAR
        ========================= */

        .eg-sidebar{
          position:fixed;
          top:0;
          left:0;
          bottom:0;

          width:var(--sidebar-w);

          background:#fff;

          border-right:1px solid var(--rose-pale);

          z-index:1000;

          display:flex;
          flex-direction:column;

          padding:2rem 0;

          overflow-y:auto;

          transition:transform .35s ease;
        }

        /* Desktop */
        @media (min-width:769px){
          .eg-sidebar{
            transform:translateX(0);
          }
        }

        .eg-brand{
          padding:0 1.5rem 2rem;
          margin-bottom:1.5rem;

          border-bottom:1px solid var(--rose-pale);

          text-decoration:none;
        }

        .eg-brand-tag{
          display:block;

          margin-bottom:.5rem;

          font-family:'Jost',sans-serif;
          font-size:.55rem;
          letter-spacing:.35em;
          text-transform:uppercase;

          color:var(--rose);
        }

        .eg-brand-name{
          display:block;

          font-family:'Cormorant Garamond',serif;
          font-size:1.8rem;
          line-height:1.1;

          color:var(--dark);
        }

        .eg-brand-name em{
          display:block;

          color:var(--rose);

          font-style:italic;
          font-size:2rem;
        }

        /* =========================
           NAV LINKS
        ========================= */

        .eg-nav{
          flex:1;

          padding:0 1rem;

          display:flex;
          flex-direction:column;
          gap:.4rem;

          list-style:none;
        }

        .eg-nav-link{
          display:flex;
          align-items:center;
          gap:.8rem;

          padding:.9rem 1rem;

          text-decoration:none;

          font-family:'Jost',sans-serif;
          font-size:.78rem;
          font-weight:500;
          letter-spacing:.18em;
          text-transform:uppercase;

          color:#111;

          border-left:3px solid transparent;
          border-radius:0 8px 8px 0;

          transition:.25s ease;
        }

        .eg-nav-link:hover{
          background:var(--rose-blush);

          color:var(--rose);

          border-left-color:var(--rose);
        }

        .eg-nav-link.active{
          background:var(--rose-blush);

          color:var(--rose);

          border-left-color:var(--rose);
        }

        .eg-nav-dot{
          width:6px;
          height:6px;

          border-radius:50%;

          background:currentColor;
        }

        /* =========================
           BOTTOM SECTION
        ========================= */

        .eg-sidebar-bottom{
          padding:1.5rem;

          border-top:1px solid var(--rose-pale);
        }

        .eg-book-btn{
          display:block;

          background:var(--rose);
          color:#fff;

          text-align:center;
          text-decoration:none;

          padding:1rem;

          font-family:'Jost',sans-serif;
          font-size:.68rem;
          letter-spacing:.2em;
          text-transform:uppercase;
          font-weight:500;

          margin-bottom:1rem;

          transition:.3s ease;
        }

        .eg-book-btn:hover{
          background:var(--rose-deep);
        }

        .eg-admin-btn{
          display:block;

          padding:.9rem;

          text-align:center;
          text-decoration:none;

          border:1px solid var(--rose-pale);

          color:var(--muted);

          font-family:'Jost',sans-serif;
          font-size:.65rem;
          letter-spacing:.2em;
          text-transform:uppercase;

          margin-bottom:1.3rem;

          transition:.25s ease;
        }

        .eg-admin-btn:hover{
          border-color:var(--rose);

          color:var(--rose);

          background:var(--rose-blush);
        }

        .eg-hours{
          font-family:'Jost',sans-serif;
          font-size:.7rem;

          line-height:1.8;

          color:#666;
        }

        .eg-hours strong{
          display:block;

          margin-bottom:.3rem;

          color:var(--rose);

          font-size:.58rem;
          letter-spacing:.22em;
          text-transform:uppercase;
        }

        /* =========================
           MOBILE TOPBAR
        ========================= */

        .eg-topbar{
          display:none;

          position:fixed;
          top:0;
          left:0;
          right:0;

          height:65px;

          background:#fff;

          border-bottom:1px solid var(--rose-pale);

          z-index:1200;

          padding:0 1rem;

          align-items:center;
          justify-content:space-between;
        }

        .eg-topbar-brand{
          text-decoration:none;

          font-family:'Cormorant Garamond',serif;
          font-size:1.4rem;
          font-weight:500;

          color:var(--dark);
        }

        .eg-topbar-brand em{
          color:var(--rose);

          font-style:italic;
        }

        /* =========================
           HAMBURGER
        ========================= */

        .eg-hamburger{
          width:42px;
          height:42px;

          border:none;
          background:transparent;

          display:flex;
          flex-direction:column;
          justify-content:center;
          gap:6px;

          cursor:pointer;

          padding:6px;
        }

        .eg-hamburger span{
          width:100%;
          height:2px;

          background:#000;

          border-radius:20px;

          transition:.3s ease;
        }

        .eg-hamburger.open span:nth-child(1){
          transform:translateY(8px) rotate(45deg);
        }

        .eg-hamburger.open span:nth-child(2){
          opacity:0;
        }

        .eg-hamburger.open span:nth-child(3){
          transform:translateY(-8px) rotate(-45deg);
        }

        /* =========================
           OVERLAY
        ========================= */

        .eg-overlay{
          position:fixed;
          inset:0;

          background:rgba(0,0,0,.45);

          backdrop-filter:blur(3px);

          z-index:999;

          opacity:0;
          visibility:hidden;

          transition:.3s ease;
        }

        .eg-overlay.visible{
          opacity:1;
          visibility:visible;
        }

        /* =========================
           TABLET
        ========================= */

        @media (max-width:1024px){

          :root{
            --sidebar-w:240px;
          }

          .eg-brand-name{
            font-size:1.6rem;
          }

          .eg-brand-name em{
            font-size:1.8rem;
          }
        }

        /* =========================
           MOBILE
        ========================= */

        @media (max-width:768px){

          .eg-topbar{
            display:flex;
          }

          .eg-sidebar{
            width:85%;
            max-width:320px;

            transform:translateX(-100%);
          }

          .eg-sidebar.open{
            transform:translateX(0);

            box-shadow:0 0 40px rgba(0,0,0,.2);
          }

          .eg-brand{
            padding-top:1rem;
          }

          .eg-nav-link{
            padding:1rem;

            font-size:.75rem;
          }
        }

        /* =========================
           SMALL DEVICES
        ========================= */

        @media (max-width:480px){

          .eg-topbar{
            height:60px;

            padding:0 .8rem;
          }

          .eg-topbar-brand{
            font-size:1.15rem;
          }

          .eg-sidebar{
            width:88%;
          }

          .eg-brand-name{
            font-size:1.45rem;
          }

          .eg-brand-name em{
            font-size:1.6rem;
          }

          .eg-nav-link{
            font-size:.7rem;

            letter-spacing:.14em;
          }

          .eg-book-btn,
          .eg-admin-btn{
            font-size:.6rem;
          }
        }

        /* =========================
           LANDSCAPE PHONES
        ========================= */

        @media (max-height:500px){

          .eg-sidebar{
            padding-top:1rem;
          }

          .eg-brand{
            margin-bottom:1rem;
            padding-bottom:1rem;
          }

          .eg-nav{
            gap:.15rem;
          }

          .eg-nav-link{
            padding:.7rem .9rem;
          }

          .eg-sidebar-bottom{
            padding-top:1rem;
          }
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
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* OVERLAY */}

      <div
        className={`eg-overlay ${sidebarOpen ? 'visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* SIDEBAR */}

      <aside className={`eg-sidebar ${sidebarOpen ? 'open' : ''}`}>

        <Link
          to="/"
          className="eg-brand"
          onClick={() => setSidebarOpen(false)}
        >
          <span className="eg-brand-tag">
            Luxury Beauty Studio
          </span>

          <span className="eg-brand-name">
            Esther's
            <em>Glowious</em>
          </span>
        </Link>

        <ul className="eg-nav">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`eg-nav-link ${
                  isActive(link.path) ? 'active' : ''
                }`}
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

            <br />

            Johannesburg, South Africa
          </div>

        </div>

      </aside>
    </>
  );
};

export default Navbar;