import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaTimes, FaHeart } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ client_name: '', rating: 5, comment: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/gallery/images');
      setImages(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching images:', error);
      setLoading(false);
    }
  };

  const fetchReviews = async (imageId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/reviews/${imageId}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleImageClick = async (image) => {
    setSelectedImage(image);
    await fetchReviews(image.id);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/reviews', {
        ...reviewForm,
        image_id: selectedImage.id,
      });
      toast.success('Review added successfully!');
      setReviewForm({ client_name: '', rating: 5, comment: '' });
      await fetchReviews(selectedImage.id);
      await fetchImages(); // Refresh ratings
    } catch (error) {
      toast.error('Failed to add review');
    }
  };

  const styles = {
    hero: {
      background: 'linear-gradient(135deg, #ff69b4, #ff1493)',
      color: 'white',
      padding: '3rem 20px',
      textAlign: 'center',
    },
    gallery: {
      padding: '3rem 5%',
    },
    galleryGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '2rem',
      maxWidth: '1400px',
      margin: '0 auto',
    },
    galleryItem: {
      background: 'white',
      borderRadius: '15px',
      overflow: 'hidden',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    galleryImage: {
      width: '100%',
      height: '300px',
      objectFit: 'cover',
    },
    galleryInfo: {
      padding: '1rem',
    },
    rating: {
      color: '#ffd700',
      marginTop: '0.5rem',
    },
    modal: {
      display: selectedImage ? 'flex' : 'none',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,0.9)',
      zIndex: 2000,
      justifyContent: 'center',
      alignItems: 'center',
      overflowY: 'auto',
    },
    modalContent: {
      background: 'white',
      maxWidth: '900px',
      width: '90%',
      maxHeight: '90vh',
      overflowY: 'auto',
      borderRadius: '20px',
      position: 'relative',
    },
    closeBtn: {
      position: 'absolute',
      right: '20px',
      top: '20px',
      fontSize: '30px',
      cursor: 'pointer',
      color: '#333',
      zIndex: 1,
    },
    modalImage: {
      width: '100%',
      maxHeight: '400px',
      objectFit: 'cover',
    },
    reviewSection: {
      padding: '1.5rem',
    },
    reviewItem: {
      background: '#fff0f5',
      padding: '1rem',
      borderRadius: '10px',
      marginBottom: '1rem',
    },
    formGroup: {
      marginBottom: '1rem',
    },
    input: {
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
      minHeight: '80px',
    },
    btnSubmit: {
      background: 'linear-gradient(135deg, #ff69b4, #ff1493)',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '50px',
      cursor: 'pointer',
      fontWeight: '600',
    },
    loading: {
      textAlign: 'center',
      padding: '3rem',
      fontSize: '1.2rem',
    },
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar key={i} color={i <= rating ? '#ffd700' : '#ddd'} style={{ display: 'inline-block', marginRight: '2px' }} />
      );
    }
    return stars;
  };

  if (loading) {
    return <div style={styles.loading}>Loading beautiful hairstyles...</div>;
  }

  return (
    <div>
      <div style={styles.hero}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Our Work Gallery
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          See what our clients are loving
        </motion.p>
      </div>

      <div style={styles.gallery}>
        <div style={styles.galleryGrid}>
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              style={styles.galleryItem}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => handleImageClick(image)}
            >
              <img src={image.image_url} alt={image.title} style={styles.galleryImage} />
              <div style={styles.galleryInfo}>
                <h3>{image.title}</h3>
                <p style={{ color: '#666' }}>{image.description}</p>
                <div style={styles.rating}>
                  {renderStars(Math.round(image.average_rating))}
                  <span style={{ marginLeft: '10px', color: '#666' }}>
                    ({image.ratings?.length || 0} reviews)
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            style={styles.modal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              style={styles.modalContent}
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={styles.closeBtn} onClick={() => setSelectedImage(null)}>
                <FaTimes />
              </div>
              
              <img src={selectedImage.image_url} alt={selectedImage.title} style={styles.modalImage} />
              
              <div style={styles.reviewSection}>
                <h2>{selectedImage.title}</h2>
                <p>{selectedImage.description}</p>
                <div style={styles.rating}>
                  {renderStars(Math.round(selectedImage.average_rating))}
                  <span style={{ marginLeft: '10px' }}>({selectedImage.ratings?.length || 0} reviews)</span>
                </div>

                <h3 style={{ marginTop: '2rem' }}>Client Reviews</h3>
                {reviews.map(review => (
                  <div key={review.id} style={styles.reviewItem}>
                    <strong>{review.client_name}</strong>
                    <div>{renderStars(review.rating)}</div>
                    <p style={{ marginTop: '0.5rem' }}>{review.comment}</p>
                    <small style={{ color: '#666' }}>{new Date(review.created_at).toLocaleDateString()}</small>
                  </div>
                ))}

                <h3 style={{ marginTop: '2rem' }}>Add Your Review</h3>
                <form onSubmit={handleReviewSubmit}>
                  <div style={styles.formGroup}>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={reviewForm.client_name}
                      onChange={(e) => setReviewForm({ ...reviewForm, client_name: e.target.value })}
                      required
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <select
                      value={reviewForm.rating}
                      onChange={(e) => setReviewForm({ ...reviewForm, rating: parseInt(e.target.value) })}
                      style={styles.input}
                    >
                      <option value="5">5 Stars - Excellent</option>
                      <option value="4">4 Stars - Good</option>
                      <option value="3">3 Stars - Average</option>
                      <option value="2">2 Stars - Fair</option>
                      <option value="1">1 Star - Poor</option>
                    </select>
                  </div>
                  <div style={styles.formGroup}>
                    <textarea
                      placeholder="Share your experience..."
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                      required
                      style={styles.textarea}
                    />
                  </div>
                  <button type="submit" style={styles.btnSubmit}>
                    Submit Review <FaHeart style={{ marginLeft: '5px' }} />
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;