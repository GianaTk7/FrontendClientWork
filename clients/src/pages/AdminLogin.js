import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);

      const response = await axios.post(
        `${BACKEND_URL}/api/auth/login`,
        formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }
      );
      
      if (response.data.access_token) {
        localStorage.setItem('admin_token', response.data.access_token);
        toast.success('Login successful!');
        navigate('/admin');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response?.status === 401) {
        toast.error('Invalid username or password');
      } else if (error.response?.status === 422) {
        toast.error('Invalid request format. Please check your credentials.');
      } else {
        toast.error('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <div className="admin-login-header">
          <div className="admin-login-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21V19C20 16.8 18.2 15 16 15H8C5.8 15 4 16.8 4 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M17 3.5L19 5.5L22 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="admin-login-title">Admin Portal</h1>
          <p className="admin-login-subtitle">Sign in to manage your salon dashboard</p>
        </div>
        
        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-login-field">
            <label className="admin-login-label">Username</label>
            <div className="admin-login-input-wrapper">
              <svg className="admin-login-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21V19C20 16.8 18.2 15 16 15H8C5.8 15 4 16.8 4 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                className="admin-login-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>
          </div>
          
          <div className="admin-login-field">
            <label className="admin-login-label">Password</label>
            <div className="admin-login-input-wrapper">
              <svg className="admin-login-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15V17M6 21H18C19.1 21 20 20.1 20 19V11C20 9.9 19.1 9 18 9H6C4.9 9 4 9.9 4 11V19C4 20.1 4.9 21 6 21ZM16 9V7C16 4.8 14.2 3 12 3C9.8 3 8 4.8 8 7V9H16Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input
                type="password"
                className="admin-login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="admin-login-btn"
            disabled={loading}
          >
            {loading ? (
              <span className="admin-login-btn-loading">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeDasharray="40" strokeDashoffset="15">
                    <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
                  </circle>
                </svg>
                Authenticating...
              </span>
            ) : (
              'Login to Dashboard'
            )}
          </button>
        </form>
        
        <div className="admin-login-warning">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 9V13M12 17H12.01M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span>Restricted Area - Salon Owners Only</span>
        </div>
      </div>

      <style>{`
        .admin-login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          background: linear-gradient(145deg, #fef5f8 0%, #fbe9ef 50%, #fdf0f4 100%);
          position: relative;
          overflow: hidden;
        }

        .admin-login-container::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,105,180,0.03) 0%, transparent 70%);
          pointer-events: none;
        }

        .admin-login-box {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(0px);
          border-radius: 32px;
          padding: 2.5rem;
          width: 100%;
          max-width: 460px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 105, 180, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          animation: fadeInUp 0.6s ease-out;
        }

        .admin-login-box:hover {
          transform: translateY(-4px);
          box-shadow: 0 30px 55px -12px rgba(194, 24, 91, 0.2), 0 0 0 1px rgba(194, 24, 91, 0.2);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .admin-login-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .admin-login-icon {
          width: 72px;
          height: 72px;
          margin: 0 auto 1rem;
          background: linear-gradient(135deg, #c2185b, #e91e63);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 8px 20px rgba(194, 24, 91, 0.25);
        }

        .admin-login-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 500;
          color: #1a0a10;
          margin: 0 0 0.5rem 0;
          letter-spacing: -0.3px;
        }

        .admin-login-subtitle {
          font-family: 'Jost', sans-serif;
          font-size: 0.85rem;
          color: #8a6c7a;
          margin: 0;
          font-weight: 300;
          letter-spacing: 0.3px;
        }

        .admin-login-form {
          margin-top: 1.5rem;
        }

        .admin-login-field {
          margin-bottom: 1.5rem;
        }

        .admin-login-label {
          display: block;
          font-family: 'Jost', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          color: #c2185b;
          margin-bottom: 0.6rem;
        }

        .admin-login-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .admin-login-input-icon {
          position: absolute;
          left: 14px;
          color: #d4a5b8;
          pointer-events: none;
          transition: color 0.2s ease;
        }

        .admin-login-input {
          width: 100%;
          padding: 0.9rem 1rem 0.9rem 2.75rem;
          font-family: 'Jost', sans-serif;
          font-size: 0.95rem;
          border: 1.5px solid #f0e0e6;
          border-radius: 20px;
          background: white;
          transition: all 0.25s ease;
          color: #1a0a10;
        }

        .admin-login-input:focus {
          outline: none;
          border-color: #c2185b;
          box-shadow: 0 0 0 3px rgba(194, 24, 91, 0.1);
        }

        .admin-login-input:focus + .admin-login-input-icon,
        .admin-login-input-wrapper:focus-within .admin-login-input-icon {
          color: #c2185b;
        }

        .admin-login-input::placeholder {
          color: #cbb8c2;
          font-weight: 300;
          font-size: 0.85rem;
        }

        .admin-login-btn {
          width: 100%;
          padding: 0.9rem;
          background: linear-gradient(125deg, #c2185b, #d81b60);
          border: none;
          border-radius: 40px;
          font-family: 'Jost', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 0.5rem;
          box-shadow: 0 4px 14px rgba(194, 24, 91, 0.3);
        }

        .admin-login-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          background: linear-gradient(125deg, #a0154a, #c2185b);
          box-shadow: 0 8px 20px rgba(194, 24, 91, 0.35);
        }

        .admin-login-btn:active:not(:disabled) {
          transform: translateY(1px);
        }

        .admin-login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .admin-login-btn-loading {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          justify-content: center;
        }

        .admin-login-warning {
          margin-top: 1.8rem;
          padding: 0.75rem;
          background: #fef0f4;
          border-radius: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-family: 'Jost', sans-serif;
          font-size: 0.7rem;
          font-weight: 400;
          letter-spacing: 0.5px;
          color: #b85c7e;
          border: 1px solid #f5dae3;
        }

        /* Responsive Design */
        @media (max-width: 640px) {
          .admin-login-box {
            padding: 1.8rem;
            border-radius: 28px;
          }

          .admin-login-icon {
            width: 60px;
            height: 60px;
            border-radius: 20px;
          }

          .admin-login-title {
            font-size: 1.6rem;
          }

          .admin-login-subtitle {
            font-size: 0.75rem;
          }

          .admin-login-input {
            padding: 0.8rem 1rem 0.8rem 2.5rem;
            font-size: 0.9rem;
          }

          .admin-login-btn {
            padding: 0.8rem;
            font-size: 0.75rem;
          }

          .admin-login-warning {
            font-size: 0.65rem;
            padding: 0.6rem;
          }
        }

        @media (max-width: 480px) {
          .admin-login-container {
            padding: 1rem;
          }

          .admin-login-box {
            padding: 1.5rem;
            border-radius: 24px;
          }

          .admin-login-icon {
            width: 52px;
            height: 52px;
            border-radius: 18px;
          }

          .admin-login-icon svg {
            width: 28px;
            height: 28px;
          }

          .admin-login-title {
            font-size: 1.4rem;
          }

          .admin-login-field {
            margin-bottom: 1.2rem;
          }

          .admin-login-input {
            padding: 0.7rem 0.9rem 0.7rem 2.3rem;
            font-size: 0.85rem;
            border-radius: 18px;
          }

          .admin-login-input-icon {
            left: 11px;
            width: 16px;
            height: 16px;
          }

          .admin-login-btn {
            padding: 0.7rem;
            font-size: 0.7rem;
            letter-spacing: 1.2px;
          }

          .admin-login-warning {
            margin-top: 1.5rem;
            font-size: 0.6rem;
            gap: 0.4rem;
          }

          .admin-login-warning svg {
            width: 14px;
            height: 14px;
          }
        }

        @media (max-width: 380px) {
          .admin-login-box {
            padding: 1.2rem;
          }

          .admin-login-title {
            font-size: 1.3rem;
          }
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .admin-login-container {
            background: linear-gradient(145deg, #1a0a10 0%, #2d1520 100%);
          }

          .admin-login-box {
            background: rgba(26, 10, 16, 0.95);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(194, 24, 91, 0.2);
          }

          .admin-login-title {
            color: #fce4ec;
          }

          .admin-login-subtitle {
            color: #c9a5b5;
          }

          .admin-login-input {
            background: #2a151c;
            border-color: #3d232e;
            color: #fce4ec;
          }

          .admin-login-input::placeholder {
            color: #8a6c7a;
          }

          .admin-login-warning {
            background: #2a151c;
            border-color: #3d232e;
            color: #e8b0c4;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;