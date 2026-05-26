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
    { name: 'Box Braids',      img: "/boxbraids.jpg" },
    { name: 'Wig Installation', img: "/wigsinstall.jpg" },
    { name: 'Knotless Braids',  img: "/knotless.jpg" },
    { name: 'Silk Press',       img: "/silk.jpg" },
  ];

  const testimonials = [
    { name: 'Lerato M.',      text: 'Absolutely obsessed with my knotless braids. The team is so talented and the salon feels like a sanctuary.',      stars: 5 },
    { name: 'Thandi K.',      text: "Best wig install I've ever had. Natural, flawless, undetectable. I feel like a whole new woman!",                  stars: 5 },
    { name: 'Nompumelelo D.', text: 'Been coming here for two years and every single visit is better than the last. Pure luxury.',                     stars: 5 },
  ];

  const steps = [
    { n: '01', t: 'Consultation', d: 'We discuss your vision, style preferences, and hair goals.' },
    { n: '02', t: 'Custom Preparation', d: 'Your hair is washed and prepped with premium products for your hair type.' },
    { n: '03', t: 'Expert Styling', d: 'Our stylists create your look with precision and care.' },
    { n: '04', t: 'Finishing & Aftercare', d: 'We seal your style and guide you on home maintenance.' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Jost:wght@200;300;400;500&display=swap');

        :root {
          --rose:       #c2185b;
          --rose-deep:  #880e4f;
          --rose-light: #f8bbd0;
          --rose-pale:  #fce4ec;
          --rose-blush: #fff0f5;
          --cream:      #fffaf8;
          --dark:       #1a0a10;
          --muted:      #a08090;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Jost', sans-serif; background: var(--cream); color: var(--dark); overflow-x: hidden; }

        /* HERO */
        .hero { 
          display: grid; 
          grid-template-columns: 1fr 1fr; 
          overflow: hidden; 
          min-height: 100vh;
        }
        .hero-left { 
          display: flex; 
          flex-direction: column; 
          justify-content: center; 
          padding: 4rem 6% 4rem 7%; 
          background: var(--cream); 
          position: relative; 
        }
        .hero-left::after { 
          content: ''; 
          position: absolute; 
          right: 0; 
          top: 10%; 
          bottom: 10%; 
          width: 1px; 
          background: linear-gradient(to bottom, transparent, var(--rose-light), transparent); 
        }
        .hero-eyebrow { 
          font-size: 0.87rem; 
          letter-spacing: 0.4em; 
          text-transform: uppercase; 
          color: var(--rose); 
          margin-bottom: 1.8rem; 
          display: flex; 
          align-items: center; 
          gap: 0.8rem; 
          font-weight: 400; 
        }
        .hero-eyebrow::before { 
          content: ''; 
          display: block; 
          width: 28px; 
          height: 1px; 
          background: var(--rose); 
          flex-shrink: 0; 
        }
        .hero-title { 
          font-family: 'Cormorant Garamond', serif; 
          font-size: 5rem; 
          font-weight: 400; 
          line-height: 1.05; 
          color: var(--dark); 
          margin-bottom: 1.8rem; 
        }
        .hero-title em { font-style: italic; color: var(--rose); display: block; }
        .hero-sub { 
          font-size: 1.3rem; 
          font-weight: 300; 
          color: black; 
          line-height: 2; 
          margin-bottom: 3rem; 
          max-width: 380px; 
        }
        .hero-cta { display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; }
        .btn-rose { 
          background: var(--rose); 
          color: #fff; 
          padding: 0.95rem 2.2rem; 
          text-decoration: none; 
          font-family: 'Jost', sans-serif; 
          font-size: 0.65rem; 
          letter-spacing: 0.22em; 
          text-transform: uppercase; 
          font-weight: 500; 
          display: inline-block; 
          transition: background 0.2s; 
          border: none;
          cursor: pointer;
        }
        .btn-rose:hover { background: var(--rose-deep); }
        .btn-ghost { 
          border: 1px solid var(--rose-light); 
          color: var(--rose); 
          padding: 0.95rem 1.8rem; 
          text-decoration: none; 
          font-family: 'Jost', sans-serif; 
          font-size: 0.65rem; 
          letter-spacing: 0.2em; 
          text-transform: uppercase; 
          display: inline-block; 
          transition: all 0.2s; 
          background: transparent; 
          cursor: pointer;
        }
        .btn-ghost:hover { background: var(--rose-pale); }
        .hero-right { position: relative; overflow: hidden; background: var(--rose-pale); }
        .hero-right img { width: 100%; height: 100%; object-fit: cover; display: block; filter: brightness(0.92); }
        .hero-badge { 
          position: absolute; 
          top: 2.5rem; 
          left: 2rem; 
          background: rgba(255,255,255,0.95); 
          backdrop-filter: blur(8px); 
          border: 1px solid var(--rose-light); 
          padding: 1rem 1.4rem; 
        }
        .hero-badge-num { font-family: 'Cormorant Garamond', serif; font-size: 2.4rem; color: var(--rose); font-weight: 400; line-height: 1; }
        .hero-badge-label { font-size: 0.58rem; letter-spacing: 0.18em; text-transform: uppercase; color: #bbb; margin-top: 0.3rem; line-height: 1.5; }
        .hero-ribbon { 
          position: absolute; 
          bottom: 2.5rem; 
          right: 2rem; 
          background: var(--rose); 
          padding: 1rem 1.6rem; 
          text-align: center; 
          color: #fff; 
        }
        .hero-ribbon-small { font-size: 0.58rem; letter-spacing: 0.22em; text-transform: uppercase; line-height: 2; display: block; opacity: 0.8; }
        .hero-ribbon-bold { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; font-style: italic; display: block; }

        /* TICKER */
        .ticker { background: var(--rose-pale); padding: 0.8rem 0; overflow: hidden; white-space: nowrap; border-top: 1px solid var(--rose-light); border-bottom: 1px solid var(--rose-light); }
        .ticker-track { display: inline-block; animation: tickMove 26s linear infinite; }
        .ticker-item { display: inline-block; font-size: 0.6rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--rose); padding: 0 2.5rem; font-weight: 400; }
        .ticker-dot { display: inline-block; width: 4px; height: 4px; background: var(--rose-light); border-radius: 50%; vertical-align: middle; margin: 0 0.25rem; }
        @keyframes tickMove { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

        /* SHARED */
        .section-eyebrow { 
          font-size: 1rem; 
          letter-spacing: 0.35em; 
          text-transform: uppercase; 
          color: var(--rose); 
          margin-bottom: 1.2rem; 
          display: flex; 
          align-items: center; 
          gap: 0.8rem; 
          font-weight: 400; 
        }
        .section-eyebrow::before { 
          content: ''; 
          display: block; 
          width: 28px; 
          height: 1px; 
          background: var(--rose); 
          flex-shrink: 0; 
        }
        .section-heading { 
          font-family: 'Cormorant Garamond', serif; 
          font-size: 3rem; 
          font-weight: 400; 
          line-height: 1.15; 
          color: var(--dark); 
          margin-bottom: 1.6rem; 
        }
        .section-heading em { font-style: italic; color: var(--rose); }
        .body-text { font-size: 1.1rem; color: black; line-height: 1.6; font-weight: 300; margin-bottom: 1.2rem; }

        /* ABOUT */
        .about-section { padding: 8rem 7%; display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; background: #fff; }
        .about-stats { display: flex; gap: 2.5rem; margin-top: 2.5rem; padding-top: 2rem; border-top: 1px solid var(--rose-pale); flex-wrap: wrap; }
        .stat-num { font-family: 'Cormorant Garamond', serif; font-size: 2.6rem; color: var(--rose); line-height: 1; font-weight: 400; }
        .stat-label { font-size: 0.8rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--rose); margin-top: 0.3rem; }
        .video-box { position: relative; }
        .video-corner { position: absolute; top: -14px; left: -14px; width: 40px; height: 40px; border-top: 1px solid var(--rose-light); border-left: 1px solid var(--rose-light); z-index: 2; }
        .video-frame { position: relative; overflow: hidden; }
        .video-frame img { width: 100%; display: block; object-fit: cover; aspect-ratio: 4/5; }
        .play-btn { width: 58px; height: 58px; border: 1.5px solid var(--rose); border-radius: 50%; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.9); transition: transform 0.2s; }
        .play-overlay:hover .play-btn { transform: scale(1.1); }
        .play-btn svg { width: 16px; height: 16px; fill: var(--rose); margin-left: 3px; }
        .video-caption { position: absolute; bottom: -14px; right: -14px; background: var(--rose); padding: 1rem 1.4rem; z-index: 2; }
        .video-caption-text { font-family: 'Cormorant Garamond', serif; font-size: 0.85rem; font-style: italic; color: #fff; }

        /* SERVICES */
        .services-section { padding: 8rem 7%; background: var(--rose-blush); }
        .section-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 3.5rem; flex-wrap: wrap; gap: 1.5rem; }
        .view-all { font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase; color: #aaa; text-decoration: none; border-bottom: 1px solid #eee; padding-bottom: 2px; transition: all 0.2s; }
        .view-all:hover { color: var(--rose); border-color: var(--rose); }
        .services-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; }
        .service-card { position: relative; overflow: hidden; cursor: pointer; }
        .service-card img { width: 100%; aspect-ratio: 3/4; object-fit: cover; display: block; transition: transform 0.7s ease; filter: brightness(0.78); }
        .service-card:hover img { transform: scale(1.06); filter: brightness(0.6); }
        .service-tag { position: absolute; top: 1rem; right: 1rem; border: 1px solid transparent; color: transparent; font-size: 0.58rem; letter-spacing: 0.18em; text-transform: uppercase; padding: 0.3rem 0.8rem; transition: all 0.3s; }
        .service-card:hover .service-tag { border-color: rgba(255,255,255,0.55); color: #fff; }
        .service-info { position: absolute; bottom: 0; left: 0; right: 0; padding: 1.8rem 1.2rem; background: linear-gradient(to top, rgba(26,10,16,0.88) 0%, transparent 100%); transform: translateY(4px); transition: transform 0.3s; }
        .service-card:hover .service-info { transform: translateY(0); }
        .service-name { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; color: #fff; font-weight: 400; margin-bottom: 0.3rem; }
        .service-meta { font-size: 0.62rem; letter-spacing: 0.1em; color: var(--rose-light); display: flex; gap: 0.8rem; }

        /* PROCESS */
        .process-section { padding: 8rem 7%; display: grid; grid-template-columns: 1.1fr 1fr; gap: 6rem; align-items: center; background: #fff; }
        .process-stack { position: relative; }
        .process-img-main { width: 80%; aspect-ratio: 4/5; object-fit: cover; display: block; }
        .process-img-accent { position: absolute; bottom: -28px; right: 0; width: 44%; aspect-ratio: 1; object-fit: cover; border: 4px solid #fff; box-shadow: 0 8px 32px rgba(194,24,91,0.1); }
        .process-steps { margin-top: 2.5rem; }
        .process-step { display: grid; grid-template-columns: 48px 1fr; gap: 1.4rem; align-items: start; margin-bottom: 2rem; padding-bottom: 2rem; border-bottom: 1px solid var(--rose-pale); }
        .process-step:last-child { border-bottom: none; margin-bottom: 0; }
        .step-n { font-family: 'Cormorant Garamond', serif; font-size: 2.4rem; font-weight: 500; color: #9b3a7b; }
        .step-title { font-family: 'Cormorant Garamond', serif; font-size: 1.6rem; color: #000; margin-bottom: 0.4rem; font-weight: 500; }
        .step-desc { font-size: 1rem; color: #444; font-weight: 300; line-height: 1.4; }

        /* TESTIMONIALS */
        .testimonials-section { padding: 8rem 7%; background: var(--rose-blush); text-align: center; }
        .testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-top: 3.5rem; }
        .testimonial-card { background: #fff; border: 1px solid var(--rose-pale); padding: 2.4rem; text-align: left; transition: box-shadow 0.3s; }
        .testimonial-card:hover { box-shadow: 0 8px 40px rgba(194,24,91,0.08); }
        .quote-mark { font-family: 'Cormorant Garamond', serif; font-size: 5rem; line-height: 0.5; color: var(--rose-pale); display: block; margin-bottom: 1.2rem; }
        .stars { color: #ffb347; font-size: 1rem; letter-spacing: 0.2em; margin-bottom: 0.8rem; }
        .testimonial-text { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; font-style: italic; color: #000; margin-bottom: 1.2rem; font-weight: 300; line-height: 1.4; }
        .testimonial-author { font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--rose); font-weight: 500; }

        /* CTA */
        .cta-section { padding: 8rem 7%; background: var(--rose-pale); display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
        .cta-pill { display: inline-block; background: #fff; border: 1px solid var(--rose-light); color: var(--rose); padding: 0.45rem 1.2rem; font-size: 0.58rem; letter-spacing: 0.28em; text-transform: uppercase; margin-bottom: 1.8rem; }
        .cta-title { font-family: 'Cormorant Garamond', serif; font-size: 3.5rem; font-weight: 400; line-height: 1.1; color: var(--dark); margin-bottom: 1.4rem; }
        .cta-title em { font-style: italic; color: var(--rose); }
        .cta-sub { font-size: 1.1rem; color: #2c2828; font-weight: 300; margin-bottom: 2.5rem; line-height: 1.5; }
        .cta-image { overflow: hidden; }
        .cta-image img { width: 100%; aspect-ratio: 4/3; object-fit: cover; display: block; transition: transform 0.6s ease; }
        .cta-image:hover img { transform: scale(1.03); }

        /* FOOTER */
        .footer { background: #fff; padding: 5rem 7% 2.5rem; }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; margin-bottom: 3rem; }
        .footer-logo { font-family: 'Cormorant Garamond', serif; font-size: 2rem; color: #62163c; margin-bottom: 0.8rem; font-weight: 400; }
        .footer-tagline { font-size: 0.9rem; color: #000; font-weight: 300; }
        .footer-heading { font-size: 0.9rem; letter-spacing: 0.32em; text-transform: uppercase; color: #000; margin-bottom: 1.2rem; font-weight: 400; }
        .footer-links { list-style: none; display: flex; flex-direction: column; gap: 0.7rem; padding: 0; }
        .footer-links li { margin: 0; }
        .footer-links a { font-size: 0.8rem; color: #444; text-decoration: none; transition: color 0.2s; font-weight: 300; }
        .footer-links a:hover { color: var(--rose); }
        .whatsapp-link { display: inline-flex; align-items: center; gap: 0.5rem; }
        .footer-bottom { border-top: 1px solid rgba(0,0,0,0.05); padding-top: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
        .footer-copy { font-size: 0.65rem; color: #2a151c; }
        .footer-hours { font-size: 0.65rem; color: #2a151c; }

        /* ========= ENHANCED RESPONSIVE ========= */
        /* Large tablets & small desktops */
        @media (max-width: 1200px) {
          .hero-title { font-size: 4.2rem; }
          .section-heading { font-size: 2.6rem; }
          .services-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
          .testimonials-grid { gap: 1rem; }
        }
        /* Tablets (max-width: 1024px) */
        @media (max-width: 1024px) {
          .hero-title { font-size: 3.8rem; }
          .about-section, .process-section, .cta-section { gap: 3rem; }
          .process-stack { display: none; }
          .process-section { grid-template-columns: 1fr; }
          .footer-grid { grid-template-columns: repeat(2, 1fr); gap: 2rem; }
        }
        /* Mobile landscape & tablets portrait (max-width: 900px) */
        @media (max-width: 900px) {
          .hero { grid-template-columns: 1fr; min-height: auto; }
          .hero-left { padding: 3rem 6%; order: 2; text-align: center; align-items: center; }
          .hero-left::after { display: none; }
          .hero-eyebrow { justify-content: center; }
          .hero-sub { max-width: 100%; text-align: center; }
          .hero-cta { justify-content: center; }
          .hero-right { order: 1; height: 60vw; max-height: 480px; min-height: 320px; }
          .hero-badge { top: 1.5rem; left: 1.5rem; padding: 0.8rem 1.2rem; }
          .hero-ribbon { bottom: 1.5rem; right: 1.5rem; padding: 0.8rem 1.2rem; }
          .about-section, .process-section, .cta-section { grid-template-columns: 1fr; padding: 5rem 6%; }
          .services-section, .testimonials-section { padding: 5rem 6%; }
          .testimonials-grid { grid-template-columns: 1fr; max-width: 500px; margin-left: auto; margin-right: auto; }
          .services-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
          .section-header { flex-direction: column; align-items: flex-start; gap: 0.5rem; }
          .cta-title { font-size: 2.8rem; }
        }
        /* Mobile small (max-width: 640px) */
        @media (max-width: 640px) {
          .hero-title { font-size: 2.8rem; }
          .hero-sub { font-size: 1rem; line-height: 1.6; }
          .section-heading { font-size: 2.2rem; }
          .services-grid { grid-template-columns: 1fr; gap: 1rem; }
          .service-card img { aspect-ratio: 1/1; }
          .about-stats { gap: 1.5rem; justify-content: space-between; }
          .stat-num { font-size: 2rem; }
          .stat-label { font-size: 0.7rem; }
          .process-step { grid-template-columns: 40px 1fr; gap: 1rem; }
          .step-title { font-size: 1.3rem; }
          .step-desc { font-size: 0.9rem; }
          .testimonial-text { font-size: 1rem; }
          .cta-section { text-align: center; }
          .cta-title { font-size: 2.2rem; }
          .btn-rose, .btn-ghost { padding: 0.75rem 1.5rem; font-size: 0.6rem; }
          .footer-grid { grid-template-columns: 1fr; gap: 2rem; text-align: center; }
          .footer-heading { text-align: center; }
          .footer-links { align-items: center; }
          .footer-bottom { flex-direction: column; text-align: center; }
          .hero-eyebrow { font-size: 0.7rem; letter-spacing: 0.3em; }
          .ticker-item { font-size: 0.5rem; padding: 0 1rem; }
        }
        /* Extra small devices (max-width: 480px) */
        @media (max-width: 480px) {
          .hero-title { font-size: 2.2rem; }
          .hero-sub { font-size: 0.95rem; }
          .section-heading { font-size: 1.9rem; }
          .section-eyebrow { font-size: 0.7rem; }
          .about-stats { flex-direction: column; align-items: center; gap: 1rem; text-align: center; }
          .stat-num { font-size: 2.2rem; }
          .video-caption { padding: 0.5rem 1rem; bottom: -8px; right: -8px; }
          .video-caption-text { font-size: 0.7rem; }
          .hero-badge { padding: 0.5rem 1rem; top: 1rem; left: 1rem; }
          .hero-badge-num { font-size: 1.8rem; }
          .hero-ribbon { padding: 0.5rem 1rem; bottom: 1rem; right: 1rem; }
          .hero-ribbon-bold { font-size: 1rem; }
          .cta-title { font-size: 1.8rem; }
          .cta-sub { font-size: 0.9rem; }
          .testimonial-card { padding: 1.5rem; }
          .process-step { grid-template-columns: 1fr; text-align: center; gap: 0.5rem; }
          .step-n { text-align: center; }
        }
        /* Fix spacing and overflow */
        img, video, iframe { max-width: 100%; height: auto; }
        .hero-right img, .cta-image img, .video-frame img { width: 100%; height: auto; object-fit: cover; }
        .services-grid, .testimonials-grid, .footer-grid { width: 100%; }
        a, button { cursor: pointer; }
        body { overflow-x: hidden; width: 100%; }
      `}</style>

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <div className="hero-eyebrow">101 Vorster Avenue Glenanda</div>
          <h1 className="hero-title">Your Hair,<em>Elevated.</em></h1>
          <p className="hero-sub">Expert braids, bespoke wig installations and premium hair care crafted for women who demand nothing less than extraordinary.</p>
          <div className="hero-cta">
            <Link to="/booking" className="btn-rose">Book Appointment</Link>
            <Link to="/services" className="btn-ghost">Our Services</Link>
          </div>
        </div>
        <div className="hero-right">
          <img src="/curlystyle.jpg.jpg" alt="Salon hero" />
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

      {/* ABOUT */}
      <section className="about-section" id="about">
        <div data-section="about" style={fadeUp('about', 0)}>
          <div className="section-eyebrow">Our Story</div>
          <h2 className="section-heading">Where craft meets<br /><em>artistry</em></h2>
          <p className="body-text">At Esther's Glowious Beauty, every appointment is a ritual. We've spent years perfecting the techniques that celebrate the beauty and versatility of textured hair.</p>
          <div className="about-stats">
            <div><div className="stat-num">8+</div><div className="stat-label">Years Excellence</div></div>
            <div><div className="stat-num">98%</div><div className="stat-label">Satisfaction Rate</div></div>
            <div><div className="stat-num">500+</div><div className="stat-label">Happy Clients</div></div>
          </div>
        </div>
        <div className="video-box" data-section="video" style={fadeIn('video', 0.2)}>
          <div className="video-frame">
            <img src="/butterflies.jpg" alt="Salon preview" />
            <div className="play-overlay"></div>
          </div>
          <div className="video-caption"><div className="video-caption-text">"Beauty is a ritual, not a routine."</div></div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services-section" id="services">
        <div className="section-header" data-section="services" style={fadeUp('services', 0)}>
          <div>
            <div className="section-eyebrow">What We Offer</div>
            <h2 className="section-heading" style={{ marginBottom: 0 }}>Our <em>Signature</em> Services</h2>
          </div>
          <Link to="/services" className="view-all">View All →</Link>
        </div>
        <div className="services-grid" data-section="services-grid" style={fadeIn('services-grid', 0.15)}>
          {services.map((s, i) => (
            <div key={i} className="service-card">
              <img src={s.img} alt={s.name} />
              <div className="service-tag">Book Now</div>
              <div className="service-info">
                <div className="service-name">{s.name}</div>
                <div className="service-meta"><span>From R450</span></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="process-section">
        <div className="process-stack" data-section="process-img" style={fadeIn('process-img', 0)}>
          <img className="process-img-main" src="/curls.jpg" alt="Braiding" />
          <img className="process-img-accent" src="/Lemonade Fulani braids✨.jpg" alt="Hair detail" />
        </div>
        <div data-section="process" style={fadeUp('process', 0)}>
          <div className="section-eyebrow">The Experience</div>
          <h2 className="section-heading" style={{ marginBottom: '1.2rem' }}>Your visit,<br /><em>step by step</em></h2>
          <div className="process-steps">
            {steps.map((step, i) => (
              <div key={i} className="process-step" data-section={`step-${i}`} style={fadeUp(`step-${i}`, i * 0.1)}>
                <div className="step-n">{step.n}</div>
                <div><div className="step-title">{step.t}</div><div className="step-desc">{step.d}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section">
        <div data-section="testimonials" style={fadeUp('testimonials', 0)}>
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>Client Love</div>
          <h2 className="section-heading">Loved by our <em>clients</em></h2>
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
          <h2 className="cta-title">Ready to feel<br /><em>extraordinary?</em></h2>
          <p className="cta-sub">Book your appointment today. Whether you're a regular or first-timer, we promise an experience that goes far beyond the chair.</p>
          <Link to="/booking" className="btn-rose">Reserve Your Appointment →</Link>
        </div>
        <div className="cta-image" data-section="cta-img" style={fadeIn('cta-img', 0.2)}>
          <img src="https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800" alt="Salon CTA" />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer" id="contact">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">Esther's <em>Glowious</em></div>
            <p className="footer-tagline">101 Vorster Avenue, Glenanda Johannesburg</p>
          </div>
          <div>
            <div className="footer-heading">Services</div>
            <ul className="footer-links">
              <li><Link to="/services">Box Braids</Link></li>
              <li><Link to="/services">Knotless Braids</Link></li>
              <li><Link to="/services">Wig Installation</Link></li>
              <li><Link to="/services">Silk Press</Link></li>
            </ul>
          </div>
          <div>
            <div className="footer-heading">Studio</div>
            <ul className="footer-links">
              <li><a href="#about">About Us</a></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/booking">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <div className="footer-heading">Connect</div>
            <ul className="footer-links">
              <li>
                <a href="https://wa.me/27849770184" target="_blank" rel="noopener noreferrer" className="whatsapp-link">
                  📱 WhatsApp: +27 84 977 0184
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© 2026 Esther's Glowious Beauty</div>
          <div className="footer-hours">Mon–Sat 8am–7pm</div>
        </div>
      </footer>
    </>
  );
};

export default Home;