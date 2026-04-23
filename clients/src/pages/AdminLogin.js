import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
    const formData = new URLSearchParams();
formData.append("username", username);
formData.append("password", password);

const response = await axios.post(
  'http://localhost:8000/api/auth/login',
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

  const styles = {
    container: {
      minHeight: 'calc(100vh - 80px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: 'linear-gradient(135deg, #fff5f7 0%, #ffe4e8 100%)',
    },
    loginBox: {
      background: 'white',
      padding: '3rem',
      borderRadius: '20px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
      width: '100%',
      maxWidth: '450px',
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem',
    },
    title: {
      color: '#ff69b4',
      fontSize: '2rem',
      marginBottom: '0.5rem',
    },
    subtitle: {
      color: '#666',
    },
    formGroup: {
      marginBottom: '1.5rem',
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: '500',
      color: '#333',
    },
    input: {
      width: '100%',
      padding: '12px',
      border: '2px solid #eee',
      borderRadius: '10px',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
    },
    btnSubmit: {
      width: '100%',
      padding: '12px',
      background: 'linear-gradient(135deg, #ff69b4, #ff1493)',
      color: 'white',
      border: 'none',
      borderRadius: '50px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    warning: {
      marginTop: '1rem',
      padding: '0.75rem',
      background: '#fff0f5',
      borderRadius: '10px',
      textAlign: 'center',
      fontSize: '0.9rem',
      color: '#666',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <div style={styles.header}>
          <h1 style={styles.title}>Admin Login</h1>
          <p style={styles.subtitle}>Access the salon management dashboard</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = '#ff69b4'}
              onBlur={(e) => e.target.style.borderColor = '#eee'}
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = '#ff69b4'}
              onBlur={(e) => e.target.style.borderColor = '#eee'}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            style={styles.btnSubmit}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            {loading ? 'Logging in...' : 'Login to Dashboard'}
          </button>
        </form>
        
        <div style={styles.warning}>
          ⚠️ This area is restricted to salon owners only
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;