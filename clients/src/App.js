import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Services from './pages/Services';
import Booking from './pages/Booking';
import Gallery from './pages/Gallery';
import Videos from './pages/Videos';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('admin_token');
  return token ? children : <Navigate to="/admin-login" />;
};

function App() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>

      {/* Side Navbar — always visible on desktop, slide-in on mobile */}
      <Navbar />

      {/* Main content — offset by sidebar width on desktop, full width on mobile */}
      <main style={{
        marginLeft: 'var(--sidebar-w, 230px)',
        flex: 1,
        minWidth: 0,
      }}>
        <style>{`
          @media (max-width: 768px) {
            main {
              margin-left: 0 !important;
              padding-top: 62px;
            }
          }
        `}</style>

        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/services"    element={<Services />} />
          <Route path="/booking"     element={<Booking />} />
          <Route path="/gallery"     element={<Gallery />} />
          <Route path="/videos"      element={<Videos />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin"       element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        </Routes>
      </main>

    </div>
  );
}

export default App;