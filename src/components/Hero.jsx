import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { FaLinkedin, FaGithub, FaTwitter, FaVolumeUp, FaVolumeMute, FaChevronDown, FaCode } from 'react-icons/fa';
import { SiReact, SiPhp, SiPython, SiGreensock } from 'react-icons/si';

/* ── seeded RNG so particles are stable ── */
const seededRng = (seed) => {
  let s = seed;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
};

const makeParticles = (n) => {
  const r = seededRng(77);
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    size: 1.5 + r() * 3.5,
    x: r() * 100,
    y: r() * 100,
    dur: 14 + r() * 18,
    delay: r() * 10,
    cyan: r() > 0.45,
    alpha: 0.25 + r() * 0.55,
    dx: -40 + r() * 80,
    dy: -40 + r() * 80,
  }));
};

/* ── Animated cyberpunk city line art (SVG buildings) ── */
const Cityscape = () => (
  <svg
    viewBox="0 0 1400 320"
    preserveAspectRatio="xMidYMax slice"
    style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '320px', pointerEvents: 'none', zIndex: 1 }}
  >
    <defs>
      <linearGradient id="cityGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="rgba(0,255,255,0.15)" />
        <stop offset="100%" stopColor="rgba(0,255,255,0)" />
      </linearGradient>
      <linearGradient id="cityGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="rgba(123,97,255,0.15)" />
        <stop offset="100%" stopColor="rgba(123,97,255,0)" />
      </linearGradient>
      <filter id="cityGlow">
        <feGaussianBlur stdDeviation="2" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    {/* Left city cluster */}
    <rect x="0"   y="140" width="60"  height="180" fill="url(#cityGrad)"  opacity="0.5"/>
    <rect x="20"  y="100" width="40"  height="40"  fill="none" stroke="rgba(0,255,255,0.2)" strokeWidth="1"/>
    <rect x="70"  y="80"  width="80"  height="240" fill="url(#cityGrad)"  opacity="0.4"/>
    <rect x="75"  y="90"  width="10"  height="10"  fill="rgba(0,255,255,0.4)"/>
    <rect x="95"  y="90"  width="10"  height="10"  fill="rgba(0,255,255,0.3)"/>
    <rect x="160" y="120" width="50"  height="200" fill="url(#cityGrad2)" opacity="0.4"/>
    <rect x="220" y="60"  width="90"  height="260" fill="url(#cityGrad)"  opacity="0.35"/>
    <rect x="225" y="70"  width="12"  height="12"  fill="rgba(123,97,255,0.5)"/>
    <rect x="250" y="70"  width="12"  height="12"  fill="rgba(0,255,255,0.4)"/>
    <rect x="320" y="150" width="55"  height="170" fill="url(#cityGrad2)" opacity="0.3"/>
    <rect x="385" y="100" width="40"  height="220" fill="url(#cityGrad)"  opacity="0.25"/>
    {/* Right city cluster */}
    <rect x="960"  y="110" width="75"  height="210" fill="url(#cityGrad)"  opacity="0.4"/>
    <rect x="965"  y="120" width="12"  height="12"  fill="rgba(0,255,255,0.5)"/>
    <rect x="985"  y="120" width="12"  height="12"  fill="rgba(123,97,255,0.4)"/>
    <rect x="1045" y="70"  width="90"  height="250" fill="url(#cityGrad2)" opacity="0.45"/>
    <rect x="1050" y="80"  width="14"  height="14"  fill="rgba(123,97,255,0.5)"/>
    <rect x="1075" y="80"  width="14"  height="14"  fill="rgba(0,255,255,0.4)"/>
    <rect x="1145" y="120" width="60"  height="200" fill="url(#cityGrad)"  opacity="0.35"/>
    <rect x="1215" y="50"  width="100" height="270" fill="url(#cityGrad2)" opacity="0.5"/>
    <rect x="1220" y="60"  width="14"  height="14"  fill="rgba(123,97,255,0.6)"/>
    <rect x="1250" y="60"  width="14"  height="14"  fill="rgba(0,255,255,0.5)"/>
    <rect x="1325" y="130" width="75"  height="190" fill="url(#cityGrad)"  opacity="0.4"/>
    {/* Horizon glow line */}
    <line x1="0" y1="280" x2="1400" y2="280" stroke="rgba(0,255,255,0.08)" strokeWidth="1"/>
  </svg>
);

/* ── Animated neon portal ring (right side) ── */
const PortalRing = () => (
  <div style={{
    position: 'absolute',
    right: '5%',
    top: '50%',
    transform: 'translateY(-50%)',
    width: 'clamp(220px, 28vw, 380px)',
    height: 'clamp(220px, 28vw, 380px)',
    pointerEvents: 'none',
    zIndex: 2,
  }}>
    {/* Outer ring rotating */}
    <div style={{
      position: 'absolute', inset: 0, borderRadius: '50%',
      border: '2px solid transparent',
      background: 'linear-gradient(#000,#000) padding-box, conic-gradient(from 0deg, rgba(0,255,255,0.9), rgba(123,97,255,0.9), rgba(255,0,200,0.7), rgba(0,255,255,0.9)) border-box',
      animation: 'portalSpin 4s linear infinite',
      boxShadow: '0 0 30px rgba(0,255,255,0.3), inset 0 0 30px rgba(123,97,255,0.15)',
    }}/>
    {/* Middle ring counter-rotating */}
    <div style={{
      position: 'absolute', inset: '14px', borderRadius: '50%',
      border: '1.5px solid transparent',
      background: 'linear-gradient(#000,#000) padding-box, conic-gradient(from 180deg, rgba(123,97,255,0.8), rgba(0,255,255,0.6), rgba(255,0,200,0.5), rgba(123,97,255,0.8)) border-box',
      animation: 'portalSpin 7s linear infinite reverse',
    }}/>
    {/* Inner ring */}
    <div style={{
      position: 'absolute', inset: '30px', borderRadius: '50%',
      border: '1px solid rgba(0,255,255,0.2)',
      animation: 'portalSpin 12s linear infinite',
    }}/>
    {/* Portal core glow */}
    <div style={{
      position: 'absolute', inset: '50px', borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(123,97,255,0.25) 0%, rgba(0,255,255,0.1) 50%, transparent 70%)',
      animation: 'portalPulse 3s ease-in-out infinite',
    }}/>
    {/* Silhouette developer figure */}
    <svg
      viewBox="0 0 120 200"
      style={{
        position: 'absolute',
        bottom: '2%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '28%',
        height: 'auto',
        filter: 'drop-shadow(0 0 8px rgba(0,255,255,0.5))',
        zIndex: 3,
        animation: 'figureFloat 4s ease-in-out infinite',
      }}
    >
      {/* Head */}
      <ellipse cx="60" cy="22" rx="14" ry="16" fill="rgba(0,255,255,0.15)" stroke="rgba(0,255,255,0.6)" strokeWidth="1.5"/>
      {/* Body */}
      <path d="M46 38 Q44 65 40 90 L80 90 Q76 65 74 38 Z" fill="rgba(0,255,255,0.1)" stroke="rgba(0,255,255,0.5)" strokeWidth="1.5"/>
      {/* Left arm */}
      <path d="M46 42 Q32 60 28 80" fill="none" stroke="rgba(0,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
      {/* Right arm (raised slightly) */}
      <path d="M74 42 Q88 55 92 72" fill="none" stroke="rgba(0,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
      {/* Left leg */}
      <path d="M48 90 Q44 120 42 150" fill="none" stroke="rgba(0,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
      {/* Right leg */}
      <path d="M72 90 Q76 120 78 150" fill="none" stroke="rgba(0,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
      {/* Backpack/laptop glow */}
      <rect x="52" y="48" width="16" height="20" rx="3" fill="rgba(123,97,255,0.2)" stroke="rgba(123,97,255,0.6)" strokeWidth="1"/>
      {/* Scan lines on body */}
      <line x1="44" y1="55" x2="76" y2="55" stroke="rgba(0,255,255,0.2)" strokeWidth="0.5"/>
      <line x1="43" y1="65" x2="77" y2="65" stroke="rgba(0,255,255,0.2)" strokeWidth="0.5"/>
      <line x1="42" y1="75" x2="78" y2="75" stroke="rgba(0,255,255,0.2)" strokeWidth="0.5"/>
    </svg>

    {/* Ground reflection below figure */}
    <div style={{
      position: 'absolute', bottom: '-10px', left: '50%',
      transform: 'translateX(-50%)',
      width: '60px', height: '10px',
      background: 'radial-gradient(ellipse, rgba(0,255,255,0.3) 0%, transparent 70%)',
      borderRadius: '50%',
    }}/>
  </div>
);

/* ════════════════════ HERO COMPONENT ════════════════════ */
const Hero = ({ onExplore, isMuted, toggleSound }) => {
  const [typedText, setTypedText] = useState('');
  const [tagIdx, setTagIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const taglines = [
    '/// JUNIOR FULL-STACK DEVELOPER ///',
    '/// UI/UX DESIGNER & ANIMATOR ///',
    '/// SEO & DIGITAL MARKETING ///',
    '/// BUILDING THE FUTURE ///',
  ];

  const particles = useMemo(() => makeParticles(22), []);

  /* Typing effect */
  useEffect(() => {
    const cur = taglines[tagIdx];
    let speed = deleting ? 25 : 55;
    if (!deleting && typedText === cur) { speed = 1800; setDeleting(true); }
    else if (deleting && typedText === '') {
      setDeleting(false);
      setTagIdx(p => (p + 1) % taglines.length);
      speed = 400;
    }
    const t = setTimeout(() => {
      setTypedText(p => deleting ? cur.slice(0, p.length - 1) : cur.slice(0, p.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [typedText, tagIdx, deleting]);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        background: 'radial-gradient(ellipse at 20% 50%, rgba(0,10,30,1) 0%, rgba(5,0,20,1) 100%)',
      }}
    >

      {/* ── keyframes ── */}
      <style>{`
        @keyframes portalSpin   { to { transform: rotate(360deg); } }
        @keyframes portalPulse  { 0%,100%{opacity:.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.08)} }
        @keyframes figureFloat  { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(-8px)} }
        @keyframes nameGrad     { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes scanLine     { 0%{transform:translateY(-100%);opacity:0} 10%{opacity:.4} 90%{opacity:.4} 100%{transform:translateY(100vh);opacity:0} }
        @keyframes gridMove     { from{background-position:0 0} to{background-position:0 60px} }
        @keyframes cornerPulse  { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:.8;transform:scale(1.1)} }
        @keyframes dataFlow     { 0%{background-position:0 0} 100%{background-position:0 -200px} }
        @keyframes hud-blink    { 0%,90%{opacity:1} 95%{opacity:.3} 100%{opacity:1} }
      `}</style>

      {/* ── Moving grid background ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(0,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,255,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        animation: 'gridMove 4s linear infinite',
      }}/>

      {/* ── Scan line effect ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', left: 0, right: 0, height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(0,255,255,0.15), transparent)',
          animation: 'scanLine 6s linear infinite',
          animationDelay: '1s',
        }}/>
      </div>

      {/* ── Ambient glow orbs ── */}
      <motion.div animate={{ x:[0,50,-30,0], y:[0,-40,25,0] }} transition={{ duration:18, repeat:Infinity, ease:'easeInOut' }}
        style={{ position:'absolute', top:'10%', left:'10%', width:'500px', height:'500px', borderRadius:'50%',
          background:'radial-gradient(circle, rgba(0,255,255,0.1) 0%, transparent 70%)', filter:'blur(70px)', pointerEvents:'none', zIndex:1 }}/>
      <motion.div animate={{ x:[0,-40,30,0], y:[0,35,-20,0] }} transition={{ duration:22, repeat:Infinity, ease:'easeInOut' }}
        style={{ position:'absolute', bottom:'5%', right:'30%', width:'450px', height:'450px', borderRadius:'50%',
          background:'radial-gradient(circle, rgba(123,97,255,0.12) 0%, transparent 70%)', filter:'blur(80px)', pointerEvents:'none', zIndex:1 }}/>
      <motion.div animate={{ scale:[1,1.2,0.9,1] }} transition={{ duration:25, repeat:Infinity, ease:'easeInOut' }}
        style={{ position:'absolute', top:'40%', right:'20%', width:'300px', height:'300px', borderRadius:'50%',
          background:'radial-gradient(circle, rgba(255,0,200,0.06) 0%, transparent 70%)', filter:'blur(60px)', pointerEvents:'none', zIndex:1 }}/>

      {/* ── Floating particles ── */}
      {particles.map(p => (
        <motion.div key={p.id}
          animate={{ x:[0,p.dx,-p.dx*.6,0], y:[0,p.dy,-p.dy*.7,0], opacity:[p.alpha, p.alpha*1.7, p.alpha*.5, p.alpha] }}
          transition={{ duration:p.dur, repeat:Infinity, ease:'easeInOut', delay:p.delay }}
          style={{
            position:'absolute', left:`${p.x}%`, top:`${p.y}%`,
            width:`${p.size}px`, height:`${p.size}px`, borderRadius:'50%',
            background: p.cyan ? `rgba(0,255,255,${p.alpha})` : `rgba(123,97,255,${p.alpha})`,
            boxShadow: p.cyan ? `0 0 ${p.size*2.5}px rgba(0,255,255,${p.alpha*.7})` : `0 0 ${p.size*2.5}px rgba(123,97,255,${p.alpha*.7})`,
            pointerEvents:'none', zIndex:2,
          }}
        />
      ))}

      {/* ── Cityscape silhouette ── */}
      <Cityscape />

      {/* ── Animated Portal Ring (right side) ── */}
      <PortalRing />

      {/* ── Left HUD / data panel decoration ── */}
      <div style={{
        position:'absolute', left:'2%', top:'20%', width:'200px',
        pointerEvents:'none', zIndex:3, opacity:0.5,
        fontFamily:'monospace', fontSize:'0.6rem', color:'rgba(0,255,255,0.5)',
        lineHeight:1.8,
      }}>
        {['> SYSTEM_INIT', '> LOADING...OK', '> CPU: 87%', '> RAM: 4.2GB', '> UPTIME: 99.9%'].map((line, i) => (
          <motion.div key={i} initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }}
            transition={{ delay: 1.5 + i*0.2, duration:0.5 }}
            style={{ animation:`hud-blink ${3+i}s ease-in-out infinite`, animationDelay:`${i*0.7}s` }}>
            {line}
          </motion.div>
        ))}
      </div>

      {/* ── Social links (left side column, matching screenshot) ── */}
      <div style={{
        position:'absolute', left:'28px', top:'50%', transform:'translateY(-50%)',
        display:'flex', flexDirection:'column', gap:'14px', zIndex:20,
      }}>
        {[
          { href:'https://linkedin.com/in/awaisiqbal', icon:<FaLinkedin/>, color:'rgba(0,119,181,0.8)', glow:'rgba(0,119,181,0.5)' },
          { href:'https://github.com/Awaisiqbal-Code', icon:<FaGithub/>, color:'rgba(255,255,255,0.8)', glow:'rgba(255,255,255,0.3)' },
          { href:'#', icon:<FaTwitter/>, color:'rgba(29,161,242,0.8)', glow:'rgba(29,161,242,0.5)' },
        ].map((s, i) => (
          <motion.a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
            initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }}
            transition={{ delay:1.2 + i*0.15 }}
            whileHover={{ scale:1.2, boxShadow:`0 0 20px ${s.glow}` }}
            style={{
              width:'40px', height:'40px', borderRadius:'10px',
              display:'flex', alignItems:'center', justifyContent:'center',
              background:'rgba(255,255,255,0.04)',
              border:'1px solid rgba(255,255,255,0.1)',
              backdropFilter:'blur(10px)', color:'#fff', fontSize:'1.1rem',
              textDecoration:'none', transition:'all 0.3s',
              boxShadow:`0 0 8px ${s.glow}`,
            }}
          >
            {s.icon}
          </motion.a>
        ))}
      </div>

      {/* ════════  MAIN CONTENT (left-center area)  ════════ */}
      <div style={{
        position:'relative', zIndex:10,
        paddingLeft: 'clamp(70px, 8vw, 110px)',
        paddingRight: 'clamp(20px, 5vw, 60px)',
        maxWidth: '55%',
        display:'flex', flexDirection:'column', alignItems:'flex-start',
      }}>

        {/* Typing tagline */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.3 }}
          style={{
            fontFamily:'var(--font-title)', fontSize:'clamp(0.6rem, 1.2vw, 0.8rem)',
            letterSpacing:'3px', color:'rgba(0,255,255,0.8)',
            marginBottom:'14px', minHeight:'20px',
            textShadow:'0 0 10px rgba(0,255,255,0.5)',
            display:'flex', alignItems:'center',
          }}
        >
          {typedText}
          <motion.span animate={{ opacity:[1,0] }} transition={{ repeat:Infinity, duration:0.55 }}
            style={{ display:'inline-block', width:'2px', height:'14px', background:'rgba(0,255,255,0.8)', marginLeft:'3px' }}/>
        </motion.div>

        {/* Glow divider */}
        <motion.div initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ duration:1, delay:0.4 }}
          style={{
            width:'200px', height:'1px', marginBottom:'16px', transformOrigin:'left',
            background:'linear-gradient(90deg, rgba(0,255,255,0.8) 0%, rgba(123,97,255,0.6) 60%, transparent 100%)',
            boxShadow:'0 0 8px rgba(0,255,255,0.4)',
          }}
        />

        {/* Main name */}
        <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.9, delay:0.2 }}
          style={{
            fontFamily:'var(--font-title)',
            fontSize:'clamp(3rem, 6.5vw, 5.5rem)',
            fontWeight:900,
            letterSpacing:'6px',
            margin:'0 0 16px 0',
            lineHeight:1.05,
            background:'linear-gradient(135deg, #ffffff 0%, #00ffff 35%, #a855f7 65%, #ff00cc 85%, #ffffff 100%)',
            backgroundSize:'300% 300%',
            WebkitBackgroundClip:'text',
            WebkitTextFillColor:'transparent',
            backgroundClip:'text',
            animation:'nameGrad 5s ease infinite',
            filter:'drop-shadow(0 0 30px rgba(0,255,255,0.2))',
          }}
        >
          AWAIS IQBAL
        </motion.h1>

        {/* Role badges row */}
        <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.8, delay:0.5 }}
          style={{ display:'flex', gap:'10px', marginBottom:'20px', flexWrap:'wrap' }}
        >
          {[
            { label:'</>  Full-Stack Developer', border:'rgba(0,255,255,0.35)', bg:'rgba(0,255,255,0.06)', color:'rgba(0,255,255,0.9)' },
            { label:'✦  UI/UX Designer',         border:'rgba(123,97,255,0.35)', bg:'rgba(123,97,255,0.06)', color:'rgba(150,120,255,0.9)' },
            { label:'↗  SEO Specialist',          border:'rgba(255,215,0,0.35)', bg:'rgba(255,215,0,0.06)', color:'rgba(255,215,0,0.9)' },
          ].map((b, i) => (
            <motion.span key={i} whileHover={{ scale:1.05, borderColor:'rgba(0,255,255,0.6)' }}
              style={{
                padding:'5px 14px', borderRadius:'20px',
                fontSize:'0.65rem', fontFamily:'var(--font-title)',
                letterSpacing:'0.8px', textTransform:'uppercase',
                border:`1px solid ${b.border}`, color:b.color, background:b.bg,
                backdropFilter:'blur(8px)', cursor:'default',
                boxShadow:`0 0 10px ${b.border}`,
              }}
            >{b.label}</motion.span>
          ))}
        </motion.div>

        {/* Description */}
        <motion.p initial={{ opacity:0, y:15 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.9, delay:0.65 }}
          style={{
            fontFamily:'var(--font-body)',
            color:'rgba(255,255,255,0.55)',
            fontSize:'clamp(0.82rem, 1.5vw, 1rem)',
            maxWidth:'500px',
            lineHeight:1.75,
            marginBottom:'24px',
            letterSpacing:'0.3px',
          }}
        >
          An interactive, immersive digital museum showcasing specialized growth in full-stack engineering, interactive UI designs, and digital marketing.
        </motion.p>

        {/* Stats row */}
        <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.8, delay:0.8 }}
          style={{ display:'flex', gap:'36px', marginBottom:'32px', flexWrap:'wrap' }}
        >
          {[
            { val:'12+', label:'Projects', icon:'⚙' },
            { val:'10+', label:'Certificates', icon:'🎖' },
            { val:'15+', label:'Technologies', icon:'⚡' },
          ].map((s, i) => (
            <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'flex-start' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                <span style={{ fontSize:'0.9rem' }}>{s.icon}</span>
                <span style={{
                  fontFamily:'var(--font-title)', fontSize:'clamp(1.1rem, 2.5vw, 1.6rem)',
                  fontWeight:'bold', color:'rgba(0,255,255,0.9)',
                  textShadow:'0 0 15px rgba(0,255,255,0.4)',
                }}>{s.val}</span>
              </div>
              <span style={{
                fontSize:'0.58rem', color:'rgba(255,255,255,0.35)',
                textTransform:'uppercase', letterSpacing:'1.5px',
                fontFamily:'var(--font-title)', marginTop:'2px',
              }}>{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Explore button */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.9, delay:0.95 }}
          style={{ position:'relative', display:'inline-block', marginBottom:'36px' }}
        >
          {/* Outer pulse ring */}
          <div style={{
            position:'absolute', inset:'-8px', borderRadius:'35px',
            border:'1px solid rgba(0,255,255,0.2)',
            animation:'heroPulse 2.5s ease-in-out infinite',
            pointerEvents:'none',
          }}/>
          <style>{`@keyframes heroPulse{0%,100%{transform:scale(1);opacity:.5}50%{transform:scale(1.15);opacity:0}}`}</style>
          <button onClick={onExplore}
            style={{
              background:'linear-gradient(90deg, rgba(123,97,255,0.9), rgba(0,200,255,0.9))',
              border:'1px solid rgba(0,255,255,0.3)',
              color:'#ffffff', padding:'14px 40px',
              borderRadius:'30px', fontFamily:'var(--font-title)',
              fontSize:'0.85rem', fontWeight:'bold', letterSpacing:'3px',
              cursor:'pointer', position:'relative', zIndex:2,
              boxShadow:'0 0 30px rgba(0,255,255,0.3), 0 0 60px rgba(123,97,255,0.2)',
              transition:'all 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform='scale(1.04)'; e.currentTarget.style.boxShadow='0 0 50px rgba(0,255,255,0.5), 0 0 80px rgba(123,97,255,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow='0 0 30px rgba(0,255,255,0.3), 0 0 60px rgba(123,97,255,0.2)'; }}
          >
            EXPLORE MY MIND
          </button>
        </motion.div>

        {/* Tech stack floaters */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.3 }}
          style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}
        >
          {[
            { label:'React', icon:<SiReact style={{color:'#61DAFB'}}/> },
            { label:'PHP', icon:<SiPhp style={{color:'#777BB4'}}/> },
            { label:'Python', icon:<SiPython style={{color:'#3776AB'}}/> },
            { label:'Three.js', icon:<FaCode style={{color:'#fff'}}/> },
            { label:'GSAP', icon:<SiGreensock style={{color:'#88CE02'}}/> },
            { label:'SEO', icon:<span style={{fontSize:'0.7rem'}}>↗</span> },
          ].map((t, i) => (
            <motion.span key={i}
              animate={{ y:[0,-4,0] }}
              transition={{ duration:2.5 + i*0.3, repeat:Infinity, ease:'easeInOut', delay:i*0.18 }}
              style={{
                padding:'3px 9px', borderRadius:'5px',
                fontSize:'0.58rem', fontFamily:'var(--font-title)',
                letterSpacing:'0.8px', color:'rgba(255,255,255,0.45)',
                border:'1px solid rgba(255,255,255,0.07)',
                background:'rgba(255,255,255,0.02)',
                display:'flex', alignItems:'center', gap:'4px',
              }}
            >
              {t.icon} {t.label}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* ── Available for hire badge (top-right, matching screenshot) ── */}
      <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }}
        transition={{ delay:0.5 }}
        style={{
          position:'absolute', top:'22px', right:'90px',
          display:'flex', alignItems:'center', gap:'7px',
          padding:'5px 14px', borderRadius:'20px',
          background:'rgba(255,255,255,0.04)',
          border:'1px solid rgba(34,197,94,0.3)',
          backdropFilter:'blur(12px)', zIndex:20, pointerEvents:'none',
        }}
      >
        <motion.span animate={{ scale:[1,1.6,1], opacity:[1,.4,1] }}
          transition={{ duration:1.5, repeat:Infinity }}
          style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#22c55e', boxShadow:'0 0 8px #22c55e', display:'inline-block' }}
        />
        <span style={{ fontFamily:'var(--font-body)', fontSize:'0.62rem', letterSpacing:'1.5px', color:'rgba(255,255,255,0.65)', textTransform:'uppercase' }}>
          Available for hire
        </span>
      </motion.div>

      {/* ── Sound toggle (bottom right) ── */}
      <div style={{ position:'absolute', bottom:'28px', right:'36px', zIndex:100 }}>
        <button onClick={toggleSound}
          style={{
            background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)',
            borderRadius:'50%', width:'42px', height:'42px',
            display:'flex', alignItems:'center', justifyContent:'center',
            color:'#fff', cursor:'pointer', fontSize:'1.1rem',
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor='rgba(0,255,255,0.5)'}
          onMouseLeave={e => e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'}
        >
          {isMuted ? <FaVolumeMute/> : <FaVolumeUp/>}
        </button>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2 }}
        style={{
          position:'absolute', bottom:'28px', left:'50%', transform:'translateX(-50%)',
          display:'flex', flexDirection:'column', alignItems:'center', gap:'5px',
          zIndex:20, pointerEvents:'none',
        }}
      >
        <span style={{ fontFamily:'var(--font-body)', fontSize:'0.55rem', letterSpacing:'2px', color:'rgba(255,255,255,0.3)', textTransform:'uppercase' }}>
          Scroll to Explore
        </span>
        <motion.div animate={{ y:[0,7,0] }} transition={{ duration:1.5, repeat:Infinity, ease:'easeInOut' }}
          style={{ color:'rgba(0,255,255,0.45)', fontSize:'0.9rem', display:'flex', alignItems:'center', justifyContent:'center' }}
        >
          <FaChevronDown/>
        </motion.div>
      </motion.div>

    </section>
  );
};

export default Hero;
