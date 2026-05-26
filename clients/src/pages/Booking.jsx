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
    
    if (!formData.booking_time) {
      toast.error('Please select a time slot');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await axios.post(`${BACKEND_URL}/api/bookings`, formData);
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

  const formatTimeSlot = (time) => {
    const [hour, minute] = time.split(':');
    const hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    const hour12 = hourNum % 12 || 12;
    return `${hour12}:${minute} ${ampm}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const heroVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.bgDecoration1} />
      <div style={styles.bgDecoration2} />
      <div style={styles.bgDecoration3} />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={heroVariants}
        style={styles.hero}
      >
        <div style={styles.heroContent}>
          <div style={styles.heroAccent} />
          <h1 style={styles.heroTitle}>
            Book Your <span style={styles.gradientText}>Luxury Session</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Transform your hair with our expert stylists • Premium service guaranteed
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        style={styles.formContainer}
      >
        <div style={styles.formCard}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            style={styles.infoBanner}
          >
            <div style={styles.infoDot} />
            <span style={styles.infoText}>Price consultation after booking • Our stylist will contact you within 2 hours</span>
          </motion.div>

          <form onSubmit={handleSubmit}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={styles.formGrid}
            >
              <motion.div variants={itemVariants} style={styles.formGroup}>
                <label style={styles.label}>
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
                    borderColor: focusedField === 'name' ? '#c9a9c4' : '#e8e0e5',
                    boxShadow: focusedField === 'name' ? '0 0 0 3px rgba(201, 169, 196, 0.1)' : 'none',
                  }}
                  placeholder="Enter your full name"
                />
              </motion.div>

              <motion.div variants={itemVariants} style={styles.formGroup}>
                <label style={styles.label}>
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
                    borderColor: focusedField === 'phone' ? '#c9a9c4' : '#e8e0e5',
                    boxShadow: focusedField === 'phone' ? '0 0 0 3px rgba(201, 169, 196, 0.1)' : 'none',
                  }}
                  placeholder="Your contact number"
                />
              </motion.div>

              <motion.div variants={itemVariants} style={{ ...styles.formGroup, gridColumn: '1/-1' }}>
                <label style={styles.label}>
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
                    borderColor: focusedField === 'email' ? '#c9a9c4' : '#e8e0e5',
                    boxShadow: focusedField === 'email' ? '0 0 0 3px rgba(201, 169, 196, 0.1)' : 'none',
                  }}
                  placeholder="your@email.com"
                />
              </motion.div>

              <motion.div variants={itemVariants} style={styles.formGroup}>
                <label style={styles.label}>
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

              <motion.div variants={itemVariants} style={styles.formGroup}>
                <label style={styles.label}>
                  Select Time Slot
                  <span style={styles.required}>*</span>
                </label>
                <div style={styles.timeSlotWrapper}>
                  {!formData.booking_date ? (
                    <div style={styles.noSlots}>
                      Please select a date first to view available time slots
                    </div>
                  ) : fetchingSlots ? (
                    <div style={styles.noSlots}>
                      <span style={styles.loadingSpinner} /> Loading available slots...
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
                          <option key={idx} value={slot}>
                            {formatTimeSlot(slot)}
                          </option>
                        ))}
                      </select>
                      
                      {formData.booking_time && (
                        <motion.div
                          initial={{ scale: 0.95, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          style={styles.selectedSlotBadge}
                        >
                          Selected: {formatTimeSlot(formData.booking_time)}
                        </motion.div>
                      )}
                      
                      <div style={styles.slotStats}>
                        <div style={styles.slotCount}>
                          {availableSlots.length} time slot(s) available
                        </div>
                        {bookedSlots.length > 0 && (
                          <div style={styles.bookedCount}>
                            {bookedSlots.length} slot(s) already booked
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div style={styles.noSlots}>
                      No time slots available for {new Date(formData.booking_date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                      <br />
                      <span style={styles.suggestionText}>Please select another date</span>
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.div variants={itemVariants} style={{ ...styles.formGroup, gridColumn: '1/-1' }}>
                <label style={styles.label}>
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

              <motion.div variants={itemVariants} style={{ ...styles.formGroup, gridColumn: '1/-1' }}>
                <label style={styles.label}>
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

            <motion.button
              type="submit"
              disabled={loading || !formData.booking_time}
              style={{
                ...styles.submitBtn,
                opacity: loading || !formData.booking_time ? 0.6 : 1,
                cursor: loading || !formData.booking_time ? 'not-allowed' : 'pointer',
              }}
              whileHover={!loading && formData.booking_time ? { scale: 1.02 } : {}}
              whileTap={!loading && formData.booking_time ? { scale: 0.98 } : {}}
            >
              {loading ? (
                <span style={styles.loaderIcon} />
              ) : (
                <>
                  <span>Secure My Appointment</span>
                  <span style={styles.btnArrow}>→</span>
                </>
              )}
            </motion.button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={styles.footerNote}
            >
              <span>Free consultation • 24h cancellation policy • Premium products</span>
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
    background: '#faf7f8',
    position: 'relative',
    overflowX: 'hidden',
    padding: '2rem 1.5rem',
  },
  bgDecoration1: {
    position: 'absolute',
    top: '-15%',
    right: '-10%',
    width: '450px',
    height: '450px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(201,169,196,0.12) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  bgDecoration2: {
    position: 'absolute',
    bottom: '-10%',
    left: '-5%',
    width: '380px',
    height: '380px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(231,181,204,0.1) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  bgDecoration3: {
    position: 'absolute',
    top: '35%',
    left: '15%',
    width: '280px',
    height: '280px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(199,145,183,0.06) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  hero: {
    maxWidth: '800px',
    margin: '0 auto 2rem auto',
    padding: '2rem 1.5rem 1rem',
    textAlign: 'center',
    position: 'relative',
    zIndex: 2,
  },
  heroContent: {
    position: 'relative',
  },
  heroAccent: {
    width: '60px',
    height: '2px',
    background: 'linear-gradient(90deg, transparent, #c9a9c4, #e8b4b8, #c9a9c4, transparent)',
    margin: '0 auto 1.5rem auto',
  },
  heroTitle: {
    fontSize: 'clamp(2rem, 6vw, 3.2rem)',
    fontWeight: '600',
    margin: '0 0 0.75rem 0',
    color: '#2a1a24',
    letterSpacing: '-0.02em',
    fontFamily: "'Cormorant Garamond', serif",
  },
  gradientText: {
    background: 'linear-gradient(135deg, #c9a9c4 0%, #d4a5c5 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  heroSubtitle: {
    fontSize: 'clamp(0.9rem, 3.5vw, 1.05rem)',
    color: '#6b5a62',
    fontWeight: '400',
    letterSpacing: '0.3px',
  },
  formContainer: {
    maxWidth: '820px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 2,
  },
  formCard: {
    background: '#ffffff',
    borderRadius: '28px',
    padding: '2.5rem',
    boxShadow: '0 20px 45px -12px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.03)',
    border: '1px solid #f0e8ec',
  },
  infoBanner: {
    background: '#fdf8fa',
    borderRadius: '16px',
    padding: '0.9rem 1.25rem',
    marginBottom: '2rem',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    border: '1px solid #f0e4ea',
  },
  infoDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#c9a9c4',
  },
  infoText: {
    color: '#6b5a62',
    fontWeight: '500',
    fontSize: '0.85rem',
    letterSpacing: '0.2px',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1.25rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#4a3a42',
    marginBottom: '0.5rem',
    letterSpacing: '0.8px',
    textTransform: 'uppercase',
  },
  required: {
    color: '#e8b4b8',
    marginLeft: '4px',
  },
  input: {
    padding: '12px 16px',
    border: '1.5px solid #e8e0e5',
    borderRadius: '14px',
    fontSize: '0.95rem',
    transition: 'all 0.2s ease',
    backgroundColor: '#ffffff',
    color: '#2a1a24',
    fontWeight: '400',
    outline: 'none',
    fontFamily: 'inherit',
  },
  select: {
    padding: '12px 16px',
    border: '1.5px solid #e8e0e5',
    borderRadius: '14px',
    fontSize: '0.95rem',
    backgroundColor: '#ffffff',
    color: '#2a1a24',
    fontWeight: '400',
    cursor: 'pointer',
    outline: 'none',
    fontFamily: 'inherit',
  },
  textarea: {
    padding: '12px 16px',
    border: '1.5px solid #e8e0e5',
    borderRadius: '14px',
    fontSize: '0.95rem',
    backgroundColor: '#ffffff',
    color: '#2a1a24',
    fontWeight: '400',
    fontFamily: 'inherit',
    resize: 'vertical',
    outline: 'none',
  },
  timeSlotWrapper: {
    width: '100%',
  },
  timeSelect: {
    width: '100%',
    padding: '13px 16px',
    border: '1.5px solid #c9a9c4',
    borderRadius: '14px',
    fontSize: '0.95rem',
    backgroundColor: '#ffffff',
    color: '#2a1a24',
    fontWeight: '500',
    cursor: 'pointer',
    outline: 'none',
    transition: 'all 0.2s ease',
  },
  noSlots: {
    padding: '14px 16px',
    border: '1.5px dashed #dcc8d4',
    borderRadius: '14px',
    backgroundColor: '#fdf8fa',
    color: '#8a7a82',
    fontWeight: '400',
    textAlign: 'center',
    fontSize: '0.85rem',
  },
  suggestionText: {
    fontSize: '0.75rem',
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
    gap: '6px',
  },
  slotCount: {
    fontSize: '0.7rem',
    color: '#c9a9c4',
    fontWeight: '500',
    letterSpacing: '0.3px',
  },
  bookedCount: {
    fontSize: '0.7rem',
    color: '#d4a5c5',
    fontWeight: '400',
  },
  selectedSlotBadge: {
    marginTop: '10px',
    padding: '6px 14px',
    background: '#f0e8ec',
    borderRadius: '20px',
    fontSize: '0.75rem',
    color: '#6b5a62',
    fontWeight: '500',
    textAlign: 'center',
    display: 'inline-block',
    width: 'auto',
  },
  loadingSpinner: {
    display: 'inline-block',
    width: '16px',
    height: '16px',
    border: '2px solid #e8e0e5',
    borderTop: '2px solid #c9a9c4',
    borderRadius: '50%',
    marginRight: '8px',
    animation: 'spin 0.8s linear infinite',
  },
  loaderIcon: {
    display: 'inline-block',
    width: '20px',
    height: '20px',
    border: '2px solid rgba(255,255,255,0.3)',
    borderTop: '2px solid #ffffff',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  submitBtn: {
    width: '100%',
    padding: '14px 20px',
    background: '#2a1a24',
    color: 'white',
    border: 'none',
    borderRadius: '40px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '1.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    transition: 'all 0.3s ease',
    letterSpacing: '0.8px',
    textTransform: 'uppercase',
  },
  btnArrow: {
    fontSize: '1rem',
    transition: 'transform 0.2s ease',
  },
  footerNote: {
    marginTop: '1.25rem',
    textAlign: 'center',
    fontSize: '0.7rem',
    color: '#a08a96',
    fontWeight: '400',
    letterSpacing: '0.4px',
  },
};

const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @media (max-width: 768px) {
    div[style*="grid-template-columns: repeat(2, 1fr)"] {
      grid-template-columns: 1fr !important;
      gap: 1rem !important;
    }
  }
  @media (max-width: 640px) {
    .booking-form-card {
      padding: 1.5rem !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default Booking;