import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState({});
  const [focusedField, setFocusedField] = useState(null);
  const [fetchingSlots, setFetchingSlots] = useState(false);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    if (formData.booking_date) {
      fetchAvailableSlots();
    } else {
      setAvailableSlots([]);
      setBookedSlots([]);
    }
  }, [formData.booking_date]);

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/services`);
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const fetchAvailableSlots = async () => {
    setFetchingSlots(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/api/available-slots/${formData.booking_date}`);
      setAvailableSlots(response.data.available_slots || []);
      setBookedSlots(response.data.booked_slots || []);
      
      // Reset booking time when date changes
      setFormData(prev => ({ ...prev, booking_time: '' }));
    } catch (error) {
      console.error('Error fetching slots:', error);
      setAvailableSlots([]);
      setBookedSlots([]);
      toast.error('Could not load available time slots');
    } finally {
      setFetchingSlots(false);
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
    
    // Validate time slot is selected
    if (!formData.booking_time) {
      toast.error('Please select a time slot');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await axios.post(`${BACKEND_URL}/api/bookings`, formData);
      toast.success('✨ Booking created successfully! Check your email for confirmation.');
      setFormData({
        client_name: '',
        client_email: '',
        client_phone: '',
        booking_date: '',
        booking_time: '',
        hairstyle_type: '',
        special_requests: '',
      });
      setAvailableSlots([]);
      setBookedSlots([]);
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  const allHairstyles = [
    ...(services.braid_styles || []),
    ...(services.wig_installation || []),
    ...(services.hair_wash || []),
    ...(services.relax_hair || []),
  ];

  // Format time for better display
  const formatTimeSlot = (time) => {
    const [hour, minute] = time.split(':');
    const hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    const hour12 = hourNum % 12 || 12;
    return `${hour12}:${minute} ${ampm}`;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 },
    },
  };

  const heroVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, type: 'spring', bounce: 0.3 },
    },
  };

  return (
    <div style={styles.pageWrapper}>
      {/* Animated Background Elements */}
      <div style={styles.bgDecoration1}></div>
      <div style={styles.bgDecoration2}></div>
      <div style={styles.bgDecoration3}></div>

      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={heroVariants}
        style={styles.hero}
      >
        <div style={styles.heroContent}>
          <motion.div
            initial={{ rotate: -10, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            style={styles.heroIcon}
          >
            ✨
          </motion.div>
          <motion.h1
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={styles.heroTitle}
          >
            Book Your <span style={styles.gradientText}>Luxury Session</span>
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={styles.heroSubtitle}
          >
            Transform your hair with our expert stylists • Premium service guaranteed
          </motion.p>
        </div>
      </motion.div>

      {/* Booking Form Container */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        style={styles.formContainer}
      >
        <div style={styles.formCard}>
          {/* Info Banner */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={styles.infoBanner}
          >
            <span style={styles.infoIcon}>💎</span>
            <span style={styles.infoText}>Price consultation after booking • Our stylist will contact you within 2 hours</span>
          </motion.div>

          <form onSubmit={handleSubmit}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={styles.formGrid}
            >
              {/* Name Field */}
              <motion.div variants={itemVariants} style={styles.formGroup}>
                <label style={styles.label}>
                  <span style={styles.labelIcon}>👤</span>
                  Full Name
                  <span style={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  name="client_name"
                  value={formData.client_name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  required
                  style={{
                    ...styles.input,
                    borderColor: focusedField === 'name' ? '#c9a9c4' : '#e5e0e8',
                    boxShadow: focusedField === 'name' ? '0 0 0 3px rgba(201, 169, 196, 0.1)' : 'none',
                  }}
                  placeholder="Enter your full name"
                />
              </motion.div>

              {/* Phone Field */}
              <motion.div variants={itemVariants} style={styles.formGroup}>
                <label style={styles.label}>
                  <span style={styles.labelIcon}>📱</span>
                  Phone Number
                  <span style={styles.required}>*</span>
                </label>
                <input
                  type="tel"
                  name="client_phone"
                  value={formData.client_phone}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  required
                  style={{
                    ...styles.input,
                    borderColor: focusedField === 'phone' ? '#c9a9c4' : '#e5e0e8',
                    boxShadow: focusedField === 'phone' ? '0 0 0 3px rgba(201, 169, 196, 0.1)' : 'none',
                  }}
                  placeholder="Your contact number"
                />
              </motion.div>

              {/* Email Field - Full Width */}
              <motion.div variants={itemVariants} style={{ ...styles.formGroup, gridColumn: '1/-1' }}>
                <label style={styles.label}>
                  <span style={styles.labelIcon}>✉️</span>
                  Email Address
                  <span style={styles.required}>*</span>
                </label>
                <input
                  type="email"
                  name="client_email"
                  value={formData.client_email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                  style={{
                    ...styles.input,
                    borderColor: focusedField === 'email' ? '#c9a9c4' : '#e5e0e8',
                    boxShadow: focusedField === 'email' ? '0 0 0 3px rgba(201, 169, 196, 0.1)' : 'none',
                  }}
                  placeholder="your@email.com"
                />
              </motion.div>

              {/* Date Field */}
              <motion.div variants={itemVariants} style={styles.formGroup}>
                <label style={styles.label}>
                  <span style={styles.labelIcon}>📅</span>
                  Select Date
                  <span style={styles.required}>*</span>
                </label>
                <input
                  type="date"
                  name="booking_date"
                  value={formData.booking_date}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  style={styles.input}
                />
              </motion.div>

              {/* Time Slot Field - Fetches from API */}
              <motion.div variants={itemVariants} style={styles.formGroup}>
                <label style={styles.label}>
                  <span style={styles.labelIcon}>⏰</span>
                  Select Time Slot
                  <span style={styles.required}>*</span>
                </label>
                <div style={styles.timeSlotWrapper}>
                  {!formData.booking_date ? (
                    <div style={styles.noSlots}>
                      📅 Please select a date first to view available time slots
                    </div>
                  ) : fetchingSlots ? (
                    <div style={styles.noSlots}>
                      <span style={styles.loadingSpinner}>⏳</span> Loading available slots...
                    </div>
                  ) : availableSlots.length > 0 ? (
                    <>
                      <select
                        name="booking_time"
                        value={formData.booking_time}
                        onChange={handleChange}
                        required
                        style={styles.timeSelect}
                      >
                        <option value="" disabled>— Choose your preferred time —</option>
                        {availableSlots.map((slot, idx) => (
                          <option key={idx} value={slot} style={styles.timeOption}>
                            🕒 {formatTimeSlot(slot)}
                          </option>
                        ))}
                      </select>
                      
                      {/* Show selected slot confirmation */}
                      {formData.booking_time && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          style={styles.selectedSlotBadge}
                        >
                          ✓ Selected: {formatTimeSlot(formData.booking_time)}
                        </motion.div>
                      )}
                      
                      {/* Show slot statistics */}
                      <div style={styles.slotStats}>
                        <div style={styles.slotCount}>
                          ✨ {availableSlots.length} time slot(s) available
                        </div>
                        {bookedSlots.length > 0 && (
                          <div style={styles.bookedCount}>
                            📅 {bookedSlots.length} slot(s) already booked
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div style={styles.noSlots}>
                      😔 No time slots available for {new Date(formData.booking_date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                      <br />
                      <span style={styles.suggestionText}>Please select another date</span>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Hairstyle Field */}
              <motion.div variants={itemVariants} style={{ ...styles.formGroup, gridColumn: '1/-1' }}>
                <label style={styles.label}>
                  <span style={styles.labelIcon}>💇‍♀️</span>
                  Select Hairstyle
                  <span style={styles.required}>*</span>
                </label>
                <select
                  name="hairstyle_type"
                  value={formData.hairstyle_type}
                  onChange={handleChange}
                  required
                  style={styles.select}
                >
                  <option value="" disabled>Choose your desired style</option>
                  {allHairstyles.map((style, idx) => (
                    <option key={idx} value={style}>{style}</option>
                  ))}
                </select>
              </motion.div>

              {/* Special Requests */}
              <motion.div variants={itemVariants} style={{ ...styles.formGroup, gridColumn: '1/-1' }}>
                <label style={styles.label}>
                  <span style={styles.labelIcon}>💬</span>
                  Special Requests
                </label>
                <textarea
                  name="special_requests"
                  value={formData.special_requests}
                  onChange={handleChange}
                  placeholder="Tell us about your hair goals, reference photos, or any preferences..."
                  style={styles.textarea}
                  rows="3"
                />
              </motion.div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading || !formData.booking_time}
              style={{
                ...styles.submitBtn,
                opacity: loading || !formData.booking_time ? 0.6 : 1,
                cursor: loading || !formData.booking_time ? 'not-allowed' : 'pointer',
              }}
              whileHover={!loading && formData.booking_time ? { scale: 1.02, boxShadow: '0 10px 30px rgba(201, 169, 196, 0.3)' } : {}}
              whileTap={!loading && formData.booking_time ? { scale: 0.98 } : {}}
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  style={styles.loaderIcon}
                >
                  💫
                </motion.div>
              ) : (
                <>
                  <span>Secure My Appointment</span>
                  <span style={styles.btnArrow}>→</span>
                </>
              )}
            </motion.button>

            {/* Footer Note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              style={styles.footerNote}
            >
              <span>✨ Free consultation • 24h cancellation policy • Premium products ✨</span>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #fdf8f5 0%, #f9f0f0 50%, #fdf4f7 100%)',
    position: 'relative',
    overflowX: 'hidden',
    padding: '2rem 1rem',
  },
  bgDecoration1: {
    position: 'absolute',
    top: '-20%',
    right: '-10%',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(201,169,196,0.15) 0%, transparent 70%)',
    pointerEvents: 'none',
    animation: 'float 20s ease-in-out infinite',
  },
  bgDecoration2: {
    position: 'absolute',
    bottom: '-15%',
    left: '-5%',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(231,181,204,0.12) 0%, transparent 70%)',
    pointerEvents: 'none',
    animation: 'float 25s ease-in-out infinite reverse',
  },
  bgDecoration3: {
    position: 'absolute',
    top: '40%',
    left: '20%',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(199,145,183,0.08) 0%, transparent 70%)',
    pointerEvents: 'none',
    animation: 'pulse 15s ease-in-out infinite',
  },
  hero: {
    maxWidth: '900px',
    margin: '0 auto 2rem auto',
    padding: '3rem 2rem',
    textAlign: 'center',
    position: 'relative',
    zIndex: 2,
  },
  heroContent: {
    position: 'relative',
  },
  heroIcon: {
    fontSize: '4rem',
    marginBottom: '1rem',
    display: 'inline-block',
    animation: 'bounce 2s ease-in-out infinite',
  },
  heroTitle: {
    fontSize: 'clamp(2rem, 6vw, 3.5rem)',
    fontWeight: '800',
    margin: '0.5rem 0',
    color: '#2d1b2a',
    letterSpacing: '-0.02em',
    fontFamily: "'Playfair Display', serif",
  },
  gradientText: {
    background: 'linear-gradient(135deg, #c9a9c4 0%, #e8b4b8 50%, #d4a5c5 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  heroSubtitle: {
    fontSize: 'clamp(1rem, 4vw, 1.2rem)',
    color: '#5a4a52',
    fontWeight: '500',
    marginTop: '0.5rem',
  },
  formContainer: {
    maxWidth: '850px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 2,
  },
  formCard: {
    background: 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(10px)',
    borderRadius: '32px',
    padding: '2.5rem',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(201, 169, 196, 0.2)',
    transition: 'all 0.3s ease',
  },
  infoBanner: {
    background: 'linear-gradient(120deg, #fdf4f7 0%, #fce9f0 100%)',
    borderRadius: '20px',
    padding: '1rem 1.5rem',
    marginBottom: '2rem',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    border: '1px solid #e8d0dc',
    flexWrap: 'wrap',
  },
  infoIcon: {
    fontSize: '1.5rem',
  },
  infoText: {
    color: '#2d1b2a',
    fontWeight: '600',
    fontSize: '0.9rem',
    flex: 1,
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1.5rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '0.85rem',
    fontWeight: '700',
    color: '#2d1b2a',
    marginBottom: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  labelIcon: {
    fontSize: '1rem',
  },
  required: {
    color: '#e8b4b8',
    marginLeft: '4px',
  },
  input: {
    padding: '12px 16px',
    border: '2px solid #e5e0e8',
    borderRadius: '16px',
    fontSize: '1rem',
    transition: 'all 0.2s ease',
    backgroundColor: '#ffffff',
    color: '#2d1b2a',
    fontWeight: '500',
    outline: 'none',
  },
  select: {
    padding: '12px 16px',
    border: '2px solid #e5e0e8',
    borderRadius: '16px',
    fontSize: '1rem',
    backgroundColor: '#ffffff',
    color: '#2d1b2a',
    fontWeight: '500',
    cursor: 'pointer',
    outline: 'none',
  },
  textarea: {
    padding: '12px 16px',
    border: '2px solid #e5e0e8',
    borderRadius: '16px',
    fontSize: '1rem',
    backgroundColor: '#ffffff',
    color: '#2d1b2a',
    fontWeight: '500',
    fontFamily: 'inherit',
    resize: 'vertical',
    outline: 'none',
  },
  timeSlotWrapper: {
    width: '100%',
  },
  timeSelect: {
    width: '100%',
    padding: '14px 16px',
    border: '2px solid #c9a9c4',
    borderRadius: '16px',
    fontSize: '1rem',
    backgroundColor: '#ffffff',
    color: '#2d1b2a',
    fontWeight: '600',
    cursor: 'pointer',
    outline: 'none',
    boxShadow: '0 2px 8px rgba(201, 169, 196, 0.2)',
    transition: 'all 0.2s ease',
  },
  timeOption: {
    padding: '10px',
    fontWeight: '500',
  },
  noSlots: {
    padding: '14px 16px',
    border: '2px dashed #e8b4b8',
    borderRadius: '16px',
    backgroundColor: '#fdf4f7',
    color: '#5a4a52',
    fontWeight: '500',
    textAlign: 'center',
    fontSize: '0.9rem',
  },
  suggestionText: {
    fontSize: '0.8rem',
    color: '#c9a9c4',
    display: 'inline-block',
    marginTop: '6px',
  },
  slotStats: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '8px',
  },
  slotCount: {
    fontSize: '0.8rem',
    color: '#c9a9c4',
    fontWeight: '600',
  },
  bookedCount: {
    fontSize: '0.75rem',
    color: '#e8b4b8',
    fontWeight: '500',
  },
  selectedSlotBadge: {
    marginTop: '10px',
    padding: '8px 16px',
    background: 'linear-gradient(135deg, #c9a9c4 0%, #e8b4b8 100%)',
    borderRadius: '24px',
    fontSize: '0.85rem',
    color: '#ffffff',
    fontWeight: '600',
    textAlign: 'center',
    display: 'inline-block',
    width: 'auto',
    boxShadow: '0 2px 8px rgba(201, 169, 196, 0.3)',
  },
  loadingSpinner: {
    display: 'inline-block',
    animation: 'spin 1s linear infinite',
  },
  submitBtn: {
    width: '100%',
    padding: '16px',
    background: 'linear-gradient(135deg, #2d1b2a 0%, #4a3042 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '40px',
    fontSize: '1.1rem',
    fontWeight: '700',
    cursor: 'pointer',
    marginTop: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    transition: 'all 0.3s ease',
    letterSpacing: '0.5px',
  },
  btnArrow: {
    fontSize: '1.2rem',
    transition: 'transform 0.2s ease',
  },
  loaderIcon: {
    fontSize: '1.3rem',
    display: 'inline-block',
  },
  footerNote: {
    marginTop: '1.5rem',
    textAlign: 'center',
    fontSize: '0.75rem',
    color: '#a08a96',
    fontWeight: '500',
    letterSpacing: '0.3px',
  },
};

// Add animation keyframes to document
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 0.5; }
    50% { transform: scale(1.1); opacity: 0.8; }
  }
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @media (max-width: 768px) {
    .booking-form-grid {
      grid-template-columns: 1fr !important;
      gap: 1rem !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default Booking;