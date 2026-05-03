import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import axios from 'axios';

const Booking = () => {
  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    client_phone: '',
    booking_date: '',
    booking_time: '',
    hairstyle_type: '',
    special_requests: '',
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState({});

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    if (formData.booking_date) {
      fetchAvailableSlots();
    }
  }, [formData.booking_date]);

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const fetchAvailableSlots = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/available-slots/${formData.booking_date}`);
      setAvailableSlots(response.data.available_slots);
    } catch (error) {
      console.error('Error fetching slots:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:8000/api/bookings', formData);
      toast.success('Booking created successfully! Check your email for confirmation.');
      setFormData({
        client_name: '',
        client_email: '',
        client_phone: '',
        booking_date: '',
        booking_time: '',
        hairstyle_type: '',
        special_requests: '',
      });
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '3rem auto',
      padding: '2rem',
      background: 'white',
      borderRadius: '20px',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    },
    hero: {
      background: 'linear-gradient(135deg, #ff69b4, #ff1493)',
      color: 'white',
      Height: '70px',
      padding: '3rem 20px',
      textAlign: 'center',
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
      padding: '10px',
      border: '2px solid #eee',
      borderRadius: '10px',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
    },
    select: {
      width: '100%',
      padding: '10px',
      border: '2px solid #eee',
      borderRadius: '10px',
      fontSize: '1rem',
    },
    textarea: {
      width: '100%',
      padding: '10px',
      border: '2px solid #eee',
      borderRadius: '10px',
      fontSize: '1rem',
      minHeight: '100px',
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
    infoBox: {
      background: '#fff0f5',
      padding: '1rem',
      borderRadius: '10px',
      marginBottom: '2rem',
      textAlign: 'center',
    },
  };

  const allHairstyles = [
    ...(services.braid_styles || []),
    ...(services.wig_installation || []),
    ...(services.hair_wash || []),
    ...(services.relax_hair || []),
  ];

  return (
    <div>
      <div style={styles.hero}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Book Your Appointment
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Schedule your hair styling session with our experts
        </motion.p>
      </div>

      <div style={styles.container}>
        <div style={styles.infoBox}>
          <p>For pricing information, our stylist will contact you after booking</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Full Name *</label>
            <input
              type="text"
              name="client_name"
              value={formData.client_name}
              onChange={handleChange}
              required
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = '#ff69b4'}
              onBlur={(e) => e.target.style.borderColor = '#eee'}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Email *</label>
            <input
              type="email"
              name="client_email"
              value={formData.client_email}
              onChange={handleChange}
              required
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = '#ff69b4'}
              onBlur={(e) => e.target.style.borderColor = '#eee'}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Phone Number *</label>
            <input
              type="tel"
              name="client_phone"
              value={formData.client_phone}
              onChange={handleChange}
              required
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = '#ff69b4'}
              onBlur={(e) => e.target.style.borderColor = '#eee'}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Select Date *</label>
            <input
              type="date"
              name="booking_date"
              value={formData.booking_date}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Select Time *</label>
            <select
              name="booking_time"
              value={formData.booking_time}
              onChange={handleChange}
              required
              style={styles.select}
            >
              <option value="">Select a time slot</option>
              {availableSlots.map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Hairstyle Type *</label>
            <select
              name="hairstyle_type"
              value={formData.hairstyle_type}
              onChange={handleChange}
              required
              style={styles.select}
            >
              <option value="">Select a hairstyle</option>
              {allHairstyles.map(style => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Special Requests (Optional)</label>
            <textarea
              name="special_requests"
              value={formData.special_requests}
              onChange={handleChange}
              placeholder="Any specific requirements or preferences?"
              style={styles.textarea}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={styles.btnSubmit}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            {loading ? 'Booking...' : 'Book Appointment'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;