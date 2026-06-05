import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope, FaChevronUp, FaFacebook, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        position: 'relative',
        width: '100%',
        padding: '60px 10% 40px 10%',
        backgroundColor: '#03050c',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '30px',
      }}
    >
      {/* Scroll to Top Trigger */}
      <button
        onClick={handleScrollToTop}
        className="interactive"
        style={{
          position: 'absolute',
          top: '-22px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          backgroundColor: '#03050c',
          border: '1px solid rgba(0, 255, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--primary-glow)',
          cursor: 'pointer',
          boxShadow: '0 0 10px rgba(0,255,255,0.1)',
          transition: 'var(--transition-fast)',
        }}
        onMouseEnter={(e) => {
          e.target.style.borderColor = 'var(--primary-glow)';
          e.target.style.boxShadow = '0 0 20px var(--primary-glow)';
        }}
        onMouseLeave={(e) => {
          e.target.style.borderColor = 'rgba(0, 255, 255, 0.2)';
          e.target.style.boxShadow = '0 0 10px rgba(0,255,255,0.1)';
        }}
      >
        <FaChevronUp />
      </button>

      <div style={{ textAlign: 'center' }}>
        <h3
          style={{
            fontFamily: 'var(--font-title)',
            fontSize: '1.2rem',
            letterSpacing: '3px',
            color: '#fff',
            marginBottom: '10px',
            textTransform: 'uppercase',
          }}
        >
          Thank you for exploring my digital mind
        </h3>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>
          Designed and coded from the matrix of Awais Iqbal &copy; {new Date().getFullYear()}
        </p>
      </div>

      {/* Social anchors */}
      <div style={{ display: 'flex', gap: '25px' }}>
        <a
          href="https://www.linkedin.com/in/awais-iqbal-8529023b0"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '1.3rem',
            transition: 'var(--transition-fast)',
          }}
          onMouseEnter={(e) => e.target.style.color = 'var(--primary-glow)'}
          onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.5)'}
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/Awaisiqbal-Code"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '1.3rem',
            transition: 'var(--transition-fast)',
          }}
          onMouseEnter={(e) => e.target.style.color = 'var(--primary-glow)'}
          onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.5)'}
        >
          <FaGithub />
        </a>
        <a
          href="https://www.facebook.com/profile.php?id=61584604024333"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '1.3rem',
            transition: 'var(--transition-fast)',
          }}
          onMouseEnter={(e) => e.target.style.color = 'var(--primary-glow)'}
          onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.5)'}
        >
          <FaFacebook />
        </a>
        <a
          href="https://wa.me/923224214280"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '1.3rem',
            transition: 'var(--transition-fast)',
          }}
          onMouseEnter={(e) => e.target.style.color = 'var(--primary-glow)'}
          onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.5)'}
        >
          <FaWhatsapp />
        </a>
        <a
          href="mailto:connect.awaisiqbal@gmail.com"
          style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '1.3rem',
            transition: 'var(--transition-fast)',
          }}
          onMouseEnter={(e) => e.target.style.color = 'var(--primary-glow)'}
          onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.5)'}
        >
          <FaEnvelope />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
