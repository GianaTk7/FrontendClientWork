import React, { useState } from 'react';

const Services = () => {
  const [activeCategory, setActiveCategory] = useState('braid_styles');

  const servicesData = {
    braid_styles: ['Box Braids', 'Cornrows', 'Goddess Braids', 'Knotless Braids', 'Lemonade Braids', 'Fulani Braids', 'Tribal Braids', 'Micro Braids'],
    wig_installation: ['Lace Front Wig Installation', 'Full Lace Wig Installation', '360 Lace Wig Installation', 'Glueless Wig Installation', 'Wig Customization', 'Wig Maintenance'],
    hair_wash: ['Deep Conditioning Wash', 'Scalp Treatment', 'Clarifying Wash', 'Moisturizing Wash', 'Hot Oil Treatment', 'Protein Treatment'],
    relax_hair: ['Virgin Relaxer', 'Retouch Relaxer', 'Texturizer', 'Relaxer + Treatment', 'Relaxer + Style']
  };

  const styles = {
    hero: {
      background: 'linear-gradient(135deg, #ff69b4, #ff1493)',
      color: 'white',
      padding: '4rem 20px',
      textAlign: 'center',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '4rem 20px',
    },
    categoryTabs: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      marginBottom: '3rem',
      flexWrap: 'wrap',
    },
    categoryBtn: {
      padding: '12px 24px',
      border: 'none',
      borderRadius: '50px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
    },
    servicesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '2rem',
    },
    serviceCard: {
      background: 'white',
      borderRadius: '15px',
      padding: '2rem',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s ease',
    },
    serviceList: {
      listStyle: 'none',
      padding: 0,
      marginTop: '1rem',
    },
    serviceItem: {
      padding: '0.5rem 0',
      borderBottom: '1px solid #eee',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    infoBox: {
      background: '#fff0f5',
      padding: '2rem',
      borderRadius: '15px',
      textAlign: 'center',
      marginTop: '2rem',
    },
    imageStyle: {
      width: '100%',
      borderRadius: '10px',
      marginBottom: '1rem',
      height: '200px',
      objectFit: 'cover',
    }
  };

  const categories = [
    { id: 'braid_styles', label: '📿 Braid Styles' },
    { id: 'wig_installation', label: '💇 Wig Installation' },
    { id: 'hair_wash', label: '💧 Hair Wash' },
    { id: 'relax_hair', label: '✨ Relax Hair' },
  ];

  const categoryInfo = {
    braid_styles: {
      title: 'Braid Styles',
      description: 'Beautiful and long-lasting braid styles tailored to your preference',
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500',
    },
    wig_installation: {
      title: 'Wig Installation',
      description: 'Professional wig installation services for a natural and flawless look',
      image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=500',
    },
    hair_wash: {
      title: 'Hair Wash & Treatment',
      description: 'Deep cleansing and conditioning treatments for healthy hair',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500',
    },
    relax_hair: {
      title: 'Hair Relaxing',
      description: 'Smoothing and straightening treatments for manageable hair',
      image: 'https://images.unsplash.com/photo-1560869713-da1e3685f9bc?w=500',
    },
  };

  return (
    <div>
      <div style={styles.hero}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Our Services</h1>
        <p style={{ fontSize: '1.2rem' }}>Professional hair services tailored just for you</p>
        <p style={{ fontSize: '0.9rem', marginTop: '1rem', opacity: 0.9 }}>
          💰 Prices will be discussed during consultation based on your specific needs
        </p>
      </div>

      <div style={styles.container}>
        <div style={styles.categoryTabs}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                ...styles.categoryBtn,
                background: activeCategory === cat.id ? '#ff69b4' : 'white',
                color: activeCategory === cat.id ? 'white' : '#333',
                boxShadow: activeCategory === cat.id ? '0 5px 15px rgba(255,105,180,0.3)' : 'none',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div style={styles.servicesGrid}>
          <div style={styles.serviceCard}>
            <h2 style={{ color: '#ff69b4', fontSize: '1.8rem' }}>
              {categoryInfo[activeCategory]?.title}
            </h2>
            <p style={{ color: '#666', marginTop: '1rem', lineHeight: '1.6' }}>
              {categoryInfo[activeCategory]?.description}
            </p>
            <ul style={styles.serviceList}>
              {servicesData[activeCategory]?.map((service, index) => (
                <li key={index} style={styles.serviceItem}>
                  <span style={{ color: '#ff69b4', fontSize: '1.2rem' }}>✓</span>
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div style={styles.serviceCard}>
            <img 
              src={categoryInfo[activeCategory]?.image} 
              alt={categoryInfo[activeCategory]?.title}
              style={styles.imageStyle}
            />
            <div style={styles.infoBox}>
              <h3 style={{ color: '#ff69b4', marginBottom: '1rem' }}>
                Why Choose Our {categoryInfo[activeCategory]?.title}?
              </h3>
              <p style={{ textAlign: 'left', lineHeight: '1.8' }}>
                • Expert stylists with specialized training<br/>
                • Premium quality products used<br/>
                • Personalized consultation before service<br/>
                • Clean and hygienic environment<br/>
                • After-care guidance provided<br/>
                • Flexible scheduling options
              </p>
              <div style={{ 
                marginTop: '1.5rem', 
                padding: '1rem', 
                background: 'white', 
                borderRadius: '10px',
                fontStyle: 'italic',
                color: '#ff69b4'
              }}>
                💡 Pro tip: Book your appointment 2-3 weeks in advance for best availability
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;