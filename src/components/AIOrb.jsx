import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaCompass, FaChevronRight } from 'react-icons/fa';

const AIOrb = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [bubbleText, setBubbleText] = useState('Greetings Human. Awaiting navigation coordinates.');

  // Auto-dismiss initial greeting bubble
  useEffect(() => {
    const timer = setTimeout(() => {
      setBubbleText('');
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const navigationCoords = [
    { label: 'Core Biography', id: 'about', msg: 'Navigating to Neural Profile.' },
    { label: 'Skill Database', id: 'skills', msg: 'Loading neural skill network.' },
    { label: 'Creations & Repos', id: 'projects', msg: 'Initiating project hands visualizer.' },
    { label: 'Credentials Vault', id: 'certificates', msg: 'Cracking certificate security system.' },
    { label: 'Send Transmission', id: 'contact', msg: 'Aligning communication dishes.' }
  ];

  const handleNavigate = (id, message) => {
    setBubbleText(message);
    setIsOpen(false);
    
    // Smooth scroll trigger
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }

    // Auto-dismiss the navigation response message after 4 seconds
    setTimeout(() => {
      setBubbleText('');
    }, 4000);
  };

  return (
    <div className="ai-orb-container">
      {/* Speech bubble */}
      <AnimatePresence>
        {(isOpen || bubbleText) && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className="speech-bubble"
            style={{
              background: 'rgba(5, 8, 22, 0.85)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0, 255, 255, 0.2)',
              borderRadius: '12px',
              padding: '12px 18px',
              maxWidth: '240px',
              fontSize: '0.8rem',
              color: '#fff',
              boxShadow: '0 4px 15px rgba(0,255,255,0.1)',
              position: 'relative',
              marginBottom: '15px',
              fontFamily: 'var(--font-title)',
            }}
          >
            {bubbleText || 'Awaiting coordinates.'}
            {/* Tiny arrow pointing to the orb on the right */}
            <div
              style={{
                position: 'absolute',
                bottom: '15px',
                right: '-6px',
                width: '10px',
                height: '10px',
                background: 'rgba(5, 8, 22, 0.85)',
                borderRight: '1px solid rgba(0, 255, 255, 0.2)',
                borderBottom: '1px solid rgba(0, 255, 255, 0.2)',
                transform: 'rotate(-45deg)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Orb Core */}
      <div style={{ position: 'relative' }}>
        <motion.div
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) {
              setBubbleText('Awaiting navigation coordinates.');
            } else {
              setBubbleText('');
            }
          }}
          className="interactive orb-core"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: 'easeInOut',
          }}
          style={{
            borderRadius: '50%',
            background: 'radial-gradient(circle, var(--primary-glow) 0%, rgba(123, 97, 255, 0.4) 60%, transparent 100%)',
            boxShadow: isOpen ? '0 0 30px var(--primary-glow)' : '0 0 20px rgba(0,255,255,0.3)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            border: '2px solid rgba(255,255,255,0.1)',
            zIndex: 2,
          }}
        >
          <FaCompass style={{ animation: isOpen ? 'rotateOrb 2s infinite linear' : 'none' }} />
        </motion.div>

        {/* Circular Coordinate Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="nav-menu"
              style={{
                position: 'absolute',
                right: 0,
                background: 'rgba(5, 8, 22, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--card-border)',
                borderRadius: '16px',
                padding: '15px',
                minWidth: '220px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                zIndex: 1,
              }}
            >
              <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '5px' }}>
                NAV COORDINATES
              </div>
              {navigationCoords.map((coord, i) => (
                <button
                  key={i}
                  onClick={() => handleNavigate(coord.id, coord.msg)}
                  className="interactive"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'rgba(255,255,255,0.7)',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-title)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)';
                    e.currentTarget.style.color = 'var(--primary-glow)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                  }}
                >
                  <span>{coord.label}</span>
                  <FaChevronRight style={{ fontSize: '0.7rem' }} />
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>
        {`
          .ai-orb-container {
            position: fixed;
            bottom: 30px;
            right: 45px;
            z-index: 99999;
            display: flex;
            flex-direction: row-reverse;
            align-items: flex-end;
            gap: 20px;
          }
          .orb-core {
            width: 60px;
            height: 60px;
            font-size: 1.4rem;
          }
          .nav-menu {
            bottom: 80px;
          }
          @keyframes rotateOrb {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @media (max-width: 768px) {
            .ai-orb-container {
              bottom: 20px;
              right: 15px;
              gap: 10px;
            }
            .orb-core {
              width: 50px;
              height: 50px;
              font-size: 1.2rem;
            }
            .speech-bubble {
              max-width: 170px !important;
              font-size: 0.7rem !important;
              padding: 10px 14px !important;
            }
            .nav-menu {
              bottom: 70px !important;
              min-width: 190px !important;
              padding: 12px !important;
            }
            .nav-menu button {
              font-size: 0.75rem !important;
              padding: 6px 8px !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default AIOrb;
