import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaCalendar, FaUsers, FaComments, FaSignOutAlt, FaEnvelope, FaChartLine, FaClock } from 'react-icons/fa';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [messageResponse, setMessageResponse] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
const token = localStorage.getItem('admin_token');

const [bookingsRes, statsRes, messagesRes] = await Promise.all([
  axios.get(`http://localhost:8000/api/bookings/admin/all?token=${token}`),
  axios.get(`http://localhost:8000/api/bookings/stats/daily?token=${token}`),
  axios.get(`http://localhost:8000/api/messages/unread?token=${token}`),
]);
      setBookings(bookingsRes.data);
      setStats(statsRes.data);
      setUnreadMessages(messagesRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load dashboard data');
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId, status) => {
    try {
      const token = localStorage.getItem('admin_token');

await axios.put(
  `http://localhost:8000/api/bookings/${bookingId}/status?token=${token}`,
  { status: status }
);
      toast.success('Booking status updated');
      fetchData();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const sendMessageToClient = async (bookingId) => {
    if (!messageResponse.trim()) {
      toast.error('Please enter a message');
      return;
    }
    
    try {
      await axios.post('http://localhost:8000/api/messages', {
        booking_id: bookingId,
        message: messageResponse,
        status: 'unread'
      });
      toast.success('Message sent to client');
      setSelectedBooking(null);
      setMessageResponse('');
      fetchData();
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    window.location.href = '/admin-login';
  };

  const styles = {
    container: {
      padding: '1.5rem',
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem',
      flexWrap: 'wrap',
      gap: '1rem',
    },
    title: {
      color: '#1a1a1a',
      fontSize: '1.5rem',
      fontWeight: '600',
      margin: 0,
    },
    logoutBtn: {
      background: '#1a1a1a',
      color: 'white',
      padding: '8px 16px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontWeight: '500',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      marginBottom: '1.5rem',
    },
    statCard: {
      background: 'white',
      padding: '1rem',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      transition: 'transform 0.2s ease',
    },
    statLeft: {
      display: 'flex',
      flexDirection: 'column',
    },
    statIcon: {
      width: '40px',
      height: '40px',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.2rem',
    },
    statValue: {
      fontSize: '1.8rem',
      fontWeight: '700',
      color: '#1a1a1a',
      margin: 0,
      lineHeight: 1.2,
    },
    statLabel: {
      fontSize: '0.8rem',
      color: '#666',
      margin: 0,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    messagesCard: {
      background: 'white',
      borderRadius: '12px',
      marginBottom: '1.5rem',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    },
    cardHeader: {
      padding: '1rem',
      background: '#1a1a1a',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    cardTitle: {
      margin: 0,
      fontSize: '0.95rem',
      fontWeight: '500',
    },
    messageItem: {
      padding: '0.75rem 1rem',
      borderBottom: '1px solid #f0f0f0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: 'background 0.2s ease',
    },
    messageContent: {
      flex: 1,
    },
    messageBooking: {
      fontSize: '0.75rem',
      color: '#ff69b4',
      fontWeight: '600',
      marginBottom: '0.25rem',
    },
    messageText: {
      fontSize: '0.85rem',
      color: '#333',
      margin: 0,
    },
    bookingsTable: {
      background: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: '0.85rem',
    },
    th: {
      background: '#1a1a1a',
      color: 'white',
      padding: '0.75rem',
      textAlign: 'left',
      fontSize: '0.8rem',
      fontWeight: '500',
    },
    td: {
      padding: '0.75rem',
      borderBottom: '1px solid #f0f0f0',
      color: '#333',
    },
    statusSelect: {
      padding: '4px 8px',
      borderRadius: '6px',
      border: '1px solid #ff69b4',
      cursor: 'pointer',
      fontSize: '0.8rem',
      background: 'white',
    },
    messageBtn: {
      background: 'transparent',
      color: '#ff69b4',
      padding: '4px 10px',
      border: '1px solid #ff69b4',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.75rem',
      fontWeight: '500',
      transition: 'all 0.2s ease',
    },
    modal: {
      display: selectedBooking ? 'flex' : 'none',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,0.6)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    modalContent: {
      background: 'white',
      padding: '1.5rem',
      borderRadius: '16px',
      width: '90%',
      maxWidth: '450px',
    },
    modalTitle: {
      margin: '0 0 1rem 0',
      fontSize: '1.2rem',
      color: '#1a1a1a',
    },
    textarea: {
      width: '100%',
      minHeight: '100px',
      padding: '10px',
      marginTop: '0.5rem',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      fontSize: '0.9rem',
      fontFamily: 'inherit',
    },
    buttonPrimary: {
      flex: 1,
      padding: '8px',
      background: '#ff69b4',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '500',
      fontSize: '0.9rem',
    },
    buttonSecondary: {
      flex: 1,
      padding: '8px',
      background: '#f0f0f0',
      color: '#666',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '500',
      fontSize: '0.9rem',
    },
    loading: {
      textAlign: 'center',
      padding: '3rem',
      fontSize: '1rem',
      color: '#666',
    },
    badge: {
      display: 'inline-block',
      padding: '2px 8px',
      borderRadius: '12px',
      fontSize: '0.7rem',
      fontWeight: '500',
    },
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return { background: '#e8f5e9', color: '#2e7d32' };
      case 'pending': return { background: '#fff3e0', color: '#ed6c02' };
      case 'cancelled': return { background: '#ffebee', color: '#d32f2f' };
      default: return { background: '#f3e5f5', color: '#9c27b0' };
    }
  };

  if (loading) {
    return <div style={styles.loading}>Loading dashboard...</div>;
  }

  const todayCount = stats.find(s => s._id === new Date().toISOString().split('T')[0])?.count || 0;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Admin Dashboard</h1>
        <button onClick={logout} style={styles.logoutBtn}>
          <FaSignOutAlt size={14} /> Logout
        </button>
      </div>

      <div style={styles.statsGrid}>
        <motion.div whileHover={{ y: -2 }} style={styles.statCard}>
          <div style={styles.statLeft}>
            <p style={styles.statValue}>{todayCount}</p>
            <p style={styles.statLabel}>Today's Bookings</p>
          </div>
          <div style={{ ...styles.statIcon, background: '#fff0f6', color: '#ff69b4' }}>
            <FaCalendar />
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} style={styles.statCard}>
          <div style={styles.statLeft}>
            <p style={styles.statValue}>{bookings.length}</p>
            <p style={styles.statLabel}>Total Bookings</p>
          </div>
          <div style={{ ...styles.statIcon, background: '#e8f0fe', color: '#1a1a1a' }}>
            <FaUsers />
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} style={styles.statCard}>
          <div style={styles.statLeft}>
            <p style={styles.statValue}>{unreadMessages.length}</p>
            <p style={styles.statLabel}>Unread Messages</p>
          </div>
          <div style={{ ...styles.statIcon, background: '#fff0f6', color: '#ff69b4' }}>
            <FaComments />
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} style={styles.statCard}>
          <div style={styles.statLeft}>
            <p style={styles.statValue}>
              {bookings.filter(b => b.status === 'confirmed').length}
            </p>
            <p style={styles.statLabel}>Confirmed</p>
          </div>
          <div style={{ ...styles.statIcon, background: '#e8f5e9', color: '#2e7d32' }}>
            <FaChartLine />
          </div>
        </motion.div>
      </div>

      {unreadMessages.length > 0 && (
        <div style={styles.messagesCard}>
          <div style={styles.cardHeader}>
            <FaEnvelope size={14} />
            <h3 style={styles.cardTitle}>Unread Messages from Clients</h3>
          </div>
          {unreadMessages.map(msg => (
            <div key={msg.id} style={styles.messageItem}>
              <div style={styles.messageContent}>
                <div style={styles.messageBooking}>Booking #{msg.booking_id}</div>
                <p style={styles.messageText}>{msg.message}</p>
              </div>
              <button 
                style={styles.messageBtn}
                onClick={() => {
                  setSelectedBooking(msg.booking_id);
                  setMessageResponse('');
                }}
              >
                Reply
              </button>
            </div>
          ))}
        </div>
      )}

      <div style={styles.bookingsTable}>
        <div style={styles.cardHeader}>
          <FaClock size={14} />
          <h3 style={styles.cardTitle}>Recent Bookings</h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Client</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Time</th>
                <th style={styles.th}>Hairstyle</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.slice(0, 10).map(booking => {
                const statusStyle = getStatusColor(booking.status);
                return (
                  <tr key={booking.id}>
                    <td style={styles.td}>{booking.client_name}</td>
                    <td style={styles.td}>{booking.booking_date}</td>
                    <td style={styles.td}>{booking.booking_time}</td>
                    <td style={styles.td}>{booking.hairstyle_type}</td>
                    <td style={styles.td}>
                      <select
                        value={booking.status}
                        onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                        style={{
                          ...styles.statusSelect,
                          ...(booking.status === 'confirmed' && { borderColor: '#2e7d32' }),
                          ...(booking.status === 'cancelled' && { borderColor: '#d32f2f' }),
                        }}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="rescheduled">Rescheduled</option>
                      </select>
                    </td>
                    <td style={styles.td}>
                      <button
                        style={styles.messageBtn}
                        onClick={() => {
                          setSelectedBooking(booking.id);
                          setMessageResponse('');
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = '#ff69b4';
                          e.target.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'transparent';
                          e.target.style.color = '#ff69b4';
                        }}
                      >
                        Message
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Message Modal */}
      {selectedBooking && (
        <div style={styles.modal} onClick={() => setSelectedBooking(null)}>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={styles.modalContent} 
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={styles.modalTitle}>Send Message to Client</h3>
            <textarea
              value={messageResponse}
              onChange={(e) => setMessageResponse(e.target.value)}
              placeholder="Type your message here..."
              style={styles.textarea}
            />
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              <button
                onClick={() => sendMessageToClient(selectedBooking)}
                style={styles.buttonPrimary}
              >
                Send Message
              </button>
              <button
                onClick={() => setSelectedBooking(null)}
                style={styles.buttonSecondary}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;