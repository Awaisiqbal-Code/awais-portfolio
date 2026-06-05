import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const CinematicIntro = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const loadingLines = [
    'Initializing Developer Profile...',
    'Loading Neural Network...',
    'Loading Skills Database...',
    'Access Granted...',
    'AWAIS IQBAL DETECTED'
  ];

  useEffect(() => {
    // Increment progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    // Sequence through text lines
    const textIntervals = [
      setTimeout(() => setStep(1), 800),
      setTimeout(() => setStep(2), 1600),
      setTimeout(() => setStep(3), 2400),
      setTimeout(() => setStep(4), 3200),
      setTimeout(() => {
        setProgress(100);
        setTimeout(onComplete, 1000);
      }, 4200)
    ];

    return () => {
      clearInterval(progressInterval);
      textIntervals.forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#050816',
        zIndex: 999999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-title)',
        color: '#ffffff',
        padding: '20px',
      }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      {/* Grid Pattern Background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'radial-gradient(circle, rgba(0, 255, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '600px', width: '100%', position: 'relative', zIndex: 1 }}>
        {/* Terminal Header */}
        <div
          style={{
            borderBottom: '1px solid rgba(0, 255, 255, 0.2)',
            paddingBottom: '15px',
            marginBottom: '30px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
          </div>
          <span style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.8rem', letterSpacing: '1px' }}>
            TERMINAL_SECURE_AUTH
          </span>
        </div>

        {/* Loading Outputs */}
        <div
          style={{
            minHeight: '200px',
            fontFamily: 'var(--font-title)',
            fontSize: '1rem',
            lineHeight: '2rem',
            color: 'var(--text-primary)',
          }}
        >
          {loadingLines.map((line, index) => {
            if (index > step) return null;
            const isLast = index === loadingLines.length - 1;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  color: isLast ? 'var(--primary-glow)' : 'var(--text-primary)',
                  fontWeight: isLast ? 'bold' : 'normal',
                  textShadow: isLast ? '0 0 10px rgba(0,255,255,0.5)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span style={{ color: 'var(--secondary-glow)' }}>&gt;</span>
                {line}
                {index === step && step < loadingLines.length - 1 && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6 }}
                    style={{ display: 'inline-block', width: '8px', height: '15px', backgroundColor: 'var(--primary-glow)' }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Progress Bar Container */}
        <div style={{ marginTop: '50px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: '10px' }}>
            <span>PROGRESS: {progress}%</span>
            <span>SYSTEM READY</span>
          </div>
          <div
            style={{
              width: '100%',
              height: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '3px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <motion.div
              style={{
                height: '100%',
                backgroundColor: 'var(--primary-glow)',
                boxShadow: '0 0 10px var(--primary-glow)',
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        {/* Skip button */}
        <button
          onClick={onComplete}
          style={{
            marginTop: '30px',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.5)',
            padding: '8px 16px',
            borderRadius: '4px',
            fontSize: '0.8rem',
            cursor: 'pointer',
            fontFamily: 'var(--font-title)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = 'var(--primary-glow)';
            e.target.style.color = '#fff';
            e.target.style.boxShadow = '0 0 10px rgba(0,255,255,0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = 'rgba(255,255,255,0.15)';
            e.target.style.color = 'rgba(255,255,255,0.5)';
            e.target.style.boxShadow = 'none';
          }}
        >
          SKIP SEQUENCE
        </button>
      </div>
    </motion.div>
  );
};

export default CinematicIntro;
