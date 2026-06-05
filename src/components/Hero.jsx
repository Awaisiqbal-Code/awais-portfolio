import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { FaLinkedin, FaGithub, FaVolumeUp, FaVolumeMute, FaChevronDown } from 'react-icons/fa';

/* ───────────────────────────── helpers ───────────────────────────── */

// Seeded random so particle positions are stable across renders
const seededRandom = (seed) => {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
};

const generateParticles = (count) => {
  const rng = seededRandom(42);
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: 2 + rng() * 4,                       // 2–6 px
    x: rng() * 100,                             // % left
    y: rng() * 100,                             // % top
    duration: 12 + rng() * 20,                  // drift speed (s)
    delay: rng() * 8,                           // stagger start
    color: rng() > 0.5
      ? 'rgba(0, 255, 255, VAR_ALPHA)'         // cyan
      : 'rgba(123, 97, 255, VAR_ALPHA)',        // purple
    alpha: 0.3 + rng() * 0.5,                  // individual brightness
    driftX: -30 + rng() * 60,                  // px drift range X
    driftY: -30 + rng() * 60,                  // px drift range Y
  }));
};

/* ─────────────────────────── component ─────────────────────────── */

const Hero = ({ onExplore, isMuted, toggleSound }) => {
  const [typedText, setTypedText] = useState('');
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const taglines = [
    'Building Digital Experiences...',
    'Creating Modern Solutions...',
    'Transforming Ideas Into Reality...',
    'Junior Full-Stack Developer...'
  ];

  // Memoised particles so they don't regenerate on every render
  const particles = useMemo(() => generateParticles(18), []);

  // Typing Effect
  useEffect(() => {
    const currentTagline = taglines[taglineIndex];
    let typingSpeed = isDeleting ? 30 : 60;

    if (!isDeleting && typedText === currentTagline) {
      typingSpeed = 2000; // Hold full tagline
      setIsDeleting(true);
    } else if (isDeleting && typedText === '') {
      setIsDeleting(false);
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
      typingSpeed = 500;
    }

    const timer = setTimeout(() => {
      setTypedText((prev) => {
        if (isDeleting) {
          return currentTagline.substring(0, prev.length - 1);
        } else {
          return currentTagline.substring(0, prev.length + 1);
        }
      });
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [typedText, taglineIndex, isDeleting]);

  return (
    <section 
      id="hero" 
      className="hero-section"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        height: '100vh',
        width: '100%',
        padding: '0 20px',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >

      {/* ═══════════════  BACKGROUND LAYER  ═══════════════ */}

      {/* Original radial-gradient background element (preserved) */}
      <div 
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(123, 97, 255, 0.08) 0%, transparent 60%)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Large animated gradient orb 1 — cyan ── */}
      <motion.div
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '15%',
          left: '20%',
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 255, 255, 0.12) 0%, rgba(0, 255, 255, 0.03) 40%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Large animated gradient orb 2 — purple ── */}
      <motion.div
        animate={{
          x: [0, -50, 40, 0],
          y: [0, 40, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '15%',
          width: '480px',
          height: '480px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(123, 97, 255, 0.14) 0%, rgba(123, 97, 255, 0.04) 40%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Large animated gradient orb 3 — mixed cyan-purple ── */}
      <motion.div
        animate={{
          x: [0, 35, -25, 0],
          y: [0, -25, 45, 0],
          scale: [1, 1.08, 0.92, 1],
          opacity: [0.6, 0.9, 0.5, 0.6],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '55%',
          width: '360px',
          height: '360px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 255, 255, 0.08) 0%, rgba(123, 97, 255, 0.08) 50%, transparent 70%)',
          filter: 'blur(55px)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Floating particles ── */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          animate={{
            x: [0, p.driftX, -p.driftX * 0.6, 0],
            y: [0, p.driftY, -p.driftY * 0.7, 0],
            opacity: [p.alpha, p.alpha * 1.6, p.alpha * 0.6, p.alpha],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            background: p.color.replace('VAR_ALPHA', String(p.alpha)),
            boxShadow: `0 0 ${p.size * 2}px ${p.color.replace('VAR_ALPHA', String(p.alpha * 0.8))}`,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* ═══════════════  STATUS BADGE  ═══════════════ */}

      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        style={{
          position: 'absolute',
          top: '28px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          borderRadius: '20px',
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          zIndex: 20,
          pointerEvents: 'none',
        }}
      >
        {/* pulsing green dot */}
        <motion.span
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#22c55e',
            boxShadow: '0 0 8px rgba(34, 197, 94, 0.7)',
            display: 'inline-block',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.7rem',
            letterSpacing: '1.5px',
            color: 'rgba(255, 255, 255, 0.7)',
            textTransform: 'uppercase',
          }}
        >
          Available for hire
        </span>
      </motion.div>

      {/* ═══════════════  SOCIAL LINK BADGES  ═══════════════ */}

      {/* Left side — LinkedIn */}
      <motion.a
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1 }}
        whileHover={{ scale: 1.12, boxShadow: '0 0 25px rgba(0, 255, 255, 0.5)' }}
        style={{
          position: 'absolute',
          left: '30px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '48px',
          height: '48px',
          borderRadius: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          color: '#fff',
          fontSize: '1.25rem',
          cursor: 'pointer',
          textDecoration: 'none',
          zIndex: 20,
          transition: 'var(--transition-smooth)',
          boxShadow: '0 0 12px rgba(0, 255, 255, 0.1)',
        }}
      >
        <FaLinkedin />
      </motion.a>

      {/* Right side — GitHub */}
      <motion.a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1.15 }}
        whileHover={{ scale: 1.12, boxShadow: '0 0 25px rgba(123, 97, 255, 0.5)' }}
        style={{
          position: 'absolute',
          right: '30px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '48px',
          height: '48px',
          borderRadius: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          color: '#fff',
          fontSize: '1.25rem',
          cursor: 'pointer',
          textDecoration: 'none',
          zIndex: 20,
          transition: 'var(--transition-smooth)',
          boxShadow: '0 0 12px rgba(123, 97, 255, 0.1)',
        }}
      >
        <FaGithub />
      </motion.a>

      {/* ═══════════════  MAIN CONTENT  ═══════════════ */}

      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* ── Animated rotating decorative ring ── */}
        <div style={{
          position: 'absolute',
          width: 'clamp(320px, 55vw, 550px)',
          height: 'clamp(320px, 55vw, 550px)',
          borderRadius: '50%',
          border: '1px solid rgba(0, 255, 255, 0.06)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          animation: 'heroRingSpin 40s linear infinite',
        }} />
        <div style={{
          position: 'absolute',
          width: 'clamp(380px, 65vw, 650px)',
          height: 'clamp(380px, 65vw, 650px)',
          borderRadius: '50%',
          border: '1px dashed rgba(123, 97, 255, 0.08)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          animation: 'heroRingSpin 55s linear infinite reverse',
        }} />

        {/* Glowing Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{
            fontFamily: 'var(--font-title)',
            fontSize: '1.8rem',
            fontWeight: 900,
            letterSpacing: '5px',
            color: '#fff',
            textShadow: '0 0 10px rgba(0,255,255,0.4)',
            marginBottom: '30px',
          }}
        >
          AI<span style={{ color: 'var(--primary-glow)' }}>.</span>
        </motion.div>

        {/* Live typing subtitle */}
        <div
          style={{
            minHeight: '25px',
            fontFamily: 'var(--font-title)',
            color: 'var(--primary-glow)',
            fontSize: '1rem',
            letterSpacing: '2px',
            marginBottom: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textTransform: 'uppercase',
            textShadow: '0 0 8px rgba(0,255,255,0.3)',
          }}
        >
          {typedText}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.6 }}
            style={{ display: 'inline-block', width: '2px', height: '18px', backgroundColor: 'var(--primary-glow)', marginLeft: '4px' }}
          />
        </div>

        {/* ── Glowing horizontal divider ── */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.3 }}
          style={{
            width: '280px',
            height: '1px',
            marginBottom: '18px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(0, 255, 255, 0.7) 50%, transparent 100%)',
            boxShadow: '0 0 8px rgba(0, 255, 255, 0.3)',
          }}
        />

        {/* Hero Title — animated gradient text */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, cubicBezier: [0.16, 1, 0.3, 1] }}
          className="glitch"
          data-text="AWAIS IQBAL"
          style={{
            fontFamily: 'var(--font-title)',
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 900,
            letterSpacing: '8px',
            margin: '0 0 10px 0',
            background: 'linear-gradient(135deg, #ffffff 0%, #00ffff 40%, #7b61ff 70%, #ffffff 100%)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'heroGradientShift 6s ease infinite',
            filter: 'drop-shadow(0 0 25px rgba(0, 255, 255, 0.15))',
          }}
        >
          AWAIS IQBAL
        </motion.h1>

        {/* ── Role badge row ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '20px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {['Full-Stack Developer', 'UI/UX Designer', 'SEO Specialist'].map((role, i) => (
            <span
              key={i}
              style={{
                padding: '5px 14px',
                borderRadius: '20px',
                fontSize: '0.7rem',
                fontFamily: 'var(--font-title)',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                border: `1px solid ${i === 0 ? 'rgba(0, 255, 255, 0.25)' : i === 1 ? 'rgba(123, 97, 255, 0.25)' : 'rgba(255, 215, 0, 0.25)'}`,
                color: i === 0 ? 'var(--primary-glow)' : i === 1 ? 'var(--secondary-glow)' : 'var(--accent-gold)',
                background: `${i === 0 ? 'rgba(0, 255, 255, 0.04)' : i === 1 ? 'rgba(123, 97, 255, 0.04)' : 'rgba(255, 215, 0, 0.04)'}`,
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
            >
              {role}
            </span>
          ))}
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--text-secondary)',
            fontSize: 'clamp(0.9rem, 2.2vw, 1.15rem)',
            maxWidth: '580px',
            lineHeight: '1.7',
            marginBottom: '30px',
            letterSpacing: '0.5px',
          }}
        >
          An interactive, immersive digital museum showcasing specialized growth in full-stack engineering, interactive UI designs, and digital marketing.
        </motion.p>

        {/* ── Mini stats row ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55 }}
          style={{
            display: 'flex',
            gap: '30px',
            marginBottom: '35px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {[
            { val: '12+', label: 'Projects' },
            { val: '10+', label: 'Certificates' },
            { val: '15+', label: 'Technologies' },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'var(--font-title)',
                fontSize: '1.4rem',
                fontWeight: 'bold',
                color: 'var(--primary-glow)',
                textShadow: '0 0 12px rgba(0, 255, 255, 0.3)',
                lineHeight: '1',
              }}>
                {stat.val}
              </div>
              <div style={{
                fontSize: '0.6rem',
                color: 'rgba(255,255,255,0.4)',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                marginTop: '4px',
                fontFamily: 'var(--font-title)',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Explore Button with pulse ring */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          style={{ position: 'relative', display: 'inline-block' }}
        >
          {/* Pulse ring behind button */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            height: '100%',
            borderRadius: '30px',
            border: '1px solid rgba(0, 255, 255, 0.2)',
            animation: 'heroBtnPulse 2.5s ease-in-out infinite',
            pointerEvents: 'none',
          }} />
          <button
            onClick={onExplore}
            className="interactive"
            style={{
              background: 'linear-gradient(90deg, var(--secondary-glow), var(--primary-glow))',
              border: 'none',
              color: '#ffffff',
              padding: '16px 42px',
              borderRadius: '30px',
              fontFamily: 'var(--font-title)',
              fontSize: '0.95rem',
              fontWeight: 'bold',
              letterSpacing: '2px',
              cursor: 'pointer',
              boxShadow: '0 0 30px rgba(123, 97, 255, 0.4), inset 0 0 30px rgba(0, 255, 255, 0.05)',
              transition: 'var(--transition-smooth)',
              position: 'relative',
              zIndex: 2,
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 0 45px rgba(0, 255, 255, 0.6), inset 0 0 30px rgba(0, 255, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 0 30px rgba(123, 97, 255, 0.4), inset 0 0 30px rgba(0, 255, 255, 0.05)';
            }}
          >
            EXPLORE MY MIND
          </button>
        </motion.div>

        {/* ── Floating tech stack icons row ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          style={{
            display: 'flex',
            gap: '18px',
            marginTop: '45px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {['React', 'PHP', 'Python', 'Three.js', 'GSAP', 'SEO'].map((tech, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.65rem',
                fontFamily: 'var(--font-title)',
                letterSpacing: '1px',
                color: 'rgba(255, 255, 255, 0.35)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                background: 'rgba(255, 255, 255, 0.02)',
              }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* ── Hero-specific keyframes ── */}
      <style>
        {`
          @keyframes heroGradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes heroRingSpin {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
          }
          @keyframes heroBtnPulse {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
            50% { transform: translate(-50%, -50%) scale(1.25); opacity: 0; }
            100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
          }
        `}
      </style>

      {/* ═══════════════  SCROLL INDICATOR  ═══════════════ */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          zIndex: 20,
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.6rem',
            letterSpacing: '2px',
            color: 'rgba(255, 255, 255, 0.35)',
            textTransform: 'uppercase',
          }}
        >
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            color: 'rgba(0, 255, 255, 0.5)',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FaChevronDown />
        </motion.div>
      </motion.div>

      {/* ═══════════════  CONTROLS (Bottom Right) — preserved  ═══════════════ */}

      <div
        style={{
          position: 'absolute',
          bottom: '30px',
          right: '40px',
          display: 'flex',
          gap: '20px',
          zIndex: 100,
        }}
      >
        {/* Sound Toggle */}
        <button
          onClick={toggleSound}
          className="interactive"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            width: '45px',
            height: '45px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '1.2rem',
            transition: 'var(--transition-fast)',
          }}
          onMouseEnter={(e) => e.target.style.borderColor = 'var(--primary-glow)'}
          onMouseLeave={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
        >
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
      </div>
    </section>
  );
};

export default Hero;
