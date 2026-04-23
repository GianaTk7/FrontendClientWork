import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [visibleSections, setVisibleSections] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.dataset.section]));
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('[data-section]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const isVisible = (id) => visibleSections.has(id);

  const fadeUp = (id, delay = 0) => ({
    opacity: isVisible(id) ? 1 : 0,
    transform: isVisible(id) ? 'translateY(0)' : 'translateY(36px)',
    transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
  });

  const fadeIn = (id, delay = 0) => ({
    opacity: isVisible(id) ? 1 : 0,
    transition: `opacity 1s ease ${delay}s`,
  });

  const services = [
    { name: 'Box Braids', duration: '3–5 hrs', price: 'From R650', img: 'https://images.unsplash.com/photo-1622186477895-f2af6a0f5a97?w=500' },
    { name: 'Wig Installation', duration: '1–2 hrs', price: 'From R450', img: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=500' },
    { name: 'Knotless Braids', duration: '4–6 hrs', price: 'From R800', img: 'https://images.unsplash.com/photo-1614272537596-d6ff57e9b64c?w=500' },
    { name: 'Silk Press', duration: '1–2 hrs', price: 'From R350', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500' },
  ];

  const testimonials = [
    { name: 'Lerato M.', text: 'Absolutely obsessed with my knotless braids. The team is so talented and the salon feels like a sanctuary.', stars: 5 },
    { name: 'Thandi K.', text: "Best wig install I've ever had. Natural, flawless, undetectable. I feel like a whole new woman!", stars: 5 },
    { name: 'Nompumelelo D.', text: 'Been coming here for two years and every single visit is better than the last. Pure luxury.', stars: 5 },
  ];

  const steps = [
    { n: '01', t: 'Consultation', d: 'We start with your vision — style preferences, hair health, and desired outcome. Every client is unique.' },
    { n: '02', t: 'Custom Preparation', d: 'Your hair is washed, conditioned, and prepped using premium products chosen for your hair type.' },
    { n: '03', t: 'Expert Styling', d: "Our stylists work with precision and care, creating the look you've envisioned — no rushing, no cutting corners." },
    { n: '04', t: 'Finishing & Aftercare', d: 'We finish with a professional seal and walk you through how to maintain your style at home.' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          font-family: 'DM Sans', sans-serif;
          background: #fff;
          color: #1a1a1a;
          overflow-x: hidden;
        }

        .salon-root {
          background: #fff;
          min-height: 100vh;
        }

        /* NAV */
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 1.4rem 5%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #fff;
          border-bottom: 1px solid #fce4ec;
        }
        .nav-logo {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem;
          font-weight: 400;
          letter-spacing: 0.05em;
          color: #c2185b;
        }
        .nav-links {
          display: flex;
          gap: 2.5rem;
          list-style: none;
        }
        .nav-links a {
          color: #999;
          text-decoration: none;
          font-size: 0.78rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          transition: color 0.2s;
        }
        .nav-links a:hover { color: #c2185b; }
        .nav-book {
          background: #c2185b;
          color: #fff;
          border: none;
          padding: 0.65rem 1.8rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s;
          text-decoration: none;
          display: inline-block;
        }
        .nav-book:hover { background: #ad1457; }

        /* HERO */
        .hero {
          margin-top: 65px;
          height: calc(100vh - 65px);
          display: grid;
          grid-template-columns: 1fr 1fr;
          overflow: hidden;
        }
        .hero-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 4rem 6% 4rem 8%;
          background: #fff;
          position: relative;
        }
        .hero-left::after {
          content: '';
          position: absolute;
          right: 0; top: 0; bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, transparent, #f8bbd0, transparent);
        }
        .hero-eyebrow {
          font-size: 0.68rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #c2185b;
          margin-bottom: 1.6rem;
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }
        .hero-eyebrow::before {
          content: '';
          display: block;
          width: 32px;
          height: 1px;
          background: #c2185b;
        }
        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: 4.5rem;
          font-weight: 400;
          line-height: 1.1;
          color: #1a1a1a;
          margin-bottom: 1.8rem;
        }
        .hero-title em {
          font-style: italic;
          color: #c2185b;
        }
        .hero-sub {
          font-size: 0.92rem;
          font-weight: 300;
          color: #999;
          line-height: 1.9;
          margin-bottom: 2.8rem;
          max-width: 400px;
        }
        .hero-cta {
          display: flex;
          gap: 1.2rem;
          align-items: center;
        }
        .btn-pink {
          background: #c2185b;
          color: #fff;
          padding: 0.9rem 2.2rem;
          text-decoration: none;
          font-size: 0.75rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 500;
          display: inline-block;
          transition: background 0.2s;
        }
        .btn-pink:hover { background: #ad1457; }
        .btn-outline-pink {
          border: 1px solid #f8bbd0;
          color: #c2185b;
          padding: 0.9rem 2rem;
          text-decoration: none;
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          display: inline-block;
          transition: all 0.2s;
          background: transparent;
        }
        .btn-outline-pink:hover { background: #fce4ec; }
        .hero-right {
          position: relative;
          overflow: hidden;
          background: #fce4ec;
        }
        .hero-right img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .hero-badge {
          position: absolute;
          top: 2.5rem;
          left: 2rem;
          background: #fff;
          border: 1px solid #f8bbd0;
          padding: 1rem 1.4rem;
        }
        .hero-badge-num {
          font-family: 'Playfair Display', serif;
          font-size: 2.2rem;
          color: #c2185b;
          font-weight: 400;
          line-height: 1;
        }
        .hero-badge-label {
          font-size: 0.62rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #bbb;
          margin-top: 0.3rem;
          line-height: 1.5;
        }
        .hero-ribbon {
          position: absolute;
          bottom: 2.5rem;
          right: 2rem;
          background: #c2185b;
          padding: 1rem 1.6rem;
          text-align: center;
          color: #fff;
        }
        .hero-ribbon-small {
          font-size: 0.62rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          line-height: 2;
          display: block;
        }
        .hero-ribbon-bold {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem;
          font-style: italic;
          display: block;
        }

        /* TICKER */
        .ticker {
          background: #fce4ec;
          padding: 0.75rem 0;
          overflow: hidden;
          white-space: nowrap;
        }
        .ticker-track {
          display: inline-block;
          animation: tickMove 22s linear infinite;
        }
        .ticker-item {
          display: inline-block;
          font-size: 0.7rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #c2185b;
          padding: 0 2.5rem;
        }
        .ticker-dot {
          display: inline-block;
          width: 5px;
          height: 5px;
          background: #f48fb1;
          border-radius: 50%;
          vertical-align: middle;
        }
        @keyframes tickMove {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ABOUT + VIDEO */
        .about-section {
          padding: 7rem 7%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
          background: #fff;
        }
        .about-label {
          font-size: 0.68rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #c2185b;
          margin-bottom: 1.2rem;
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }
        .about-label::before {
          content: '';
          display: block;
          width: 32px;
          height: 1px;
          background: #c2185b;
        }
        .about-title {
          font-family: 'Playfair Display', serif;
          font-size: 2.8rem;
          font-weight: 400;
          line-height: 1.2;
          color: #1a1a1a;
          margin-bottom: 1.6rem;
        }
        .about-title em { font-style: italic; color: #c2185b; }
        .about-text {
          font-size: 0.88rem;
          color: #999;
          line-height: 2;
          font-weight: 300;
          margin-bottom: 1.2rem;
        }
        .about-stats {
          display: flex;
          gap: 3rem;
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid #fce4ec;
        }
        .stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 2.4rem;
          color: #c2185b;
          line-height: 1;
        }
        .stat-label {
          font-size: 0.67rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #bbb;
          margin-top: 0.3rem;
        }

        /* VIDEO BOX */
        .video-box { position: relative; }
        .video-corner-line {
          position: absolute;
          top: -16px; left: -16px;
          width: 44px; height: 44px;
          border-top: 1px solid #f8bbd0;
          border-left: 1px solid #f8bbd0;
          z-index: 2;
        }
        .video-frame {
          position: relative;
          overflow: hidden;
          border-radius: 2px;
        }
        .video-frame img {
          width: 100%;
          display: block;
          object-fit: cover;
          aspect-ratio: 4/5;
        }
        .video-play-overlay {
          position: absolute;
          inset: 0;
          background: rgba(252,228,236,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
        }
        .video-play-overlay:hover { background: rgba(252,228,236,0.15); }
        .play-btn {
          width: 60px; height: 60px;
          border: 1.5px solid #c2185b;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.9);
          transition: transform 0.2s;
        }
        .video-play-overlay:hover .play-btn { transform: scale(1.08); }
        .play-btn svg {
          width: 18px; height: 18px;
          fill: #c2185b;
          margin-left: 3px;
        }
        .video-caption {
          position: absolute;
          bottom: -16px; right: -16px;
          background: #c2185b;
          padding: 1rem 1.4rem;
          z-index: 2;
        }
        .video-caption-text {
          font-family: 'Playfair Display', serif;
          font-size: 0.82rem;
          font-style: italic;
          color: #fff;
        }

        /* SERVICES */
        .services-section {
          padding: 7rem 7%;
          background: #fff9fb;
        }
        .section-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 3.5rem;
        }
        .section-label {
          font-size: 0.68rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #c2185b;
          margin-bottom: 0.8rem;
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }
        .section-label::before {
          content: '';
          display: block;
          width: 32px;
          height: 1px;
          background: #c2185b;
        }
        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: 2.6rem;
          font-weight: 400;
          color: #1a1a1a;
          line-height: 1.1;
        }
        .section-title em { font-style: italic; color: #c2185b; }
        .view-all {
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #bbb;
          text-decoration: none;
          border-bottom: 1px solid #eee;
          padding-bottom: 2px;
          transition: color 0.2s;
          margin-bottom: 0.4rem;
        }
        .view-all:hover { color: #c2185b; border-color: #c2185b; }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5px;
        }
        .service-card {
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }
        .service-card img {
          width: 100%;
          aspect-ratio: 3/4;
          object-fit: cover;
          display: block;
          transition: transform 0.6s ease;
          filter: brightness(0.8);
        }
        .service-card:hover img {
          transform: scale(1.05);
          filter: brightness(0.65);
        }
        .service-book-tag {
          position: absolute;
          top: 1rem; right: 1rem;
          border: 1px solid transparent;
          color: transparent;
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 0.35rem 0.9rem;
          transition: all 0.3s;
        }
        .service-card:hover .service-book-tag {
          border-color: rgba(255,255,255,0.6);
          color: #fff;
        }
        .service-card-info {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 1.6rem 1.2rem;
          background: linear-gradient(to top, rgba(26,10,18,0.85) 0%, transparent 100%);
          transform: translateY(4px);
          transition: transform 0.3s;
        }
        .service-card:hover .service-card-info { transform: translateY(0); }
        .service-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.25rem;
          color: #fff;
          font-weight: 400;
          margin-bottom: 0.25rem;
        }
        .service-meta {
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          color: #f8bbd0;
          display: flex;
          gap: 0.8rem;
        }

        /* PROCESS */
        .process-section {
          padding: 7rem 7%;
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 5rem;
          align-items: center;
          background: #fff;
        }
        .process-image-stack { position: relative; }
        .process-img-main {
          width: 78%;
          aspect-ratio: 4/5;
          object-fit: cover;
          display: block;
        }
        .process-img-accent {
          position: absolute;
          bottom: -32px; right: 0;
          width: 46%;
          aspect-ratio: 1/1;
          object-fit: cover;
          border: 4px solid #fff;
        }
        .process-steps { margin-top: 2.5rem; }
        .process-step {
          display: grid;
          grid-template-columns: 50px 1fr;
          gap: 1.5rem;
          align-items: start;
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid #fce4ec;
        }
        .process-step:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }
        .step-num {
          font-family: 'Playfair Display', serif;
          font-size: 2.2rem;
          font-weight: 400;
          color: #f8bbd0;
          line-height: 1;
        }
        .step-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem;
          color: #1a1a1a;
          margin-bottom: 0.4rem;
          font-weight: 500;
        }
        .step-desc {
          font-size: 0.82rem;
          color: #aaa;
          line-height: 1.8;
          font-weight: 300;
        }

        /* TESTIMONIALS */
        .testimonials-section {
          padding: 7rem 7%;
          background: #fff9fb;
          text-align: center;
        }
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.8rem;
          margin-top: 3.5rem;
        }
        .testimonial-card {
          background: #fff;
          border: 1px solid #fce4ec;
          padding: 2.2rem;
          text-align: left;
        }
        .quote-mark {
          font-family: 'Playfair Display', serif;
          font-size: 4rem;
          line-height: 0.6;
          color: #f8bbd0;
          margin-bottom: 1.2rem;
          display: block;
        }
        .stars {
          color: #c2185b;
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          margin-bottom: 0.8rem;
        }
        .testimonial-text {
          font-family: 'Playfair Display', serif;
          font-size: 0.98rem;
          font-style: italic;
          color: #777;
          line-height: 1.8;
          margin-bottom: 1.2rem;
        }
        .testimonial-author {
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #c2185b;
        }

        /* CTA */
        .cta-section {
          padding: 7rem 7%;
          background: #fce4ec;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .cta-offer {
          display: inline-block;
          background: #fff;
          border: 1px solid #f48fb1;
          color: #c2185b;
          padding: 0.5rem 1.2rem;
          font-size: 0.65rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          margin-bottom: 1.6rem;
        }
        .cta-title {
          font-family: 'Playfair Display', serif;
          font-size: 3.2rem;
          font-weight: 400;
          line-height: 1.15;
          color: #1a1a1a;
          margin-bottom: 1.4rem;
        }
        .cta-title em { font-style: italic; color: #c2185b; }
        .cta-sub {
          font-size: 0.88rem;
          color: #aaa;
          line-height: 1.9;
          font-weight: 300;
          margin-bottom: 2.5rem;
        }
        .cta-image {
          border-radius: 2px;
          overflow: hidden;
        }
        .cta-image img {
          width: 100%;
          aspect-ratio: 4/3;
          object-fit: cover;
          display: block;
        }

        /* FOOTER */
        .footer {
          background: #1a0a10;
          padding: 4rem 7% 2rem;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }
        .footer-logo {
          font-family: 'Playfair Display', serif;
          font-size: 1.7rem;
          color: #f8bbd0;
          margin-bottom: 0.8rem;
          letter-spacing: 0.05em;
        }
        .footer-tagline {
          font-size: 0.8rem;
          color: #5a3f4a;
          line-height: 1.8;
          font-weight: 300;
        }
        .footer-heading {
          font-size: 0.62rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #c2185b;
          margin-bottom: 1.2rem;
        }
        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .footer-links a {
          font-size: 0.8rem;
          color: #4a303a;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-links a:hover { color: #f8bbd0; }
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.05);
          padding-top: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .footer-copy {
          font-size: 0.7rem;
          color: #2a181f;
        }
        .footer-social {
          display: flex;
          gap: 1.5rem;
        }
        .footer-social a {
          font-size: 0.62rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #2a181f;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-social a:hover { color: #c2185b; }
      `}</style>

      <div className="salon-root">

        {/* NAV */}
        <nav className="nav">
          <div className="nav-logo">GlamStudio</div>
          <ul className="nav-links">
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <Link to="/booking" className="nav-book">Book Now</Link>
        </nav>

        {/* HERO */}
        <section className="hero">
          <div className="hero-left">
            <div className="hero-eyebrow">Luxury Hair Studio · Johannesburg</div>
            <h1 className="hero-title">
              Your Hair,<br /><em>Elevated.</em>
            </h1>
            <h2 className="hero-sub" style={{fontSize: "20px"}}>
              Expert braids, bespoke wig installations and premium hair care — crafted for women who demand nothing less than extraordinary.
            </h2>
            <div className="hero-cta">
              <Link to="/booking" className="btn-pink">Book Appointment</Link>
              <a href="#services" className="btn-outline-pink">Our Services</a>
            </div>
          </div>
          <div className="hero-right">
            <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900" alt="Salon hero" />
            <div className="hero-badge">
              <div className="hero-badge-num">500+</div>
              <div className="hero-badge-label">Happy<br />Clients</div>
            </div>
            <div className="hero-ribbon">
              <span className="hero-ribbon-small">First Visit</span>
              <span className="hero-ribbon-bold">10% Off</span>
            </div>
          </div>
        </section>

        {/* TICKER */}
        <div className="ticker">
          <div className="ticker-track">
            {[...Array(2)].map((_, i) => (
              <span key={i}>
                <span className="ticker-item">Box Braids</span><span className="ticker-dot" />
                <span className="ticker-item">Knotless Braids</span><span className="ticker-dot" />
                <span className="ticker-item">Wig Installation</span><span className="ticker-dot" />
                <span className="ticker-item">Silk Press</span><span className="ticker-dot" />
                <span className="ticker-item">Hair Treatments</span><span className="ticker-dot" />
                <span className="ticker-item">Cornrows</span><span className="ticker-dot" />
                <span className="ticker-item">Colour Services</span><span className="ticker-dot" />
                <span className="ticker-item">Loc Styles</span><span className="ticker-dot" />
              </span>
            ))}
          </div>
        </div>

        {/* ABOUT + VIDEO */}
        <section className="about-section" id="about">
          <div data-section="about" style={fadeUp('about', 0)}>
            <div className="about-label">Our Story</div>
            <h2 className="about-title">
              Where craft meets<br /><em>artistry</em>
            </h2>
            <p className="about-text" style={{fontSize: "20px"}}>
              At GlamStudio, every appointment is a ritual. We've spent years perfecting the techniques that celebrate the beauty and versatility of textured hair — blending African braiding heritage with contemporary style.
            </p>
            <p className="about-text" style={{fontSize: "20px"}}>
              Our stylists are not just hairdressers. They're artists, trained in the latest methods, committed to protecting your hair's health while creating looks that turn heads.
            </p>
            <div className="about-stats">
              <div><div className="stat-num">8+</div><div className="stat-label">Years Excellence</div></div>
              <div><div className="stat-num">98%</div><div className="stat-label">Satisfaction Rate</div></div>
              <div><div className="stat-num">500+</div><div className="stat-label">Happy Clients</div></div>
            </div>
          </div>

          <div className="video-box" data-section="video" style={fadeIn('video', 0.2)}>
            <div className="video-corner-line" />
            <div className="video-frame">
              <img src="https://images.unsplash.com/photo-1560869713-7d0a29430803?w=700" alt="Salon preview" />
              <div className="video-play-overlay">
                <div className="play-btn">
                  <svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21" /></svg>
                </div>
              </div>
            </div>
            <div className="video-caption">
              <div className="video-caption-text">"Beauty is a ritual, not a routine."</div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="services-section" id="services">
          <div className="section-header" data-section="services" style={fadeUp('services', 0)}>
            <div>
              <div className="section-label">What We Offer</div>
              <h2 className="section-title">Our <em>Signature</em> Services</h2>
            </div>
            <a href="/services" className="view-all">View All Services →</a>
          </div>
          <div className="services-grid" data-section="services-grid" style={fadeIn('services-grid', 0.15)}>
            {services.map((s, i) => (
              <div key={i} className="service-card">
                <img src={s.img} alt={s.name} />
                <div className="service-book-tag">Book</div>
                <div className="service-card-info">
                  <div className="service-name">{s.name}</div>
                  <div className="service-meta">
                    <span>{s.duration}</span>
                    <span>{s.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROCESS */}
        <section className="process-section">
          <div className="process-image-stack" data-section="process-img" style={fadeIn('process-img', 0)}>
            <img className="process-img-main" src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=600" alt="Braiding" />
            <img className="process-img-accent" src="https://images.unsplash.com/photo-1614272537596-d6ff57e9b64c?w=400" alt="Hair detail" />
          </div>
          <div data-section="process" style={fadeUp('process', 0)}>
            <div className="section-label">The Experience</div>
            <h2 className="section-title" style={{ marginBottom: '1rem' }}>
              Your visit,<br /><em>step by step</em>
            </h2>
            <div className="process-steps">
              {steps.map((step, i) => (
                <div key={i} className="process-step" data-section={`step-${i}`} style={fadeUp(`step-${i}`, i * 0.1)}>
                  <div className="step-num">{step.n}</div>
                  <div>
                    <div className="step-title">{step.t}</div>
                    <div className="step-desc">{step.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="testimonials-section">
          <div data-section="testimonials" style={fadeUp('testimonials', 0)}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Client Love</div>
            <h2 className="section-title">Loved by our <em>clients</em></h2>
          </div>
          <div className="testimonials-grid" data-section="testimonials-grid" style={fadeIn('testimonials-grid', 0.2)}>
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <span className="quote-mark">"</span>
                <div className="stars">{'★'.repeat(t.stars)}</div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">{t.name}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <div data-section="cta" style={fadeUp('cta', 0)}>
            <div className="cta-offer">First Visit — 10% Off</div>
            <h2 className="cta-title">
              Ready to feel<br /><em>extraordinary?</em>
            </h2>
            <p className="cta-sub">
              Book your appointment today. Whether you're a regular or first-timer, we promise an experience that goes far beyond the chair.
            </p>
            <Link to="/booking" className="btn-pink">Reserve Your Appointment →</Link>
          </div>
          <div className="cta-image" data-section="cta-img" style={fadeIn('cta-img', 0.2)}>
            <img src="https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800" alt="Salon CTA" />
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer" id="contact">
          <div className="footer-grid">
            <div>
              <div className="footer-logo">GlamStudio</div>
              <p className="footer-tagline">Luxury hair care rooted in<br />African beauty and artistry.<br />Johannesburg, South Africa.</p>
            </div>
            <div>
              <div className="footer-heading">Services</div>
              <ul className="footer-links">
                <li><a href="#">Box Braids</a></li>
                <li><a href="#">Knotless Braids</a></li>
                <li><a href="#">Wig Installation</a></li>
                <li><a href="#">Silk Press</a></li>
                <li><a href="#">Treatments</a></li>
              </ul>
            </div>
            <div>
              <div className="footer-heading">Studio</div>
              <ul className="footer-links">
                <li><a href="#">About Us</a></li>
                <li><a href="#">Our Team</a></li>
                <li><a href="#">Gallery</a></li>
                <li><a href="#">Pricing</a></li>
              </ul>
            </div>
            <div>
              <div className="footer-heading">Contact</div>
              <ul className="footer-links">
                <li><a href="#">Johannesburg, ZA</a></li>
                <li><a href="#">info@glamstudio.co.za</a></li>
                <li><a href="#">Mon–Sat 8am–7pm</a></li>
                <li><a href="#">Book Online</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-copy">© 2026 GlamStudio. All rights reserved.</div>
            <div className="footer-social">
              <a href="#">Instagram</a>
              <a href="#">TikTok</a>
              <a href="#">Facebook</a>
              <a href="#">WhatsApp</a>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
};

export default Home;