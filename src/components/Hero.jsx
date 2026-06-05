import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, animate } from 'motion/react';
import {
  FaLinkedin, FaGithub, FaTwitter, FaEnvelope,
  FaVolumeUp, FaVolumeMute, FaChevronDown,
  FaPause, FaPlay, FaMapMarkerAlt, FaCode,
  FaClock, FaArrowRight, FaReact, FaNode, FaPython,
} from 'react-icons/fa';
import { SiNextdotjs, SiMongodb, SiTailwindcss, SiTypescript, SiFirebase, SiGraphql } from 'react-icons/si';

/* ═══════════ seeded RNG ═══════════ */
const rng = (seed) => { let s = seed; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; };
const mkParticles = (n, seed) => { const r = rng(seed); return Array.from({ length: n }, (_, i) => ({ id: i, x: r() * 100, y: r() * 100, size: 1 + r() * 3, dur: 10 + r() * 20, delay: r() * 12, cyan: r() > 0.4, alpha: 0.2 + r() * 0.6, dx: -50 + r() * 100, dy: -50 + r() * 100 })); };

/* ═══════════ Glitch Text ═══════════ */
const GlitchTitle = ({ text }) => {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const iv = setInterval(() => { setGlitch(true); setTimeout(() => setGlitch(false), 200 + Math.random() * 300); }, 3000 + Math.random() * 4000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <style>{`
        @keyframes glitch1 { 0%,100%{clip-path:inset(0 0 90% 0);transform:translate(-3px,0)} 50%{clip-path:inset(30% 0 50% 0);transform:translate(3px,0)} }
        @keyframes glitch2 { 0%,100%{clip-path:inset(70% 0 10% 0);transform:translate(3px,0)} 50%{clip-path:inset(10% 0 80% 0);transform:translate(-3px,0)} }
        @keyframes charReveal { from{opacity:0;transform:translateY(30px) rotateX(90deg)} to{opacity:1;transform:translateY(0) rotateX(0)} }
        @keyframes titlePulse { 0%,100%{filter:drop-shadow(0 0 20px rgba(0,255,255,.3)) drop-shadow(0 0 60px rgba(123,97,255,.2))} 50%{filter:drop-shadow(0 0 40px rgba(0,255,255,.6)) drop-shadow(0 0 80px rgba(123,97,255,.4))} }
        @keyframes lightSweep { 0%{background-position:-200% center} 100%{background-position:300% center} }
      `}</style>
      <h1 style={{
        fontFamily: 'var(--font-title)', fontWeight: 900,
        fontSize: 'clamp(2.8rem, 7vw, 6rem)',
        letterSpacing: '6px', margin: 0, lineHeight: 1,
        background: 'linear-gradient(135deg, #fff 0%, #00ffff 30%, #a855f7 60%, #ff00cc 80%, #fff 100%)',
        backgroundSize: '300% 100%',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        animation: 'titlePulse 4s ease-in-out infinite, lightSweep 5s linear infinite',
        position: 'relative', zIndex: 2,
      }}>
        {text.split('').map((ch, i) => (
          <motion.span key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.07, duration: 0.5, type: 'spring', stiffness: 200 }}
            style={{ display: 'inline-block', whiteSpace: ch === ' ' ? 'pre' : undefined }}
          >{ch}</motion.span>
        ))}
      </h1>
      {/* Glitch layers */}
      {glitch && <>
        <div style={{
          position: 'absolute', inset: 0, fontFamily: 'var(--font-title)', fontWeight: 900,
          fontSize: 'clamp(2.8rem, 7vw, 6rem)', letterSpacing: '6px', lineHeight: 1,
          color: '#00ffff', opacity: 0.7, animation: 'glitch1 0.15s steps(2) infinite',
          pointerEvents: 'none', zIndex: 3,
        }}>{text}</div>
        <div style={{
          position: 'absolute', inset: 0, fontFamily: 'var(--font-title)', fontWeight: 900,
          fontSize: 'clamp(2.8rem, 7vw, 6rem)', letterSpacing: '6px', lineHeight: 1,
          color: '#ff00cc', opacity: 0.6, animation: 'glitch2 0.12s steps(2) infinite',
          pointerEvents: 'none', zIndex: 3,
        }}>{text}</div>
      </>}
    </div>
  );
};

/* ═══════════ Holographic Panel ═══════════ */
const HoloPanel = ({ children, style = {}, delay = 0 }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        background: 'rgba(0,10,30,0.75)',
        border: `1px solid ${hovered ? 'rgba(0,255,255,0.6)' : 'rgba(0,255,255,0.2)'}`,
        borderRadius: '12px',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: hovered
          ? '0 0 30px rgba(0,255,255,0.3), inset 0 0 20px rgba(0,255,255,0.05)'
          : '0 0 15px rgba(0,255,255,0.1), inset 0 0 10px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        position: 'relative', overflow: 'hidden',
        ...style,
      }}
    >
      {/* Scan line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(0,255,255,0.8), transparent)',
        animation: 'scanSlide 3s linear infinite',
        animationDelay: `${delay}s`,
        pointerEvents: 'none',
      }} />
      {/* Corner accents */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '12px', height: '12px', borderTop: '2px solid rgba(0,255,255,0.7)', borderLeft: '2px solid rgba(0,255,255,0.7)', borderRadius: '2px 0 0 0' }} />
      <div style={{ position: 'absolute', top: 0, right: 0, width: '12px', height: '12px', borderTop: '2px solid rgba(0,255,255,0.7)', borderRight: '2px solid rgba(0,255,255,0.7)', borderRadius: '0 2px 0 0' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '12px', height: '12px', borderBottom: '2px solid rgba(0,255,255,0.7)', borderLeft: '2px solid rgba(0,255,255,0.7)', borderRadius: '0 0 0 2px' }} />
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: '12px', height: '12px', borderBottom: '2px solid rgba(0,255,255,0.7)', borderRight: '2px solid rgba(0,255,255,0.7)', borderRadius: '0 0 2px 0' }} />
      {children}
    </motion.div>
  );
};

/* ═══════════ Central Energy Portal ═══════════ */
const EnergyPortal = () => (
  <div style={{ position: 'absolute', top: '8%', left: '50%', transform: 'translateX(-50%)', width: '340px', height: '340px', pointerEvents: 'none', zIndex: 2 }}>
    <style>{`
      @keyframes portalSpin { to { transform: rotate(360deg); } }
      @keyframes portalPulse { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.12)} }
      @keyframes energyRing { 0%{transform:rotate(0) scale(1);opacity:.7} 50%{transform:rotate(180deg) scale(1.05);opacity:1} 100%{transform:rotate(360deg) scale(1);opacity:.7} }
      @keyframes waveOut { 0%{transform:scale(.6);opacity:.8} 100%{transform:scale(2.5);opacity:0} }
      @keyframes scanSlide { 0%{top:-10%} 100%{top:110%} }
    `}</style>

    {/* Energy wave pulses */}
    {[0, 1.2, 2.4].map((d, i) => (
      <div key={i} style={{
        position: 'absolute', inset: '20%', borderRadius: '50%',
        border: '1px solid rgba(0,255,255,0.3)',
        animation: `waveOut 3s ease-out infinite`, animationDelay: `${d}s`,
      }} />
    ))}

    {/* Outer spinning conic ring */}
    <div style={{
      position: 'absolute', inset: 0, borderRadius: '50%',
      border: '3px solid transparent',
      background: 'linear-gradient(#0a0a1a,#0a0a1a) padding-box, conic-gradient(from 0deg, #00ffff, #7b61ff, #ff00cc, #00ffff) border-box',
      animation: 'portalSpin 5s linear infinite',
      boxShadow: '0 0 40px rgba(0,255,255,0.4), 0 0 80px rgba(123,97,255,0.2)',
    }} />

    {/* Middle ring */}
    <div style={{
      position: 'absolute', inset: '18px', borderRadius: '50%',
      border: '2px solid transparent',
      background: 'linear-gradient(#0a0a1a,#0a0a1a) padding-box, conic-gradient(from 180deg, #7b61ff, #00ffff, #7b61ff) border-box',
      animation: 'portalSpin 8s linear infinite reverse',
    }} />

    {/* Inner ring */}
    <div style={{
      position: 'absolute', inset: '36px', borderRadius: '50%',
      border: '1px solid rgba(123,97,255,0.4)',
      animation: 'portalSpin 12s linear infinite',
    }} />

    {/* Core sphere */}
    <div style={{
      position: 'absolute', inset: '60px', borderRadius: '50%',
      background: 'radial-gradient(circle at 40% 40%, rgba(0,255,255,0.3) 0%, rgba(123,97,255,0.2) 50%, transparent 70%)',
      boxShadow: '0 0 40px rgba(0,255,255,0.2), inset 0 0 40px rgba(123,97,255,0.15)',
      animation: 'portalPulse 3s ease-in-out infinite',
    }} />

    {/* Floating particles around portal */}
    {Array.from({ length: 8 }, (_, i) => (
      <motion.div key={i}
        animate={{ rotate: 360 }}
        transition={{ duration: 6 + i * 1.5, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', inset: 0, borderRadius: '50%' }}
      >
        <div style={{
          position: 'absolute',
          top: '50%',
          left: `${45 + 40 * Math.cos((i / 8) * Math.PI * 2)}%`,
          width: '4px', height: '4px', borderRadius: '50%',
          background: i % 2 === 0 ? 'rgba(0,255,255,0.9)' : 'rgba(123,97,255,0.9)',
          boxShadow: i % 2 === 0 ? '0 0 8px rgba(0,255,255,1)' : '0 0 8px rgba(123,97,255,1)',
          transform: 'translate(-50%,-50%)',
        }} />
      </motion.div>
    ))}

    {/* Light ray beams from portal */}
    {[0, 60, 120, 180, 240, 300].map((deg, i) => (
      <div key={i} style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: `conic-gradient(from ${deg}deg, transparent 0deg, rgba(0,255,255,0.03) 5deg, transparent 10deg)`,
        animation: `portalSpin ${10 + i}s linear infinite`,
      }} />
    ))}
  </div>
);

/* ═══════════ MAIN HERO ═══════════ */
const Hero = ({ onExplore, isMuted, toggleSound }) => {
  const [typedText, setTypedText] = useState('');
  const [tagIdx, setTagIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [bootStage, setBootStage] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const taglines = [
    '/// JUNIOR FULL-STACK DEVELOPER ///',
    '/// UI/UX DESIGNER & ANIMATOR ///',
    '/// SEO & DIGITAL MARKETING ///',
    '/// BUILDING THE FUTURE ///',
  ];

  const particles = useMemo(() => mkParticles(30, 99), []);
  const starParticles = useMemo(() => mkParticles(50, 42), []);

  // Boot sequence
  useEffect(() => {
    const stages = [300, 800, 1400, 2000];
    stages.forEach((t, i) => setTimeout(() => setBootStage(i + 1), t));
  }, []);

  // Typing effect
  useEffect(() => {
    const cur = taglines[tagIdx];
    let speed = deleting ? 22 : 50;
    if (!deleting && typedText === cur) { speed = 2000; setDeleting(true); }
    else if (deleting && typedText === '') { setDeleting(false); setTagIdx(p => (p + 1) % taglines.length); speed = 400; }
    const t = setTimeout(() => {
      setTypedText(p => deleting ? cur.slice(0, p.length - 1) : cur.slice(0, p.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [typedText, tagIdx, deleting]);

  // Mouse parallax
  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    mouseX.set(x);
    mouseY.set(y);
  }, []);

  const socialLinks = [
    { href: 'https://linkedin.com/in/hafiz-awais-iqbal', icon: <FaLinkedin />, color: '#0077B5', glow: 'rgba(0,119,181,0.6)', label: 'LinkedIn' },
    { href: 'https://github.com/Awaisiqbal-Code', icon: <FaGithub />, color: '#fff', glow: 'rgba(255,255,255,0.4)', label: 'GitHub' },
    { href: 'https://twitter.com', icon: <FaTwitter />, color: '#1DA1F2', glow: 'rgba(29,161,242,0.6)', label: 'Twitter' },
    { href: 'mailto:hafizawaisiqbal40@gmail.com', icon: <FaEnvelope />, color: '#EA4335', glow: 'rgba(234,67,53,0.6)', label: 'Email' },
  ];

  const techStack = [
    { icon: <FaReact style={{ color: '#61DAFB' }} />, label: 'React' },
    { icon: <SiNextdotjs style={{ color: '#fff' }} />, label: 'Next.js' },
    { icon: <FaNode style={{ color: '#68A063' }} />, label: 'Node.js' },
    { icon: <FaPython style={{ color: '#3776AB' }} />, label: 'Python' },
    { icon: <SiMongodb style={{ color: '#47A248' }} />, label: 'MongoDB' },
    { icon: <SiTailwindcss style={{ color: '#38BDF8' }} />, label: 'Tailwind' },
    { icon: <SiTypescript style={{ color: '#3178C6' }} />, label: 'TypeScript' },
    { icon: <SiFirebase style={{ color: '#FFCA28' }} />, label: 'Firebase' },
    { icon: <SiGraphql style={{ color: '#E10098' }} />, label: 'GraphQL' },
  ];

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative', width: '100%', height: '100vh',
        overflow: 'hidden', display: 'flex', alignItems: 'center',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(30,0,60,1) 0%, rgba(0,5,25,1) 60%, #000 100%)',
      }}
    >
      {/* ══════════ GLOBAL KEYFRAMES ══════════ */}
      <style>{`
        @keyframes nameGrad     { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes portalSpin   { to{transform:rotate(360deg)} }
        @keyframes portalPulse  { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.12)} }
        @keyframes waveOut      { 0%{transform:scale(.6);opacity:.8} 100%{transform:scale(2.5);opacity:0} }
        @keyframes scanSlide    { 0%{top:-10%} 100%{top:110%} }
        @keyframes gridMove     { from{background-position:0 0} to{background-position:60px 60px} }
        @keyframes starTwinkle  { 0%,100%{opacity:.3} 50%{opacity:1} }
        @keyframes nebulaDrift  { 0%,100%{transform:scale(1) translate(0,0)} 33%{transform:scale(1.1) translate(20px,-15px)} 66%{transform:scale(.95) translate(-15px,20px)} }
        @keyframes fogDrift     { 0%{transform:translateX(-5%) translateY(0)} 50%{transform:translateX(5%) translateY(-2%)} 100%{transform:translateX(-5%) translateY(0)} }
        @keyframes cityGlow     { 0%,100%{opacity:.4} 50%{opacity:.7} }
        @keyframes panelFloat   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes codeScroll   { from{transform:translateY(0)} to{transform:translateY(-50%)} }
        @keyframes barDance     { 0%,100%{height:4px} 50%{height:16px} }
        @keyframes heroPulse    { 0%,100%{transform:scale(1);opacity:.5} 50%{transform:scale(1.25);opacity:0} }
        @keyframes hexGlow      { 0%,100%{box-shadow:0 0 30px rgba(0,255,255,.3),0 0 60px rgba(123,97,255,.2)} 50%{box-shadow:0 0 50px rgba(0,255,255,.6),0 0 100px rgba(123,97,255,.5)} }
        @keyframes dataLine     { 0%{transform:scaleX(0);opacity:0} 100%{transform:scaleX(1);opacity:1} }
        @keyframes statusBlink  { 0%,90%,100%{opacity:1} 95%{opacity:.2} }
        @keyframes socialRipple { 0%{transform:scale(0);opacity:.6} 100%{transform:scale(3);opacity:0} }
        @keyframes lightSweep   { 0%{background-position:-200% center} 100%{background-position:300% center} }
        @keyframes portraitGlow { 0%,100%{box-shadow:0 0 0 2px rgba(0,255,255,.4),0 0 20px rgba(0,255,255,.2)} 50%{box-shadow:0 0 0 3px rgba(0,255,255,.8),0 0 40px rgba(0,255,255,.4)} }
      `}</style>

      {/* ══════════ BACKGROUND LAYERS ══════════ */}

      {/* Moving stars layer */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {starParticles.map(p => (
          <div key={p.id} style={{
            position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
            width: `${p.size * 0.6}px`, height: `${p.size * 0.6}px`,
            borderRadius: '50%', background: '#fff',
            opacity: p.alpha * 0.5,
            animation: `starTwinkle ${p.dur * 0.5}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }} />
        ))}
      </div>

      {/* Nebula glow layers */}
      <motion.div style={{ x: springX, y: springY, position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{
          position: 'absolute', top: '-10%', left: '-5%', width: '70%', height: '70%', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(123,0,255,0.12) 0%, transparent 65%)',
          filter: 'blur(80px)', animation: 'nebulaDrift 20s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', bottom: '0%', right: '-5%', width: '60%', height: '60%', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(0,100,255,0.1) 0%, transparent 65%)',
          filter: 'blur(90px)', animation: 'nebulaDrift 25s ease-in-out infinite reverse',
        }} />
        <div style={{
          position: 'absolute', top: '30%', left: '30%', width: '50%', height: '50%', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(0,200,255,0.06) 0%, transparent 65%)',
          filter: 'blur(70px)', animation: 'nebulaDrift 18s ease-in-out infinite',
          animationDelay: '5s',
        }} />
      </motion.div>

      {/* Animated grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(0,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.025) 1px, transparent 1px)',
        backgroundSize: '60px 60px', animation: 'gridMove 8s linear infinite',
      }} />

      {/* Energy fog */}
      <div style={{
        position: 'absolute', bottom: 0, left: '-10%', right: '-10%', height: '35%', pointerEvents: 'none', zIndex: 1,
        background: 'linear-gradient(to top, rgba(0,5,30,0.9) 0%, rgba(0,50,100,0.1) 60%, transparent 100%)',
        animation: 'fogDrift 12s ease-in-out infinite',
      }} />

      {/* Floating particles */}
      {particles.map(p => (
        <motion.div key={p.id}
          animate={{ x: [0, p.dx, -p.dx * 0.5, 0], y: [0, p.dy, -p.dy * 0.6, 0], opacity: [p.alpha, p.alpha * 1.8, p.alpha * 0.3, p.alpha] }}
          transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
          style={{
            position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
            width: `${p.size}px`, height: `${p.size}px`, borderRadius: '50%', pointerEvents: 'none', zIndex: 2,
            background: p.cyan ? `rgba(0,255,255,${p.alpha})` : `rgba(123,97,255,${p.alpha})`,
            boxShadow: p.cyan ? `0 0 ${p.size * 3}px rgba(0,255,255,${p.alpha * 0.6})` : `0 0 ${p.size * 3}px rgba(123,97,255,${p.alpha * 0.6})`,
          }}
        />
      ))}

      {/* SVG City silhouette at bottom */}
      <svg viewBox="0 0 1400 250" preserveAspectRatio="xMidYMax slice"
        style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '250px', pointerEvents: 'none', zIndex: 1, animation: 'cityGlow 4s ease-in-out infinite' }}>
        <defs>
          <linearGradient id="cg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="rgba(0,255,255,0.2)"/><stop offset="1" stopColor="rgba(0,255,255,0)"/></linearGradient>
          <linearGradient id="cg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="rgba(123,97,255,0.2)"/><stop offset="1" stopColor="rgba(123,97,255,0)"/></linearGradient>
        </defs>
        <rect x="0" y="90" width="55" height="160" fill="url(#cg1)"/><rect x="60" y="50" width="70" height="200" fill="url(#cg2)"/>
        <rect x="75" y="60" width="10" height="10" fill="rgba(0,255,255,0.5)"/><rect x="95" y="60" width="10" height="10" fill="rgba(123,97,255,0.5)"/>
        <rect x="140" y="100" width="50" height="150" fill="url(#cg1)"/><rect x="200" y="30" width="80" height="220" fill="url(#cg2)"/>
        <rect x="205" y="40" width="12" height="12" fill="rgba(0,255,255,0.6)"/><rect x="228" y="40" width="12" height="12" fill="rgba(123,97,255,0.6)"/>
        <rect x="290" y="70" width="60" height="180" fill="url(#cg1)"/><rect x="360" y="110" width="45" height="140" fill="url(#cg2)"/>
        <rect x="415" y="130" width="35" height="120" fill="url(#cg1)"/>
        {/* Right side */}
        <rect x="950" y="120" width="40" height="130" fill="url(#cg1)"/><rect x="1000" y="80" width="70" height="170" fill="url(#cg2)"/>
        <rect x="1005" y="90" width="12" height="12" fill="rgba(0,255,255,0.6)"/><rect x="1028" y="90" width="12" height="12" fill="rgba(123,97,255,0.6)"/>
        <rect x="1080" y="40" width="90" height="210" fill="url(#cg1)"/><rect x="1085" y="50" width="14" height="14" fill="rgba(123,97,255,0.7)"/>
        <rect x="1180" y="90" width="60" height="160" fill="url(#cg2)"/><rect x="1250" y="20" width="100" height="230" fill="url(#cg1)"/>
        <rect x="1255" y="30" width="14" height="14" fill="rgba(0,255,255,0.7)"/><rect x="1283" y="30" width="14" height="14" fill="rgba(123,97,255,0.7)"/>
        <rect x="1360" y="100" width="40" height="150" fill="url(#cg2)"/>
        {/* Horizon line */}
        <line x1="0" y1="230" x2="1400" y2="230" stroke="rgba(0,255,255,0.06)" strokeWidth="1"/>
      </svg>

      {/* ══════════ ENERGY PORTAL (top center) ══════════ */}
      <EnergyPortal />

      {/* ══════════ LEFT PANELS ══════════ */}
      <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '10px', zIndex: 20, width: '165px' }}>

        {/* Location */}
        <HoloPanel delay={0.4} style={{ padding: '10px 12px' }}>
          <div style={{ fontFamily: 'var(--font-title)', fontSize: '0.5rem', letterSpacing: '2px', color: 'rgba(0,255,255,0.5)', marginBottom: '6px', textTransform: 'uppercase' }}>
            <FaMapMarkerAlt style={{ marginRight: '4px' }} />Location
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '1rem' }}>🇵🇰</span>
            <span style={{ fontFamily: 'var(--font-title)', fontSize: '0.7rem', color: '#fff', letterSpacing: '1px' }}>Pakistan</span>
          </div>
        </HoloPanel>

        {/* Status */}
        <HoloPanel delay={0.55} style={{ padding: '10px 12px', animation: 'panelFloat 5s ease-in-out infinite' }}>
          <div style={{ fontFamily: 'var(--font-title)', fontSize: '0.5rem', letterSpacing: '2px', color: 'rgba(0,255,255,0.5)', marginBottom: '8px', textTransform: 'uppercase' }}>Status</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 10px #22c55e', animation: 'statusBlink 3s ease-in-out infinite' }} />
            <span style={{ fontFamily: 'var(--font-title)', fontSize: '0.62rem', color: '#22c55e' }}>Available</span>
          </div>
          <div style={{ fontFamily: 'monospace', fontSize: '0.55rem', color: 'rgba(255,255,255,0.35)', marginTop: '4px' }}>for Hire</div>
        </HoloPanel>

        {/* Code panel */}
        <HoloPanel delay={0.7} style={{ padding: '10px 12px', overflow: 'hidden', height: '110px' }}>
          <div style={{ fontFamily: 'var(--font-title)', fontSize: '0.5rem', letterSpacing: '2px', color: 'rgba(0,255,255,0.5)', marginBottom: '6px', textTransform: 'uppercase' }}>
            <FaCode style={{ marginRight: '4px' }} />Code.exe
          </div>
          <div style={{ overflow: 'hidden', height: '75px' }}>
            <div style={{ fontFamily: 'monospace', fontSize: '0.5rem', lineHeight: '1.6', color: 'rgba(0,255,255,0.7)', animation: 'codeScroll 8s linear infinite' }}>
              {['function createFuture() {', "  let passion = true;", "  let skills = ['React',", "    'Next.js', 'Python'];", '  return success;', '}', '', '// Always building,', '// always improving',
                'function createFuture() {', "  let passion = true;", "  let skills = ['React',", "    'Next.js', 'Python'];", '  return success;', '}'].map((line, i) => (
                <div key={i} style={{ color: i === 0 || i === 5 ? 'rgba(123,97,255,0.9)' : i === 1 || i === 2 || i === 3 ? 'rgba(0,255,255,0.8)' : 'rgba(255,255,255,0.3)' }}>{line}</div>
              ))}
            </div>
          </div>
        </HoloPanel>

        {/* Social links column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '4px' }}>
          {socialLinks.map((s, i) => (
            <motion.a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 + i * 0.12 }}
              whileHover={{ scale: 1.2, x: 4 }}
              onClick={e => { e.preventDefault(); if (s.href.startsWith('mailto:')) window.location.href = s.href; else window.open(s.href, '_blank'); }}
              style={{
                width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)', color: '#fff', fontSize: '1rem', textDecoration: 'none',
                boxShadow: `0 0 8px ${s.glow}`, transition: 'all 0.3s', cursor: 'pointer', position: 'relative', overflow: 'hidden',
              }}
              title={s.label}
            >
              {s.icon}
            </motion.a>
          ))}
        </div>

        {/* Now Playing */}
        <HoloPanel delay={1.0} style={{ padding: '10px 12px', animation: 'panelFloat 6s ease-in-out infinite', animationDelay: '1s' }}>
          <div style={{ fontFamily: 'var(--font-title)', fontSize: '0.48rem', letterSpacing: '1.5px', color: 'rgba(0,255,255,0.5)', marginBottom: '6px', textTransform: 'uppercase' }}>
            Now Playing
          </div>
          <div style={{ fontFamily: 'var(--font-title)', fontSize: '0.62rem', color: '#fff', marginBottom: '2px' }}>Focus Mode</div>
          <div style={{ fontFamily: 'monospace', fontSize: '0.5rem', color: 'rgba(255,255,255,0.35)', marginBottom: '8px' }}>Lofi Beats</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button onClick={() => setIsPlaying(p => !p)} style={{ background: 'none', border: '1px solid rgba(0,255,255,0.4)', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(0,255,255,0.8)', fontSize: '0.5rem', cursor: 'pointer' }}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '16px' }}>
              {[0, 0.2, 0.4, 0.6, 0.3, 0.5, 0.1, 0.7].map((d, i) => (
                <div key={i} style={{ width: '2px', background: 'rgba(0,255,255,0.7)', borderRadius: '1px', animation: isPlaying ? `barDance ${0.4 + d}s ease-in-out infinite` : 'none', animationDelay: `${d}s`, height: isPlaying ? '4px' : '4px' }} />
              ))}
            </div>
          </div>
        </HoloPanel>
      </div>

      {/* ══════════ RIGHT PANELS ══════════ */}
      <div style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '10px', zIndex: 20, width: '175px' }}>

        {/* Current Focus */}
        <HoloPanel delay={0.5} style={{ padding: '12px', animation: 'panelFloat 5.5s ease-in-out infinite', animationDelay: '0.5s' }}>
          <div style={{ fontFamily: 'var(--font-title)', fontSize: '0.5rem', letterSpacing: '2px', color: 'rgba(0,255,255,0.5)', marginBottom: '8px', textTransform: 'uppercase' }}>Current Focus</div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.5' }}>
            Building digital experiences that make impact.
          </div>
          <div style={{ marginTop: '8px', height: '1px', background: 'linear-gradient(90deg, rgba(0,255,255,0.6), transparent)', animation: 'dataLine 2s ease forwards', animationDelay: '1.5s' }} />
        </HoloPanel>

        {/* Tech Stack */}
        <HoloPanel delay={0.65} style={{ padding: '12px' }}>
          <div style={{ fontFamily: 'var(--font-title)', fontSize: '0.5rem', letterSpacing: '2px', color: 'rgba(0,255,255,0.5)', marginBottom: '10px', textTransform: 'uppercase' }}>Tech Stack</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            {techStack.map((t, i) => (
              <motion.div key={i} whileHover={{ scale: 1.2 }}
                initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + i * 0.08 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', cursor: 'default' }}
              >
                <div style={{ fontSize: '1.1rem' }}>{t.icon}</div>
                <div style={{ fontFamily: 'var(--font-title)', fontSize: '0.42rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.5px', textAlign: 'center' }}>{t.label}</div>
              </motion.div>
            ))}
          </div>
        </HoloPanel>

        {/* Time Zone + Connect */}
        <HoloPanel delay={0.8} style={{ padding: '10px 12px', animation: 'panelFloat 7s ease-in-out infinite', animationDelay: '2s' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
            <FaClock style={{ color: 'rgba(0,255,255,0.6)', fontSize: '0.65rem' }} />
            <span style={{ fontFamily: 'var(--font-title)', fontSize: '0.48rem', letterSpacing: '1.5px', color: 'rgba(0,255,255,0.5)', textTransform: 'uppercase' }}>Time Zone</span>
          </div>
          <div style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#fff' }}>PKT (UTC +5)</div>
          <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid rgba(0,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-title)', fontSize: '0.5rem', letterSpacing: '1px', color: 'rgba(0,255,255,0.7)', textTransform: 'uppercase' }}>Let's Connect</span>
            <FaArrowRight style={{ color: 'rgba(0,255,255,0.7)', fontSize: '0.65rem' }} />
          </div>
        </HoloPanel>
      </div>

      {/* ══════════ CENTER CONTENT ══════════ */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '160px', paddingBottom: '80px', paddingLeft: '200px', paddingRight: '200px' }}>

        {/* Typing tagline */}
        {bootStage >= 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            style={{
              fontFamily: 'var(--font-title)', fontSize: 'clamp(0.55rem, 1.1vw, 0.75rem)',
              letterSpacing: '3px', color: 'rgba(0,255,255,0.85)',
              marginBottom: '12px', minHeight: '18px', textShadow: '0 0 10px rgba(0,255,255,0.5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            {typedText}
            <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.5 }}
              style={{ display: 'inline-block', width: '2px', height: '13px', background: 'rgba(0,255,255,0.9)', marginLeft: '3px' }} />
          </motion.div>
        )}

        {/* Glow divider */}
        {bootStage >= 1 && (
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1 }}
            style={{ width: '220px', height: '1px', marginBottom: '14px', background: 'linear-gradient(90deg, transparent, rgba(0,255,255,0.8) 50%, transparent)', boxShadow: '0 0 10px rgba(0,255,255,0.4)' }} />
        )}

        {/* GLITCH TITLE */}
        {bootStage >= 2 && <GlitchTitle text="AWAIS IQBAL" />}

        {/* Role badges */}
        {bootStage >= 2 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            style={{ display: 'flex', gap: '10px', marginTop: '16px', marginBottom: '16px', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            {[
              { label: '</>  Full-Stack Developer', c: 'rgba(0,255,255,.9)', b: 'rgba(0,255,255,.25)', bg: 'rgba(0,255,255,.06)' },
              { label: '✦  UI/UX Designer', c: 'rgba(150,120,255,.9)', b: 'rgba(123,97,255,.25)', bg: 'rgba(123,97,255,.06)' },
              { label: '↗  SEO Specialist', c: 'rgba(255,215,0,.9)', b: 'rgba(255,215,0,.25)', bg: 'rgba(255,215,0,.06)' },
            ].map((badge, i) => (
              <motion.span key={i} whileHover={{ scale: 1.06, y: -2 }}
                style={{ padding: '5px 14px', borderRadius: '20px', fontSize: '0.63rem', fontFamily: 'var(--font-title)', letterSpacing: '0.8px', textTransform: 'uppercase', border: `1px solid ${badge.b}`, color: badge.c, background: badge.bg, backdropFilter: 'blur(8px)', boxShadow: `0 0 12px ${badge.b}`, cursor: 'default' }}
              >{badge.label}</motion.span>
            ))}
          </motion.div>
        )}

        {/* Description */}
        {bootStage >= 3 && (
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(0.78rem, 1.4vw, 0.95rem)', maxWidth: '480px', lineHeight: '1.7', marginBottom: '20px', textAlign: 'center' }}
          >
            An interactive, immersive digital museum showcasing specialized growth in full-stack engineering, interactive UI designs, and digital marketing.
          </motion.p>
        )}

        {/* Stats */}
        {bootStage >= 3 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ display: 'flex', gap: '40px', marginBottom: '28px', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            {[{ val: '12+', label: 'Projects', icon: '⚙' }, { val: '10+', label: 'Certificates', icon: '🎖' }, { val: '15+', label: 'Technologies', icon: '⚡' }].map((s, i) => (
              <motion.div key={i} whileHover={{ scale: 1.1 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', cursor: 'default' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '0.9rem' }}>{s.icon}</span>
                  <span style={{ fontFamily: 'var(--font-title)', fontSize: 'clamp(1.2rem, 2.5vw, 1.7rem)', fontWeight: 'bold', color: 'rgba(0,255,255,.9)', textShadow: '0 0 20px rgba(0,255,255,.5)' }}>{s.val}</span>
                </div>
                <span style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,.35)', textTransform: 'uppercase', letterSpacing: '1.5px', fontFamily: 'var(--font-title)' }}>{s.label}</span>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* EXPLORE BUTTON — Hexagonal portal style */}
        {bootStage >= 4 && (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
            style={{ position: 'relative', display: 'inline-block' }}
          >
            {/* Pulse rings */}
            {[0, 0.8, 1.6].map((d, i) => (
              <div key={i} style={{ position: 'absolute', inset: `-${8 + i * 6}px`, borderRadius: '35px', border: '1px solid rgba(0,255,255,0.15)', animation: 'heroPulse 3s ease-in-out infinite', animationDelay: `${d}s`, pointerEvents: 'none' }} />
            ))}
            <button onClick={onExplore}
              style={{
                background: 'linear-gradient(90deg, rgba(100,70,255,0.9) 0%, rgba(0,200,255,0.9) 100%)',
                border: '1px solid rgba(0,255,255,0.5)', color: '#fff',
                padding: '14px 44px', borderRadius: '32px',
                fontFamily: 'var(--font-title)', fontSize: '0.88rem', fontWeight: 'bold',
                letterSpacing: '3px', cursor: 'pointer', position: 'relative', zIndex: 2,
                boxShadow: '0 0 40px rgba(0,255,255,.35), 0 0 80px rgba(123,97,255,.2)',
                animation: 'hexGlow 3s ease-in-out infinite', transition: 'all .3s',
                display: 'flex', alignItems: 'center', gap: '10px',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 0 60px rgba(0,255,255,.6), 0 0 120px rgba(123,97,255,.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(0,255,255,.35), 0 0 80px rgba(123,97,255,.2)'; }}
            >
              EXPLORE MY MIND <FaArrowRight style={{ fontSize: '0.8rem' }} />
            </button>
          </motion.div>
        )}
      </div>

      {/* ══════════ AVAILABLE FOR HIRE badge (top right) ══════════ */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        style={{ position: 'absolute', top: '20px', right: '72px', display: 'flex', alignItems: 'center', gap: '7px', padding: '5px 14px', borderRadius: '20px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(34,197,94,0.35)', backdropFilter: 'blur(12px)', zIndex: 50, pointerEvents: 'none' }}
      >
        <motion.span animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
          style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e', display: 'inline-block' }} />
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '1.5px', color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase' }}>Available for Hire</span>
      </motion.div>

      {/* ══════════ SOUND TOGGLE ══════════ */}
      <div style={{ position: 'absolute', bottom: '26px', right: '34px', zIndex: 100 }}>
        <button onClick={toggleSound}
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer', fontSize: '1rem' }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(0,255,255,0.6)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
        >
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
      </div>

      {/* ══════════ SCROLL INDICATOR ══════════ */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
        style={{ position: 'absolute', bottom: '26px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', zIndex: 20, pointerEvents: 'none' }}
      >
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.52rem', letterSpacing: '2.5px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>Scroll to Explore</span>
        {/* Mouse outline */}
        <div style={{ width: '18px', height: '28px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '9px', position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <motion.div animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: '2px', height: '5px', background: 'rgba(0,255,255,0.7)', borderRadius: '1px', marginTop: '4px' }} />
        </div>
      </motion.div>

    </section>
  );
};

export default Hero;
