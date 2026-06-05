import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = ({ devMode, handleAvatarClick, avatarImg }) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: 'HOME', id: 'hero' },
    { label: 'ABOUT', id: 'about' },
    { label: 'PROJECTS', id: 'projects' },
    { label: 'EXPERIENCE', id: 'experience' },
    { label: 'CERTIFICATES', id: 'certificates' },
    { label: 'CONTACT', id: 'contact' },
  ];

  // Track scroll position to change background and detect active section
  useEffect(() => {
    const handleScroll = () => {
      // Background scroll style
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Active section detection
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: scrolled ? '70px' : '90px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 5%',
          zIndex: 1000,
          background: scrolled ? 'rgba(5, 8, 22, 0.75)' : 'rgba(5, 8, 22, 0.2)',
          backdropFilter: scrolled ? 'blur(20px)' : 'blur(5px)',
          borderBottom: scrolled ? '1px solid rgba(0, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.03)',
          boxShadow: scrolled ? '0 10px 30px -10px rgba(0, 255, 255, 0.1)' : 'none',
          transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
      >
        {/* Left Side: Interactive Logo & Avatar */}
        <div 
          onClick={handleAvatarClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          <div
            style={{
              width: scrolled ? '34px' : '40px',
              height: scrolled ? '34px' : '40px',
              borderRadius: '50%',
              overflow: 'hidden',
              background: 'rgba(5, 8, 22, 0.8)',
              border: devMode ? '2px solid var(--primary-glow)' : '2px solid rgba(255, 255, 255, 0.3)',
              boxShadow: devMode ? '0 0 15px var(--primary-glow)' : '0 0 5px rgba(0, 255, 255, 0.1)',
              transition: 'all 0.3s ease',
            }}
          >
            <img
              src={avatarImg}
              alt="Awais Iqbal"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
          
          <span
            style={{
              fontFamily: 'var(--font-title)',
              fontWeight: 900,
              fontSize: scrolled ? '0.85rem' : '1rem',
              letterSpacing: '2px',
              color: devMode ? 'var(--primary-glow)' : '#fff',
              textShadow: devMode ? '0 0 10px var(--primary-glow)' : 'none',
              transition: 'all 0.3s ease',
            }}
          >
            {devMode ? 'SYS_DEV_MODE_ON' : 'AI.'}
          </span>
        </div>

        {/* Right Side: Desktop Nav Items */}
        <nav 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '30px',
          }}
          className="desktop-nav"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <div
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  position: 'relative',
                  fontFamily: 'var(--font-title)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  color: isActive ? 'var(--primary-glow)' : 'rgba(255, 255, 255, 0.6)',
                  cursor: 'pointer',
                  padding: '8px 0',
                  transition: 'color 0.3s ease',
                  textShadow: isActive ? '0 0 10px rgba(0, 255, 255, 0.5)' : 'none',
                }}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeUnderline"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'linear-gradient(90deg, transparent, var(--primary-glow), transparent)',
                      boxShadow: '0 0 8px var(--primary-glow)',
                    }}
                  />
                )}
              </div>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle */}
        <div 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'none',
            fontSize: '1.4rem',
            color: '#fff',
            cursor: 'pointer',
            zIndex: 1001,
            transition: 'all 0.3s ease',
          }}
          className="mobile-nav-toggle"
        >
          {mobileMenuOpen ? <FaTimes style={{ color: 'var(--primary-glow)' }} /> : <FaBars />}
        </div>
      </motion.header>

      {/* Mobile Nav Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100vh',
              background: 'rgba(3, 1, 15, 0.96)',
              backdropFilter: 'blur(25px)',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '30px',
            }}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNavClick(item.id)}
                  style={{
                    fontFamily: 'var(--font-title)',
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    letterSpacing: '3px',
                    color: isActive ? 'var(--primary-glow)' : '#rgba(255, 255, 255, 0.7)',
                    cursor: 'pointer',
                    textShadow: isActive ? '0 0 15px rgba(0, 255, 255, 0.6)' : 'none',
                  }}
                >
                  {item.label}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inline styles for media queries */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-nav-toggle {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
