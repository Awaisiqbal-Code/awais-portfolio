import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import {
  FaLinkedin, FaGithub, FaFacebook, FaEnvelope,
  FaVolumeUp, FaVolumeMute, FaArrowRight,
} from 'react-icons/fa';
import { SiCisco } from 'react-icons/si';
import heroBg from '../assets/hero-bg.png';

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

/* ── Cisco Badge ── */
const CiscoBadge = ({ icon, label, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.6, type: 'spring', stiffness: 120 }}
    whileHover={{ scale: 1.08, x: 6 }}
    style={{
      display: 'flex', alignItems: 'center', gap: '10px',
      padding: '10px 14px', borderRadius: '12px',
      background: 'rgba(0,10,40,0.7)',
      border: `1px solid ${color}40`,
      backdropFilter: 'blur(14px)',
      boxShadow: `0 0 18px ${color}30, inset 0 0 12px rgba(0,0,0,0.4)`,
      cursor: 'default', position: 'relative', overflow: 'hidden',
      transition: 'all 0.3s',
    }}
  >
    {/* Scan line */}
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
      background: `linear-gradient(90deg, transparent, ${color}cc, transparent)`,
      animation: 'scanSlide 3s linear infinite',
    }} />
    {/* Corner glow */}
    <div style={{ position: 'absolute', top: 0, left: 0, width: '8px', height: '8px', borderTop: `1px solid ${color}`, borderLeft: `1px solid ${color}` }} />
    <div style={{ position: 'absolute', bottom: 0, right: 0, width: '8px', height: '8px', borderBottom: `1px solid ${color}`, borderRight: `1px solid ${color}` }} />

    <span style={{ fontSize: '1.3rem', color }}>{icon}</span>
    <span style={{ fontFamily: 'var(--font-title)', fontSize: '0.58rem', color: 'rgba(255,255,255,0.85)', letterSpacing: '1px', textTransform: 'uppercase', lineHeight: 1.3 }}>{label}</span>
    <div style={{
      marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%',
      background: color, boxShadow: `0 0 8px ${color}`,
      animation: 'badgePulse 2s ease-in-out infinite',
    }} />
  </motion.div>
);

/* ── Tech Chip ── */
const TechChip = ({ icon, label, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.6, type: 'spring', stiffness: 120 }}
    whileHover={{ scale: 1.1, x: -4 }}
    style={{
      display: 'flex', alignItems: 'center', gap: '8px',
      padding: '8px 12px', borderRadius: '10px',
      background: 'rgba(0,10,40,0.65)',
      border: '1px solid rgba(0,255,255,0.12)',
      backdropFilter: 'blur(12px)',
      boxShadow: '0 0 12px rgba(0,255,255,0.08)',
      cursor: 'default', transition: 'all 0.3s',
    }}
  >
    <span style={{ fontSize: '1rem', color }}>{icon}</span>
    <span style={{ fontFamily: 'var(--font-title)', fontSize: '0.54rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '1px', textTransform: 'uppercase' }}>{label}</span>
  </motion.div>
);

/* ── Human Silhouette ── */
const HumanSilhouette = () => (
  <motion.div
    animate={{ y: [0, -12, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    style={{ position: 'absolute', bottom: '12%', left: '50%', transform: 'translateX(-50%)', zIndex: 8, pointerEvents: 'none' }}
  >
    <svg width="120" height="280" viewBox="0 0 120 280" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(0,255,255,0.9)" />
          <stop offset="50%" stopColor="rgba(123,97,255,0.7)" />
          <stop offset="100%" stopColor="rgba(0,255,255,0.2)" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      {/* Head */}
      <ellipse cx="60" cy="28" rx="22" ry="26" fill="url(#bodyGrad)" filter="url(#glow)" opacity="0.95"/>
      {/* Neck */}
      <rect x="52" y="50" width="16" height="18" rx="4" fill="url(#bodyGrad)" opacity="0.9"/>
      {/* Shoulders */}
      <path d="M10 90 Q20 65 52 68 L68 68 Q100 65 110 90 L110 140 Q85 145 60 144 Q35 145 10 140 Z" fill="url(#bodyGrad)" filter="url(#glow)" opacity="0.9"/>
      {/* Left arm */}
      <path d="M10 90 Q-8 115 5 158 Q10 165 18 160 Q22 135 20 110 L10 90Z" fill="url(#bodyGrad)" opacity="0.8"/>
      {/* Right arm */}
      <path d="M110 90 Q128 115 115 158 Q110 165 102 160 Q98 135 100 110 L110 90Z" fill="url(#bodyGrad)" opacity="0.8"/>
      {/* Torso */}
      <path d="M25 140 Q60 148 95 140 L98 200 Q60 208 22 200 Z" fill="url(#bodyGrad)" opacity="0.85"/>
      {/* Left leg */}
      <path d="M22 200 Q20 240 22 278 Q30 282 38 278 Q40 240 45 200 Z" fill="url(#bodyGrad)" opacity="0.8"/>
      {/* Right leg */}
      <path d="M98 200 Q100 240 98 278 Q90 282 82 278 Q80 240 75 200 Z" fill="url(#bodyGrad)" opacity="0.8"/>
      {/* Chest circuit lines */}
      <line x1="45" y1="100" x2="75" y2="100" stroke="rgba(0,255,255,0.6)" strokeWidth="1" strokeDasharray="4 3"/>
      <line x1="50" y1="115" x2="70" y2="115" stroke="rgba(0,255,255,0.4)" strokeWidth="1" strokeDasharray="3 4"/>
      <circle cx="60" cy="100" r="4" fill="rgba(0,255,255,0.9)" filter="url(#glow)"/>
    </svg>
    {/* Ground glow */}
    <div style={{
      position: 'absolute', bottom: '-20px', left: '50%', transform: 'translateX(-50%)',
      width: '160px', height: '30px', borderRadius: '50%',
      background: 'radial-gradient(ellipse, rgba(0,255,255,0.4) 0%, transparent 70%)',
      filter: 'blur(8px)',
    }} />
  </motion.div>
);

/* ══════════════ MAIN HERO ══════════════ */
const Hero = ({ onExplore, isMuted, toggleSound }) => {
  const [typedText, setTypedText] = useState('');
  const [tagIdx, setTagIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [bootDone, setBootDone] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const isMobile = windowWidth < 768;

  const taglines = [
    'Full Stack Developer',
    'UI/UX Designer',
    'SEO & Digital Marketing',
    'Building The Future',
  ];

  const particles = useMemo(() => mkParticles(35, 77), []);
  const stars = useMemo(() => mkParticles(60, 33), []);

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

  const ciscoBadges = [
    { icon: <SiCisco />, label: 'CCNA', color: '#00d4ff', delay: 0.4 },
    { icon: <SiCisco />, label: 'Intro to Cybersecurity', color: '#7b61ff', delay: 0.55 },
    { icon: <SiCisco />, label: 'Networking Basics', color: '#00d4ff', delay: 0.7 },
    { icon: <SiCisco />, label: 'Jr Cybersecurity Analyst', color: '#ff6b9d', delay: 0.85 },
  ];

  const techStack = [
    { icon: '⚛', label: 'React', color: '#61DAFB', delay: 0.4 },
    { icon: '▲', label: 'Next.js', color: '#ffffff', delay: 0.52 },
    { icon: '🐘', label: 'PHP', color: '#777BB4', delay: 0.64 },
    { icon: '🐍', label: 'Python', color: '#3776AB', delay: 0.76 },
    { icon: '💨', label: 'Tailwind', color: '#38BDF8', delay: 0.88 },
    { icon: '🌀', label: 'GSAP', color: '#88CE02', delay: 1.0 },
    { icon: '📦', label: 'Three.js', color: '#ffffff', delay: 1.12 },
  ];

  const socialLinks = [
    { href: 'https://github.com/Awaisiqbal-Code', icon: <FaGithub />, color: '#fff', label: 'GitHub', delay: 1.2 },
    { href: 'https://linkedin.com/in/hafiz-awais-iqbal', icon: <FaLinkedin />, color: '#0077B5', label: 'LinkedIn', delay: 1.32 },
    { href: 'https://facebook.com', icon: <FaFacebook />, color: '#1877F2', label: 'Facebook', delay: 1.44 },
    { href: 'mailto:hafizawaisiqbal40@gmail.com', icon: <FaEnvelope />, color: '#EA4335', label: 'Email', delay: 1.56 },
  ];

  const nameFontSize = isMobile ? 'clamp(2.8rem, 13vw, 4.5rem)' : 'clamp(4.5rem, 10vw, 9rem)';

  return (
    <section id="hero" style={{
      position: 'relative', width: '100%', height: '100vh',
      overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#03010f',
    }}>
      {/* ── GLOBAL KEYFRAMES ── */}
      <style>{`
        @keyframes scanSlide    { 0%{top:0%} 100%{top:110%} }
        @keyframes badgePulse   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(1.5)} }
        @keyframes starTwinkle  { 0%,100%{opacity:.2} 50%{opacity:1} }
        @keyframes fogDrift     { 0%,100%{transform:translateX(-5%) scale(1)} 50%{transform:translateX(5%) scale(1.04)} }
        @keyframes portalSpin   { to{transform:rotate(360deg)} }
        @keyframes portalPulse  { 0%,100%{opacity:.55;transform:scale(1)} 50%{opacity:1;transform:scale(1.06)} }
        @keyframes waveOut      { 0%{transform:scale(.5);opacity:.9} 100%{transform:scale(2.8);opacity:0} }
        @keyframes nameGlow     { 0%,100%{filter:drop-shadow(0 0 30px rgba(0,255,255,.4)) drop-shadow(0 0 80px rgba(123,97,255,.25))} 50%{filter:drop-shadow(0 0 60px rgba(0,255,255,.8)) drop-shadow(0 0 120px rgba(123,97,255,.5))} }
        @keyframes lightSweep   { 0%{background-position:-200% center} 100%{background-position:300% center} }
        @keyframes subtitleGlow { 0%,100%{text-shadow:0 0 10px rgba(0,255,255,.4)} 50%{text-shadow:0 0 20px rgba(0,255,255,.9),0 0 40px rgba(0,255,255,.4)} }
        @keyframes heroFloat    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes gridMove     { from{background-position:0 0} to{background-position:60px 60px} }
        @keyframes energyBeam   { 0%,100%{opacity:.1;transform:scaleY(1)} 50%{opacity:.35;transform:scaleY(1.08)} }
        @keyframes cursor       { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>

      {/* ── BACKGROUND IMAGE ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: 0.45, filter: 'blur(1px)',
      }} />

      {/* ── OVERLAY DARK VIGNETTE ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse at 50% 40%, rgba(3,1,15,0.2) 0%, rgba(3,1,15,0.75) 60%, rgba(3,1,15,0.97) 100%)',
      }} />

      {/* ── ANIMATED GRID ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(0,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '60px 60px', animation: 'gridMove 10s linear infinite',
      }} />

      {/* ── STARS ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
        {stars.map(p => (
          <div key={p.id} style={{
            position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
            width: `${p.size * 0.5}px`, height: `${p.size * 0.5}px`,
            borderRadius: '50%', background: '#fff', opacity: p.alpha * 0.5,
            animation: `starTwinkle ${p.dur * 0.5}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }} />
        ))}
      </div>

      {/* ── FLOATING PARTICLES ── */}
      {particles.map(p => (
        <motion.div key={p.id}
          animate={{ x: [0, p.dx, -p.dx * 0.5, 0], y: [0, p.dy, -p.dy * 0.6, 0], opacity: [p.alpha, p.alpha * 2, p.alpha * 0.3, p.alpha] }}
          transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
          style={{
            position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
            width: `${p.size}px`, height: `${p.size}px`,
            borderRadius: '50%', pointerEvents: 'none', zIndex: 2,
            background: p.cyan ? `rgba(0,255,255,${p.alpha})` : `rgba(123,97,255,${p.alpha})`,
            boxShadow: p.cyan ? `0 0 ${p.size * 4}px rgba(0,255,255,${p.alpha * 0.5})` : `0 0 ${p.size * 4}px rgba(123,97,255,${p.alpha * 0.5})`,
          }}
        />
      ))}

      {/* ── ENERGY FOG ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: '-10%', right: '-10%', height: '40%',
        background: 'linear-gradient(to top, rgba(3,1,15,0.95) 0%, rgba(0,50,100,0.1) 55%, transparent 100%)',
        animation: 'fogDrift 16s ease-in-out infinite', pointerEvents: 'none', zIndex: 3,
      }} />

      {/* ── GIANT PORTAL ── */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isMobile ? '80vw' : '44vw',
        height: isMobile ? '80vw' : '44vw',
        maxWidth: isMobile ? '340px' : '680px',
        maxHeight: isMobile ? '340px' : '680px',
        pointerEvents: 'none', zIndex: 4,
      }}>
        {/* Energy pulse waves */}
        {[0, 1.0, 2.0, 3.0].map((d, i) => (
          <div key={i} style={{
            position: 'absolute', inset: '15%', borderRadius: '50%',
            border: '1px solid rgba(0,255,255,0.25)',
            animation: `waveOut 4s ease-out infinite`, animationDelay: `${d}s`,
          }} />
        ))}
        {/* Outer ring */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid transparent',
          background: 'linear-gradient(#03010f,#03010f) padding-box, conic-gradient(from 0deg, #00ffff, #7b61ff, #ff00cc, #00d4ff, #7b61ff, #00ffff) border-box',
          animation: 'portalSpin 8s linear infinite',
          boxShadow: '0 0 60px rgba(0,255,255,0.5), 0 0 120px rgba(123,97,255,0.3), inset 0 0 60px rgba(0,255,255,0.1)',
        }} />
        {/* Mid ring */}
        <div style={{
          position: 'absolute', inset: isMobile ? '16px' : '28px', borderRadius: '50%',
          border: '1.5px solid transparent',
          background: 'linear-gradient(#03010f,#03010f) padding-box, conic-gradient(from 180deg, #7b61ff, #00ffff, #ff00cc, #7b61ff) border-box',
          animation: 'portalSpin 12s linear infinite reverse',
        }} />
        {/* Inner ring */}
        <div style={{
          position: 'absolute', inset: isMobile ? '32px' : '56px', borderRadius: '50%',
          border: '1px solid rgba(123,97,255,0.5)',
          animation: 'portalSpin 20s linear infinite',
        }} />
        {/* Core glow */}
        <div style={{
          position: 'absolute', inset: isMobile ? '50px' : '90px', borderRadius: '50%',
          background: 'radial-gradient(circle at 40% 40%, rgba(0,255,255,0.2) 0%, rgba(123,97,255,0.15) 50%, rgba(0,0,20,0.6) 100%)',
          boxShadow: '0 0 80px rgba(0,255,255,0.25), inset 0 0 80px rgba(123,97,255,0.2)',
          animation: 'portalPulse 4s ease-in-out infinite',
        }} />
        {/* Rotating orbital dots */}
        {Array.from({ length: 10 }, (_, i) => (
          <motion.div key={i}
            animate={{ rotate: 360 }}
            transition={{ duration: 7 + i * 1.2, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'absolute', inset: 0, borderRadius: '50%' }}
          >
            <div style={{
              position: 'absolute', top: '50%',
              left: `${48 + 44 * Math.cos((i / 10) * Math.PI * 2)}%`,
              width: '5px', height: '5px', borderRadius: '50%',
              background: i % 2 === 0 ? 'rgba(0,255,255,1)' : 'rgba(123,97,255,1)',
              boxShadow: i % 2 === 0 ? '0 0 10px rgba(0,255,255,1)' : '0 0 10px rgba(123,97,255,1)',
              transform: 'translate(-50%,-50%)',
            }} />
          </motion.div>
        ))}
      </div>

      {/* ── HUMAN SILHOUETTE ── */}
      {!isMobile && <HumanSilhouette />}

      {/* ── LEFT: CISCO BADGES ── */}
      {!isMobile && (
        <div style={{
          position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)',
          display: 'flex', flexDirection: 'column', gap: '10px', zIndex: 20, width: '210px',
        }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            style={{ fontFamily: 'var(--font-title)', fontSize: '0.5rem', letterSpacing: '2px', color: 'rgba(0,255,255,0.5)', marginBottom: '4px', textTransform: 'uppercase' }}
          >
            <SiCisco style={{ marginRight: '5px', verticalAlign: 'middle' }} />
            Cisco Certifications
          </motion.div>
          {ciscoBadges.map((b, i) => (
            <CiscoBadge key={i} {...b} />
          ))}
        </div>
      )}

      {/* ── RIGHT: TECH STACK ── */}
      {!isMobile && (
        <div style={{
          position: 'absolute', right: '24px', top: '50%', transform: 'translateY(-50%)',
          display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 20, width: '180px',
        }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            style={{ fontFamily: 'var(--font-title)', fontSize: '0.5rem', letterSpacing: '2px', color: 'rgba(0,255,255,0.5)', marginBottom: '4px', textTransform: 'uppercase' }}
          >
            ⚡ Tech Stack
          </motion.div>
          {techStack.map((t, i) => (
            <TechChip key={i} {...t} />
          ))}
        </div>
      )}

      {/* ══════════ CENTER CONTENT ══════════ */}
      <div style={{
        position: 'relative', zIndex: 15,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        width: isMobile ? '95%' : '60%',
        paddingTop: isMobile ? '120px' : '80px',
        paddingBottom: isMobile ? '100px' : '60px',
        textAlign: 'center',
        gap: '0px',
      }}>
        {/* ── SUBTITLE TAGLINE (typing) ── */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: bootDone ? 1 : 0 }} transition={{ duration: 0.7 }}
          style={{
            fontFamily: 'var(--font-title)', fontSize: isMobile ? '0.6rem' : '0.78rem',
            letterSpacing: '4px', color: 'rgba(0,255,255,0.9)',
            marginBottom: '16px', minHeight: '22px',
            animation: 'subtitleGlow 3s ease-in-out infinite',
            display: 'flex', alignItems: 'center', gap: '2px',
          }}
        >
          {'/// '}{typedText}
          <span style={{ display: 'inline-block', width: '2px', height: '14px', background: 'rgba(0,255,255,1)', marginLeft: '2px', animation: 'cursor 0.8s step-end infinite' }} />
          {' ///'}
        </motion.div>

        {/* ── GIANT NAME ── */}
        <motion.h1
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.9, type: 'spring', stiffness: 80 }}
          style={{
            fontFamily: 'var(--font-title)', fontWeight: 900,
            fontSize: nameFontSize,
            letterSpacing: isMobile ? '4px' : '10px',
            lineHeight: 1.0, margin: 0,
            background: 'linear-gradient(135deg, #ffffff 0%, #00ffff 25%, #a855f7 55%, #ff00cc 75%, #ffffff 100%)',
            backgroundSize: '300% 100%',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            animation: 'nameGlow 4s ease-in-out infinite, lightSweep 6s linear infinite',
            whiteSpace: isMobile ? 'normal' : 'nowrap',
            wordBreak: isMobile ? 'break-word' : 'normal',
          }}
        >
          AWAIS IQBAL
        </motion.h1>

        {/* ── DIVIDER ── */}
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.8, duration: 1.2 }}
          style={{
            width: '80%', height: '1px', marginTop: '20px', marginBottom: '20px',
            background: 'linear-gradient(90deg, transparent, rgba(0,255,255,0.9) 50%, transparent)',
            boxShadow: '0 0 15px rgba(0,255,255,0.5)',
          }}
        />

        {/* ── ROLE BADGES ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
          style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '22px' }}
        >
          {[
            { label: '</> Full-Stack Dev', c: 'rgba(0,255,255,.95)', b: 'rgba(0,255,255,.2)', bg: 'rgba(0,255,255,.05)' },
            { label: '✦ UI/UX Design', c: 'rgba(168,85,247,.95)', b: 'rgba(123,97,255,.2)', bg: 'rgba(123,97,255,.05)' },
            { label: '↗ SEO Expert', c: 'rgba(255,215,0,.95)', b: 'rgba(255,215,0,.2)', bg: 'rgba(255,215,0,.05)' },
          ].map((badge, i) => (
            <motion.span key={i} whileHover={{ scale: 1.08, y: -2 }}
              style={{
                padding: '5px 14px', borderRadius: '20px',
                fontSize: isMobile ? '0.55rem' : '0.62rem',
                fontFamily: 'var(--font-title)', letterSpacing: '1px',
                border: `1px solid ${badge.b}`, color: badge.c, background: badge.bg,
                backdropFilter: 'blur(8px)', boxShadow: `0 0 16px ${badge.b}`,
                cursor: 'default', textTransform: 'uppercase',
              }}
            >{badge.label}</motion.span>
          ))}
        </motion.div>

        {/* ── DESCRIPTION ── */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
          style={{
            fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.5)',
            fontSize: isMobile ? '0.82rem' : '0.95rem',
            maxWidth: '460px', lineHeight: 1.8, marginBottom: '28px', textAlign: 'center',
          }}
        >
          Building digital experiences that leave a mark. From Cisco-certified networks to award-winning interfaces.
        </motion.p>

        {/* ── CTA BUTTON ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, type: 'spring', stiffness: 180 }}
          style={{ position: 'relative', display: 'inline-block' }}
        >
          {/* Pulse rings */}
          {[0, 0.7, 1.4].map((d, i) => (
            <div key={i} style={{
              position: 'absolute', inset: `-${8 + i * 7}px`, borderRadius: '35px',
              border: '1px solid rgba(0,255,255,0.15)',
              animation: `waveOut 3s ease-in-out infinite`, animationDelay: `${d}s`, pointerEvents: 'none',
            }} />
          ))}
          <button onClick={onExplore}
            style={{
              background: 'linear-gradient(90deg, rgba(80,50,220,0.9) 0%, rgba(0,200,255,0.9) 100%)',
              border: '1px solid rgba(0,255,255,0.6)', color: '#fff',
              padding: isMobile ? '12px 32px' : '15px 50px', borderRadius: '34px',
              fontFamily: 'var(--font-title)', fontSize: isMobile ? '0.75rem' : '0.88rem',
              fontWeight: 'bold', letterSpacing: '3px', cursor: 'pointer',
              boxShadow: '0 0 50px rgba(0,255,255,.4), 0 0 100px rgba(123,97,255,.25)',
              transition: 'all .3s', position: 'relative', zIndex: 2,
              display: 'flex', alignItems: 'center', gap: '10px',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.06)'; e.currentTarget.style.boxShadow = '0 0 70px rgba(0,255,255,.7), 0 0 140px rgba(123,97,255,.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 0 50px rgba(0,255,255,.4), 0 0 100px rgba(123,97,255,.25)'; }}
          >
            EXPLORE MY WORLD <FaArrowRight style={{ fontSize: '0.8rem' }} />
          </button>
        </motion.div>
      </div>

      {/* ── BOTTOM LEFT: SOCIAL LINKS ── */}
      <div style={{
        position: 'absolute', bottom: isMobile ? '18px' : '32px',
        left: isMobile ? '50%' : '32px',
        transform: isMobile ? 'translateX(-50%)' : 'none',
        display: 'flex', flexDirection: 'row', gap: '12px', zIndex: 30,
      }}>
        {socialLinks.map((s, i) => (
          <motion.a key={i} href={s.href}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: s.delay }}
            whileHover={{ scale: 1.25, y: -4 }}
            onClick={e => { e.preventDefault(); if (s.href.startsWith('mailto:')) window.location.href = s.href; else window.open(s.href, '_blank'); }}
            title={s.label}
            style={{
              width: '42px', height: '42px', borderRadius: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
              backdropFilter: 'blur(12px)', color: s.color, fontSize: '1.1rem',
              textDecoration: 'none', boxShadow: `0 0 16px ${s.color}30`,
              transition: 'all 0.3s', cursor: 'pointer',
            }}
          >
            {s.icon}
          </motion.a>
        ))}
      </div>

      {/* ── SOUND TOGGLE ── */}
      <div style={{ position: 'absolute', bottom: isMobile ? '18px' : '32px', right: '32px', zIndex: 30 }}>
        <button onClick={toggleSound}
          style={{
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '50%', width: '42px', height: '42px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', cursor: 'pointer', fontSize: '1rem', backdropFilter: 'blur(12px)',
            transition: 'all 0.3s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,255,255,0.7)'; e.currentTarget.style.boxShadow = '0 0 16px rgba(0,255,255,0.4)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.boxShadow = 'none'; }}
        >
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
      </div>

      {/* ── SCROLL INDICATOR ── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
        style={{
          position: 'absolute', bottom: isMobile ? '70px' : '32px', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
          zIndex: 25, pointerEvents: 'none',
        }}
      >
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.5rem', letterSpacing: '3px', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>Scroll</span>
        <div style={{ width: '18px', height: '28px', border: '1px solid rgba(255,255,255,0.18)', borderRadius: '9px', display: 'flex', justifyContent: 'center' }}>
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: '2px', height: '5px', background: 'rgba(0,255,255,0.8)', borderRadius: '1px', marginTop: '4px' }}
          />
        </div>
      </motion.div>

      {/* ── AVAILABLE BADGE ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
        style={{
          position: 'absolute', top: '22px', right: '80px',
          display: 'flex', alignItems: 'center', gap: '7px',
          padding: '5px 14px', borderRadius: '20px',
          background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(34,197,94,0.4)',
          backdropFilter: 'blur(12px)', zIndex: 50, pointerEvents: 'none',
        }}
      >
        <motion.span
          animate={{ scale: [1, 1.7, 1], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 10px #22c55e', display: 'inline-block' }}
        />
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '1.5px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>Available for Hire</span>
      </motion.div>

      {/* ── MOBILE CISCO + TECH (bottom) ── */}
      {isMobile && (
        <div style={{
          position: 'absolute', bottom: '80px', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center',
          zIndex: 20, width: '90%',
        }}>
          {ciscoBadges.slice(0, 2).map((b, i) => (
            <div key={i} style={{
              padding: '5px 10px', borderRadius: '8px',
              background: 'rgba(0,10,40,0.8)', border: `1px solid ${b.color}40`,
              fontFamily: 'var(--font-title)', fontSize: '0.45rem', color: 'rgba(255,255,255,0.8)',
              letterSpacing: '0.8px', textTransform: 'uppercase', backdropFilter: 'blur(10px)',
            }}>
              {b.label}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Hero;
