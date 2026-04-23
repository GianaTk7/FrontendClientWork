import React, { useState, useEffect } from 'react';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading videos from API
    setTimeout(() => {
      setVideos([
        {
          id: 1,
          title: 'Box Braids Tutorial',
          description: 'Learn how to create perfect box braids step by step',
          video_url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
          category: 'Tutorial',
          thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500'
        },
        {
          id: 2,
          title: 'Wig Installation Guide',
          description: 'Professional wig installation techniques for a natural look',
          video_url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
          category: 'Tutorial',
          thumbnail: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=500'
        },
        {
          id: 3,
          title: 'Hair Care Tips',
          description: 'Essential tips for maintaining healthy hair',
          video_url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
          category: 'Care',
          thumbnail: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const styles = {
    hero: {
      background: 'linear-gradient(135deg, #ff69b4, #ff1493)',
      color: 'white',
      padding: '3rem 20px',
      textAlign: 'center',
    },
    videosContainer: {
      padding: '3rem 5%',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    videoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
      gap: '2rem',
    },
    videoCard: {
      background: 'white',
      borderRadius: '15px',
      overflow: 'hidden',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s ease',
      cursor: 'pointer',
    },
    videoThumbnail: {
      width: '100%',
      height: '250px',
      objectFit: 'cover',
    },
    videoPlayer: {
      width: '100%',
      height: '250px',
      objectFit: 'cover',
    },
    videoInfo: {
      padding: '1rem',
    },
    loading: {
      textAlign: 'center',
      padding: '3rem',
      fontSize: '1.2rem',
    },
    categoryBadge: {
      display: 'inline-block',
      padding: '4px 12px',
      background: '#ff69b4',
      color: 'white',
      borderRadius: '20px',
      fontSize: '0.8rem',
      marginTop: '0.5rem',
    }
  };

  if (loading) {
    return <div style={styles.loading}>📹 Loading videos...</div>;
  }

  return (
    <div>
      <div style={styles.hero}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Tutorial Videos</h1>
        <p style={{ fontSize: '1.2rem' }}>Watch our expert techniques and styling tips</p>
      </div>

      <div style={styles.videosContainer}>
        {videos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
            <h3>No videos available yet</h3>
            <p>Check back soon for tutorials and styling tips!</p>
          </div>
        ) : (
          <div style={styles.videoGrid}>
            {videos.map(video => (
              <div 
                key={video.id} 
                style={styles.videoCard}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <video controls style={styles.videoPlayer}>
                  <source src={video.video_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div style={styles.videoInfo}>
                  <h3>{video.title}</h3>
                  <p style={{ color: '#666', marginTop: '0.5rem' }}>{video.description}</p>
                  <span style={styles.categoryBadge}>{video.category}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Videos;