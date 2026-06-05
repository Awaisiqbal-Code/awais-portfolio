import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FaLinkedin, FaGithub, FaFacebook, FaEnvelope,
  FaVolumeUp, FaVolumeMute, FaArrowRight, FaCommentAlt
} from 'react-icons/fa';
import heroBg from '../assets/hero-bg.png';
import holographicAvatar from '../assets/holographic-avatar.png';

/* ── Seeded RNG & particles ── */
const rng = (seed) => { let s = seed; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; };
const mkParticles = (n, seed) => {
  const r = rng(seed);
  return Array.from({ length: n }, (_, i) => ({
    id: i, x: r() * 100, y: r() * 100,
    size: 1.5 + r() * 3.5, dur: 12 + r() * 18, delay: r() * 15,
    cyan: r() > 0.45, alpha: 0.25 + r() * 0.65,
    dx: -60 + r() * 120, dy: -60 + r() * 120,
  }));
};

/* ── Tech Chip ── */
const TechChip = ({ icon, label, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5, type: 'spring', stiffness: 100 }}
    whileHover={{ scale: 1.08, y: -3 }}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      padding: '6px 12px',
      borderRadius: '8px',
      background: 'rgba(5, 8, 22, 0.45)',
      border: '1px solid rgba(0, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      cursor: 'default',
      transition: 'border-color 0.3s, box-shadow 0.3s',
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,255,255,0.4)'; e.currentTarget.style.boxShadow = '0 0 10px rgba(0,255,255,0.2)'; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0, 255, 255, 0.1)'; e.currentTarget.style.boxShadow = 'none'; }}
  >
    <span style={{ fontSize: '0.9rem', color }}>{icon}</span>
    <span style={{ fontFamily: 'var(--font-title)', fontSize: '0.52rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>{label}</span>
  </motion.div>
);

// HolographicFrame component removed as it is replaced by unified portal avatar

const Hero = ({ onExplore, isMuted, toggleSound }) => {
  const [typedText, setTypedText] = useState('');
  const [tagIdx, setTagIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [bootDone, setBootDone] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const isMobile = windowWidth < 1024;

  const taglines = [
    'Full Stack Developer',
    'UI/UX Designer',
    'SEO & Digital Marketing',
    'Building The Future',
  ];

  const particles = useMemo(() => mkParticles(30, 77), []);
  const stars = useMemo(() => mkParticles(50, 33), []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => { setTimeout(() => setBootDone(true), 400); }, []);

  useEffect(() => {
    const cur = taglines[tagIdx];
    let speed = deleting ? 22 : 50;
    if (!deleting && typedText === cur) { speed = 2200; setDeleting(true); }
    else if (deleting && typedText === '') { setDeleting(false); setTagIdx(p => (p + 1) % taglines.length); speed = 400; }
    const t = setTimeout(() => {
      setTypedText(p => deleting ? cur.slice(0, p.length - 1) : cur.slice(0, p.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [typedText, tagIdx, deleting]);

  const techStack = [
    { icon: '⚛', label: 'React', color: '#61DAFB', delay: 1.2 },
    { icon: '▲', label: 'Next.js', color: '#ffffff', delay: 1.28 },
    { icon: '🐘', label: 'PHP', color: '#777BB4', delay: 1.36 },
    { icon: '🐍', label: 'Python', color: '#3776AB', delay: 1.44 },
    { icon: '💨', label: 'Tailwind', color: '#38BDF8', delay: 1.52 },
    { icon: '🌀', label: 'GSAP', color: '#88CE02', delay: 1.6 },
    { icon: '📦', label: 'Three.js', color: '#ffffff', delay: 1.68 },
  ];

  const socialLinks = [
    { href: 'https://github.com/Awaisiqbal-Code', icon: <FaGithub />, color: '#fff', label: 'GitHub', delay: 0.5 },
    { href: 'https://linkedin.com/in/hafiz-awais-iqbal', icon: <FaLinkedin />, color: '#0077B5', label: 'LinkedIn', delay: 0.6 },
    { href: 'https://facebook.com', icon: <FaFacebook />, color: '#1877F2', label: 'Facebook', delay: 0.7 },
    { href: 'mailto:hafizawaisiqbal40@gmail.com', icon: <FaEnvelope />, color: '#EA4335', label: 'Email', delay: 0.8 },
  ];

  const nameFontSize = isMobile ? 'clamp(2.4rem, 10vw, 4.2rem)' : 'clamp(3.8rem, 5.5vw, 6.5rem)';

  return (
    <section id="hero" style={{
      position: 'relative',
      width: '100%',
      height: isMobile ? 'auto' : '100vh',
      minHeight: '100vh',
      overflow: isMobile ? 'visible' : 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: isMobile ? 'center' : 'flex-start',
      background: '#02010a',
      paddingLeft: isMobile ? '5%' : '10%',
      paddingRight: isMobile ? '5%' : '8%',
      paddingTop: isMobile ? '110px' : '40px',
      paddingBottom: isMobile ? '70px' : '0px',
    }}>
      {/* ── KEYFRAMES ── */}
      <style>{`
        @keyframes badgePulse   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(1.2)} }
        @keyframes starTwinkle  { 0%,100%{opacity:.15} 50%{opacity:0.95} }
        @keyframes fogDrift     { 0%,100%{transform:translateX(-4%) scale(1)} 50%{transform:translateX(4%) scale(1.02)} }
        @keyframes portalSpin   { to{transform:rotate(360deg)} }
        @keyframes portalPulse  { 0%,100%{opacity:.45;transform:scale(1)} 50%{opacity:0.9;transform:scale(1.04)} }
        @keyframes waveOut      { 0%{transform:scale(.7);opacity:.8} 100%{transform:scale(2.2);opacity:0} }
        @keyframes nameGlow     { 0%,100%{filter:drop-shadow(0 0 25px rgba(0,255,255,.3)) drop-shadow(0 0 60px rgba(123,97,255,.15))} 50%{filter:drop-shadow(0 0 45px rgba(0,255,255,.6)) drop-shadow(0 0 90px rgba(123,97,255,.35))} }
        @keyframes lightSweep   { 0%{background-position:-150% center} 100%{background-position:250% center} }
        @keyframes subtitleGlow { 0%,100%{text-shadow:0 0 8px rgba(0,255,255,.3)} 50%{text-shadow:0 0 16px rgba(0,255,255,.7),0 0 32px rgba(0,255,255,.3)} }
        @keyframes gridMove     { from{background-position:0 0} to{background-position:50px 50px} }
        @keyframes cursor       { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes scanSlide    { 0%{top:-10%} 100%{top:110%} }
      `}</style>

      {/* ── BACKGROUND IMAGE ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: isMobile ? 'left 22% center' : 'right 20% center',
        opacity: isMobile ? 0.22 : 0.55,
        filter: isMobile ? 'blur(2px) brightness(0.45)' : 'none',
      }} />

      {/* ── OVERLAY DARK VIGNETTE ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        background: isMobile 
          ? 'radial-gradient(circle at center, rgba(3,1,15,0.4) 0%, rgba(3,1,15,0.85) 60%, rgba(3,1,15,0.98) 100%)'
          : 'linear-gradient(90deg, rgba(2,1,10,0.95) 0%, rgba(2,1,10,0.85) 40%, rgba(2,1,10,0.4) 70%, rgba(2,1,10,0.9) 100%)',
      }} />

      {/* ── ANIMATED GRID ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(0,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.015) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        animation: 'gridMove 12s linear infinite',
      }} />

      {/* ── STARS ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
        {stars.map(p => (
          <div key={p.id} style={{
            position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
            width: `${p.size * 0.4}px`, height: `${p.size * 0.4}px`,
            borderRadius: '50%', background: '#fff', opacity: p.alpha * 0.4,
            animation: `starTwinkle ${p.dur * 0.6}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }} />
        ))}
      </div>

      {/* ── FLOATING PARTICLES ── */}
      {particles.map(p => (
        <motion.div key={p.id}
          animate={{ x: [0, p.dx, -p.dx * 0.5, 0], y: [0, p.dy, -p.dy * 0.6, 0], opacity: [p.alpha, p.alpha * 1.8, p.alpha * 0.2, p.alpha] }}
          transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
          style={{
            position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
            width: `${p.size}px`, height: `${p.size}px`,
            borderRadius: '50%', pointerEvents: 'none', zIndex: 2,
            background: p.cyan ? `rgba(0,255,255,${p.alpha})` : `rgba(123,97,255,${p.alpha})`,
            boxShadow: p.cyan ? `0 0 ${p.size * 3}px rgba(0,255,255,${p.alpha * 0.4})` : `0 0 ${p.size * 3}px rgba(123,97,255,${p.alpha * 0.4})`,
          }}
        />
      ))}

      {/* ── ENERGY FOG ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: '-10%', right: '-10%', height: '35%',
        background: 'linear-gradient(to top, rgba(2,1,10,0.95) 0%, rgba(0,40,80,0.08) 50%, transparent 100%)',
        animation: 'fogDrift 20s ease-in-out infinite', pointerEvents: 'none', zIndex: 3,
      }} />

      {/* ── VERTICAL SOCIALS (LEFT) ── */}
      {!isMobile && (
        <div style={{
          position: 'absolute',
          left: '40px',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          zIndex: 30,
        }}>
          <div style={{ width: '1px', height: '80px', background: 'linear-gradient(to bottom, transparent, rgba(0,255,255,0.4))' }} />
          {socialLinks.map((s, i) => (
            <motion.a key={i} href={s.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: s.delay, duration: 0.5 }}
              whileHover={{ scale: 1.25, x: 5 }}
              onClick={e => { e.preventDefault(); if (s.href.startsWith('mailto:')) window.location.href = s.href; else window.open(s.href, '_blank'); }}
              title={s.label}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(5, 8, 22, 0.45)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(10px)',
                color: s.color,
                fontSize: '1rem',
                textDecoration: 'none',
                boxShadow: `0 0 10px ${s.color}15`,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = s.color; e.currentTarget.style.boxShadow = `0 0 15px ${s.color}40`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = `0 0 10px ${s.color}15`; }}
            >
              {s.icon}
            </motion.a>
          ))}
          <div style={{ width: '1px', height: '80px', background: 'linear-gradient(to top, transparent, rgba(0,255,255,0.4))' }} />
        </div>
      )}

      {/* ── HOLOGRAPHIC PORTAL OVERLAY (RIGHT) ── */}
      {/* ── PORTAL + HOLOGRAPHIC AVATAR UNIFIED CONTAINER (DESKTOP) ── */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1, type: 'spring', stiffness: 70 }}
          style={{
            position: 'absolute',
            top: '50%',
            right: '6%',
            transform: 'translateY(-52%)',
            width: '420px',
            height: '420px',
            zIndex: 8,
          }}
        >
          {/* Energy pulse waves */}
          {[0, 1.3, 2.6].map((d, i) => (
            <div key={i} style={{
              position: 'absolute', inset: '5%', borderRadius: '50%',
              border: '1px solid rgba(0,255,255,0.18)',
              animation: 'waveOut 4s ease-out infinite', animationDelay: `${d}s`,
              pointerEvents: 'none',
            }} />
          ))}

          {/* Outer spinning ring */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%', border: '2.5px solid transparent',
            background: 'linear-gradient(#03010f,#03010f) padding-box, conic-gradient(from 0deg, #00ffff, #7b61ff, #ff00cc, #00d4ff, #7b61ff, #00ffff) border-box',
            animation: 'portalSpin 10s linear infinite',
            boxShadow: '0 0 50px rgba(0,255,255,0.4), 0 0 100px rgba(123,97,255,0.25), inset 0 0 40px rgba(0,255,255,0.1)',
            pointerEvents: 'none',
          }} />

          {/* Counter-spinning mid ring */}
          <div style={{
            position: 'absolute', inset: '22px', borderRadius: '50%',
            border: '1.5px solid transparent',
            background: 'linear-gradient(#03010f,#03010f) padding-box, conic-gradient(from 180deg, #7b61ff, #00ffff, #ff00cc, #7b61ff) border-box',
            animation: 'portalSpin 15s linear infinite reverse',
            pointerEvents: 'none',
          }} />

          {/* Subtle inner ring */}
          <div style={{
            position: 'absolute', inset: '44px', borderRadius: '50%',
            border: '1px solid rgba(123,97,255,0.35)',
            animation: 'portalSpin 24s linear infinite',
            pointerEvents: 'none',
          }} />

          {/* Core deep-space glow */}
          <div style={{
            position: 'absolute', inset: '75px', borderRadius: '50%',
            background: 'radial-gradient(circle at center, rgba(0,10,30,0.9) 0%, rgba(0,0,15,0.97) 100%)',
            boxShadow: '0 0 60px rgba(0,255,255,0.2), inset 0 0 60px rgba(123,97,255,0.2)',
            animation: 'portalPulse 3s ease-in-out infinite',
            pointerEvents: 'none',
          }} />

          {/* Rotating orbital dots */}
          {Array.from({ length: 8 }, (_, i) => (
            <motion.div key={i}
              animate={{ rotate: 360 }}
              transition={{ duration: 6 + i * 1.5, repeat: Infinity, ease: 'linear' }}
              style={{ position: 'absolute', inset: 0, borderRadius: '50%', pointerEvents: 'none' }}
            >
              <div style={{
                position: 'absolute', top: '50%',
                left: `${48 + 47 * Math.cos((i / 8) * Math.PI * 2)}%`,
                width: '4px', height: '4px', borderRadius: '50%',
                background: i % 2 === 0 ? 'rgba(0,255,255,0.9)' : 'rgba(123,97,255,0.9)',
                boxShadow: i % 2 === 0 ? '0 0 8px rgba(0,255,255,0.9)' : '0 0 8px rgba(123,97,255,0.9)',
                transform: 'translate(-50%,-50%)',
              }} />
            </motion.div>
          ))}

          {/* ── HOLOGRAPHIC AVATAR IN PORTAL ── */}
          <div style={{
            position: 'absolute',
            inset: '-10%',
            zIndex: 10,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {/* Holographic scan line sweeping over avatar */}
            <div style={{
              position: 'absolute',
              top: '10%', left: '10%', right: '10%',
              height: '2.5px',
              background: 'linear-gradient(90deg, transparent, rgba(0,255,255,0.85), transparent)',
              boxShadow: '0 0 10px rgba(0,255,255,0.85)',
              animation: 'scanSlide 3.5s linear infinite',
              zIndex: 4,
            }} />

            <img
              src={holographicAvatar}
              alt="Awais Iqbal Holographic Avatar"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                mixBlendMode: 'screen',
                filter: 'brightness(1.15) contrast(1.1) drop-shadow(0 0 15px rgba(0,255,255,0.4))',
              }}
            />
          </div>
        </motion.div>
      )}

      {/* ── HERO CONTENT COLUMN (LEFT) ── */}
      <div style={{
        position: 'relative',
        zIndex: 15,
        display: 'flex',
        flexDirection: 'column',
        alignItems: isMobile ? 'center' : 'flex-start',
        justifyContent: 'center',
        width: isMobile ? '100%' : '58%',
        textAlign: isMobile ? 'center' : 'left',
      }}>
        {/* Status indicator badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '20px',
            background: 'rgba(34, 197, 94, 0.08)',
            border: '1px solid rgba(34, 197, 94, 0.35)',
            backdropFilter: 'blur(10px)',
            marginBottom: '20px',
            alignSelf: isMobile ? 'center' : 'flex-start',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#22c55e',
              boxShadow: '0 0 8px #22c55e',
              display: 'inline-block',
              animation: 'badgePulse 1.8s ease-in-out infinite',
            }}
          />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', letterSpacing: '1.5px', color: '#22c55e', textTransform: 'uppercase', fontWeight: 700 }}>
            Available for Hire
          </span>
        </motion.div>

        {/* ── PORTAL + HOLOGRAPHIC AVATAR UNIFIED CONTAINER (MOBILE) ── */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{
              position: 'relative',
              width: '280px',
              height: '280px',
              margin: '0 auto 25px auto',
              zIndex: 8,
            }}
          >
            {/* Energy pulse waves */}
            {[0, 1.5, 3.0].map((d, i) => (
              <div key={i} style={{
                position: 'absolute', inset: '5%', borderRadius: '50%',
                border: '1px solid rgba(0,255,255,0.15)',
                animation: 'waveOut 4s ease-out infinite', animationDelay: `${d}s`,
                pointerEvents: 'none',
              }} />
            ))}

            {/* Outer spinning ring */}
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid transparent',
              background: 'linear-gradient(#03010f,#03010f) padding-box, conic-gradient(from 0deg, #00ffff, #7b61ff, #ff00cc, #00d4ff, #7b61ff, #00ffff) border-box',
              animation: 'portalSpin 10s linear infinite',
              boxShadow: '0 0 35px rgba(0,255,255,0.35), 0 0 70px rgba(123,97,255,0.2), inset 0 0 30px rgba(0,255,255,0.1)',
              pointerEvents: 'none',
            }} />

            {/* Counter-spinning mid ring */}
            <div style={{
              position: 'absolute', inset: '14px', borderRadius: '50%',
              border: '1px solid transparent',
              background: 'linear-gradient(#03010f,#03010f) padding-box, conic-gradient(from 180deg, #7b61ff, #00ffff, #ff00cc, #7b61ff) border-box',
              animation: 'portalSpin 15s linear infinite reverse',
              pointerEvents: 'none',
            }} />

            {/* Subtle inner ring */}
            <div style={{
              position: 'absolute', inset: '28px', borderRadius: '50%',
              border: '1px solid rgba(123,97,255,0.25)',
              animation: 'portalSpin 24s linear infinite',
              pointerEvents: 'none',
            }} />

            {/* Core deep-space glow */}
            <div style={{
              position: 'absolute', inset: '50px', borderRadius: '50%',
              background: 'radial-gradient(circle at center, rgba(0,10,30,0.9) 0%, rgba(0,0,15,0.97) 100%)',
              boxShadow: '0 0 40px rgba(0,255,255,0.2), inset 0 0 40px rgba(123,97,255,0.2)',
              animation: 'portalPulse 3s ease-in-out infinite',
              pointerEvents: 'none',
            }} />

            {/* HOLOGRAPHIC AVATAR IN PORTAL */}
            <div style={{
              position: 'absolute',
              inset: '-10%',
              zIndex: 10,
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {/* Scan line */}
              <div style={{
                position: 'absolute',
                top: '10%', left: '10%', right: '10%',
                height: '2.5px',
                background: 'linear-gradient(90deg, transparent, rgba(0,255,255,0.85), transparent)',
                boxShadow: '0 0 10px rgba(0,255,255,0.85)',
                animation: 'scanSlide 3.5s linear infinite',
                zIndex: 4,
              }} />

              <img
                src={holographicAvatar}
                alt="Awais Iqbal Holographic Avatar"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  mixBlendMode: 'screen',
                  filter: 'brightness(1.15) contrast(1.1) drop-shadow(0 0 15px rgba(0,255,255,0.4))',
                }}
              />
            </div>
          </motion.div>
        )}

        {/* Tagline Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: bootDone ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-title)',
            fontSize: isMobile ? '0.65rem' : '0.8rem',
            letterSpacing: '4px',
            color: 'var(--primary-glow)',
            marginBottom: '12px',
            minHeight: '20px',
            animation: 'subtitleGlow 3s ease-in-out infinite',
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          {'// '}{typedText}
          <span style={{ display: 'inline-block', width: '2px', height: '12px', background: 'rgba(0,255,255,1)', marginLeft: '2px', animation: 'cursor 0.8s step-end infinite' }} />
        </motion.div>

        {/* Giant Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, type: 'spring', stiffness: 70 }}
          style={{
            fontFamily: 'var(--font-title)',
            fontWeight: 900,
            fontSize: nameFontSize,
            letterSpacing: isMobile ? '3px' : '6px',
            lineHeight: 1.05,
            margin: 0,
            background: 'linear-gradient(135deg, #ffffff 0%, #00ffff 25%, #a855f7 55%, #ff00cc 75%, #ffffff 100%)',
            backgroundSize: '300% 100%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'nameGlow 4s ease-in-out infinite, lightSweep 6s linear infinite',
            whiteSpace: 'nowrap',
          }}
        >
          AWAIS IQBAL
        </motion.h1>

        {/* Glowing Gradient Divider Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
          style={{
            width: isMobile ? '80%' : '100%',
            height: '1.5px',
            marginTop: '18px',
            marginBottom: '18px',
            background: 'linear-gradient(90deg, var(--primary-glow), var(--secondary-glow) 50%, transparent)',
            boxShadow: '0 0 10px rgba(0,255,255,0.4)',
            originX: 0,
          }}
        />

        {/* Role Badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            justifyContent: isMobile ? 'center' : 'flex-start',
            marginBottom: '22px',
          }}
        >
          {[
            { label: '</> Full-Stack Dev', c: 'rgba(0,255,255,.95)', b: 'rgba(0,255,255,.2)', bg: 'rgba(0,255,255,.05)' },
            { label: '✦ UI/UX Design', c: 'rgba(168,85,247,.95)', b: 'rgba(123,97,255,.2)', bg: 'rgba(123,97,255,.05)' },
            { label: '↗ SEO Expert', c: 'rgba(255,215,0,.95)', b: 'rgba(255,215,0,.2)', bg: 'rgba(255,215,0,.05)' },
          ].map((badge, i) => (
            <motion.span key={i} whileHover={{ scale: 1.06, y: -2 }}
              style={{
                padding: '4px 12px',
                borderRadius: '16px',
                fontSize: '0.6rem',
                fontFamily: 'var(--font-title)',
                letterSpacing: '1px',
                border: `1px solid ${badge.b}`,
                color: badge.c,
                background: badge.bg,
                backdropFilter: 'blur(8px)',
                boxShadow: `0 0 12px ${badge.b}`,
                cursor: 'default',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >{badge.label}</motion.span>
          ))}
        </motion.div>

        {/* Bio Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          style={{
            fontFamily: 'var(--font-body)',
            color: 'rgba(255,255,255,0.55)',
            fontSize: isMobile ? '0.8rem' : '0.92rem',
            maxWidth: '520px',
            lineHeight: 1.75,
            marginBottom: '28px',
          }}
        >
          Architecting high-performance digital matrices. From securing local network topologies to developing highly responsive full-stack applications with beautiful UI aesthetics.
        </motion.p>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          style={{
            display: 'flex',
            gap: isMobile ? '25px' : '40px',
            justifyContent: isMobile ? 'center' : 'flex-start',
            marginBottom: '32px',
            width: '100%',
          }}
        >
          {[
            { num: '12+', text: 'Projects Completed' },
            { num: '10+', text: 'Cisco Certificates' },
            { num: '15+', text: 'Modern Tech Stack' },
          ].map((stat, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'center' : 'flex-start' }}>
              <span style={{
                fontSize: '1.6rem',
                fontWeight: 800,
                color: 'var(--primary-glow)',
                fontFamily: 'var(--font-title)',
                textShadow: '0 0 10px rgba(0, 255, 255, 0.4)',
              }}>
                {stat.num}
              </span>
              <span style={{
                fontSize: '0.62rem',
                color: 'rgba(255,255,255,0.4)',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                marginTop: '3px',
                fontWeight: 500,
              }}>
                {stat.text}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, type: 'spring', stiffness: 150 }}
          style={{
            display: 'flex',
            gap: '15px',
            flexDirection: 'row',
            width: isMobile ? '100%' : 'auto',
            justifyContent: isMobile ? 'center' : 'flex-start',
            marginBottom: '35px',
          }}
        >
          {/* Primary button */}
          <button
            onClick={onExplore}
            style={{
              background: 'linear-gradient(90deg, rgba(123,97,255,0.9) 0%, rgba(0,255,255,0.9) 100%)',
              border: '1px solid rgba(0,255,255,0.5)',
              color: '#fff',
              padding: '12px 30px',
              borderRadius: '24px',
              fontFamily: 'var(--font-title)',
              fontSize: '0.78rem',
              fontWeight: 'bold',
              letterSpacing: '2px',
              cursor: 'pointer',
              boxShadow: '0 0 30px rgba(0,255,255,0.3), 0 0 60px rgba(123,97,255,0.15)',
              transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(0,255,255,0.55), 0 0 80px rgba(123,97,255,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(0,255,255,0.3), 0 0 60px rgba(123,97,255,0.15)'; }}
          >
            EXPLORE MY MIND <FaArrowRight style={{ fontSize: '0.7rem' }} />
          </button>

          {/* Secondary Outline button */}
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: 'rgba(5, 8, 22, 0.35)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff',
              padding: '12px 28px',
              borderRadius: '24px',
              fontFamily: 'var(--font-title)',
              fontSize: '0.78rem',
              fontWeight: 'bold',
              letterSpacing: '2px',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.borderColor = 'rgba(0,255,255,0.5)'; e.currentTarget.style.boxShadow = '0 0 15px rgba(0,255,255,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            CONTACT <FaCommentAlt style={{ fontSize: '0.65rem', opacity: 0.7 }} />
          </button>
        </motion.div>

        {/* Tech Stack Chips */}
        <div style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          justifyContent: isMobile ? 'center' : 'flex-start',
          maxWidth: '540px',
        }}>
          {techStack.map((tech, i) => (
            <TechChip key={i} {...tech} />
          ))}
        </div>

        {/* Mobile Social Links in flow */}
        {isMobile && (
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '14px',
            marginTop: '30px',
            justifyContent: 'center',
            width: '100%',
          }}>
            {socialLinks.map((s, i) => (
              <a key={i} href={s.href}
                onClick={e => { e.preventDefault(); if (s.href.startsWith('mailto:')) window.location.href = s.href; else window.open(s.href, '_blank'); }}
                title={s.label}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(5, 8, 22, 0.5)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: s.color,
                  fontSize: '1rem',
                  boxShadow: `0 0 10px ${s.color}15`,
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        )}

        {/* Mobile Sound Control in flow */}
        {isMobile && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '25px',
            width: '100%',
          }}>
            <button onClick={toggleSound}
              style={{
                background: 'rgba(5, 8, 22, 0.45)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '0.95rem',
                backdropFilter: 'blur(10px)',
              }}
            >
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
          </div>
        )}
      </div>

      {/* ── SOUND CONTROL (DESKTOP) ── */}
      {!isMobile && (
        <div style={{ position: 'absolute', bottom: '30px', right: '30px', zIndex: 30 }}>
          <button onClick={toggleSound}
            style={{
              background: 'rgba(5, 8, 22, 0.45)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '0.95rem',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,255,255,0.6)'; e.currentTarget.style.boxShadow = '0 0 12px rgba(0,255,255,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
        </div>
      )}

      {/* ── SCROLL DOWN INDICATOR (DESKTOP) ── */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 2.2 }}
          style={{
            position: 'absolute',
            bottom: '25px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            zIndex: 25,
            pointerEvents: 'none',
          }}
        >
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.52rem', letterSpacing: '2.5px', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>Scroll</span>
          <div style={{ width: '16px', height: '24px', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', display: 'flex', justifyContent: 'center' }}>
            <motion.div
              animate={{ y: [0, 6, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: '2px', height: '4px', background: 'var(--primary-glow)', borderRadius: '1.5px', marginTop: '4px' }}
            />
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Hero;
