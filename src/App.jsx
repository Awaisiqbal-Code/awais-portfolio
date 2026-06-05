import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import CinematicIntro from './components/CinematicIntro';
import AvatarScene from './components/AvatarScene';
import AIOrb from './components/AIOrb';
import CursorEffect from './components/CursorEffect';
import ContactPortal from './components/ContactPortal';
import SmartHUD, {
  InfoModal, MemoryPopup, PhaseLabel,
  PHASES, SKILLS_DATA, PROJECTS_DATA, CERTS_DATA,
  getMemory, saveMemory,
} from './components/SmartHUD';

import avatarImg from './assets/avatar.jpg';
import './styles/global.css';

gsap.registerPlugin(ScrollTrigger);

// Total scroll height = 6 phases × 100vh each
const TOTAL_PHASES = 6;
const SCROLL_HEIGHT = `${TOTAL_PHASES * 100}vh`;

// Living Memory contextual messages
const MEMORY_MESSAGES = {
  react:   '⚛️ System detected: React Ecosystem explored. Awais has hands-on experience with R3F and Framer Motion.',
  nextjs:  '▲ System detected: Next.js expertise. SSR and edge deployments are in Awais\'s arsenal.',
  node:    '🟢 System detected: Node.js background. REST APIs and real-time sockets are familiar territory.',
  python:  '🐍 System detected: Python affinity noted. Data science and automation pipelines explored.',
  ai:      '🧠 System detected: AI/ML interest confirmed. You seem to value intelligent product experiences.',
  proj_portfolio:   '🌍 You explored the Portfolio Civilization — the very world you\'re standing in.',
  proj_ecommerce:   '🏪 E-Commerce expertise detected. Awais builds production-grade online platforms.',
  proj_ai_assistant:'🤖 AI Product interest confirmed. Awais integrates LLMs into practical tools.',
  proj_networking:  '📡 Networking background noted. Cisco-certified with real lab experience.',
};

function App() {
  const [introActive, setIntroActive] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activePhase, setActivePhase] = useState(PHASES[0]);
  const [devMode, setDevMode] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [matrixActive, setMatrixActive] = useState(false);

  // Info modal state
  const [modal, setModal] = useState(null); // { type: 'skill'|'project'|'cert', data }

  // Living Memory popup
  const [memoryMsg, setMemoryMsg] = useState(null);
  const memoryTimeout = useRef(null);

  const konamiIndexRef = useRef(0);
  const konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  const lenisRef = useRef(null);

  // ── Living Memory System ──
  const triggerMemory = useCallback((key) => {
    if (!MEMORY_MESSAGES[key]) return;
    const mem = getMemory();
    if (mem[key]) {
      // Show "you've been here before" message
      showMemoryMsg(`You've explored "${key.replace('_', ' ')}" before. ${MEMORY_MESSAGES[key]}`);
    } else {
      saveMemory(key, Date.now());
      showMemoryMsg(MEMORY_MESSAGES[key]);
    }
  }, []);

  const showMemoryMsg = (msg) => {
    clearTimeout(memoryTimeout.current);
    setMemoryMsg(msg);
    memoryTimeout.current = setTimeout(() => setMemoryMsg(null), 6000);
  };

  // Show returning visitor message once on load
  useEffect(() => {
    const mem = getMemory();
    const visitCount = mem.__visits || 0;
    saveMemory('__visits', visitCount + 1);
    if (visitCount > 0 && !introActive) {
      setTimeout(() => {
        showMemoryMsg(`Welcome back, explorer. Your civilization remembers you — ${visitCount} previous visit${visitCount > 1 ? 's' : ''} logged.`);
      }, 2500);
    }
  }, [introActive]);

  // ── Scroll tracker ──
  useEffect(() => {
    if (introActive) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      syncTouch: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const handleScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      if (max <= 0) return;
      const prog = Math.min(1, Math.max(0, el.scrollTop / max));
      setScrollProgress(prog);

      // Determine active phase
      const phase = PHASES.find(p => prog >= p.range[0] && prog < p.range[1]) || PHASES[PHASES.length - 1];
      setActivePhase(phase);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [introActive]);

  // ── Konami Code ──
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;
      if (key.toLowerCase() === konamiCode[konamiIndexRef.current].toLowerCase()) {
        konamiIndexRef.current += 1;
        if (konamiIndexRef.current === konamiCode.length) {
          triggerMatrixMode();
          konamiIndexRef.current = 0;
        }
      } else {
        konamiIndexRef.current = 0;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerMatrixMode = () => {
    setMatrixActive(true);
    setDevMode(true);
    setTimeout(() => setMatrixActive(false), 3000);
  };

  const handleAvatarClick = () => {
    setClicks(prev => {
      const next = prev + 1;
      if (next >= 5) { triggerMatrixMode(); return 0; }
      return next;
    });
  };

  // ── HUD Nav: jump to a phase ──
  const handleHUDNav = useCallback((targetProgress) => {
    const el = document.documentElement;
    const max = el.scrollHeight - el.clientHeight;
    const targetY = targetProgress * max;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetY, { duration: 1.8, easing: (t) => t < 0.5 ? 4*t*t*t : 1-Math.pow(-2*t+2,3)/2 });
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  }, []);

  // ── 3D Click Handlers ──
  const handleSkillClick = useCallback((key) => {
    const data = SKILLS_DATA[key];
    if (!data) return;
    setModal({ type: 'skill', data });
    triggerMemory(key);
  }, [triggerMemory]);

  const handleProjectClick = useCallback((key) => {
    const data = PROJECTS_DATA.find(p => p.id === key);
    if (!data) return;
    setModal({ type: 'project', data });
    triggerMemory(key);
  }, [triggerMemory]);

  const handleCertClick = useCallback((key) => {
    const data = CERTS_DATA.find(c => c.id === key);
    if (!data) return;
    setModal({ type: 'cert', data });
  }, []);

  const closeModal = useCallback(() => setModal(null), []);

  return (
    <div className="app-container">
      {/* CRT / Scanlines */}
      <div className="scanlines-overlay" />
      <div className="crt-flicker" />

      {/* Cursor glow */}
      <CursorEffect />

      <AnimatePresence>
        {introActive ? (
          <CinematicIntro onComplete={() => setIntroActive(false)} />
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>

            {/* ── Fixed 3D Canvas World ── */}
            <AvatarScene
              scrollProgress={scrollProgress}
              onSkillClick={handleSkillClick}
              onProjectClick={handleProjectClick}
              onCertClick={handleCertClick}
            />

            {/* ── AI Orb ── */}
            <AIOrb />

            {/* ── Smart HUD (right panel) ── */}
            <SmartHUD
              scrollProgress={scrollProgress}
              activePhase={activePhase}
              onNavClick={handleHUDNav}
            />

            {/* ── Phase Label (bottom right) ── */}
            <PhaseLabel scrollProgress={scrollProgress} activePhase={activePhase} />

            {/* ── Header Logo (top left) ── */}
            <div onClick={handleAvatarClick} className="header-logo-container">
              <div
                className="header-logo-avatar"
                style={{
                  border: devMode ? '2px solid var(--primary-glow)' : '2px solid rgba(0,255,255,0.35)',
                  boxShadow: devMode ? '0 0 12px var(--primary-glow)' : '0 0 6px rgba(0,255,255,0.15)',
                }}
              >
                <img src={avatarImg} alt="Awais Iqbal" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
              </div>
              <span
                className="header-logo-text"
                style={{ color: devMode ? 'var(--accent-gold)' : 'var(--primary-glow)' }}
              >
                {devMode ? 'SYS_DEV' : 'A.I.'}
              </span>
            </div>

            {/* ── Scroll spacer — creates the 6-phase scroll timeline ── */}
            <div style={{ height: SCROLL_HEIGHT, position: 'relative', zIndex: 2, pointerEvents: 'none' }}>

              {/* Origin text overlay — only in phase 0 */}
              <AnimatePresence>
                {activePhase?.key === 'origin' && (
                  <motion.div
                    className="origin-text-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2 }}
                    style={{ pointerEvents: 'none' }}
                  >
                    <div className="origin-tagline">Welcome to the</div>
                    <div className="origin-main-text">Digital Civilization</div>
                    <div className="origin-subtitle">Scroll to enter the world of Awais Iqbal</div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Contact Portal appears near the end of the scroll */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                zIndex: 10,
                pointerEvents: 'all',
              }}>
                <ContactPortal />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Info Modal ── */}
      <AnimatePresence>
        {modal && (
          <InfoModal type={modal.type} data={modal.data} onClose={closeModal} />
        )}
      </AnimatePresence>

      {/* ── Living Memory Popup ── */}
      <AnimatePresence>
        {memoryMsg && (
          <MemoryPopup message={memoryMsg} onClose={() => setMemoryMsg(null)} />
        )}
      </AnimatePresence>

      {/* ── Matrix Glitch Overlay ── */}
      <AnimatePresence>
        {matrixActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0, left: 0,
              width: '100%', height: '100%',
              backgroundColor: 'rgba(0,0,0,0.96)',
              zIndex: 9999999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary-glow)',
              fontFamily: 'monospace',
              fontSize: '1.2rem',
              letterSpacing: '2px',
            }}
          >
            <div style={{ animation: 'float 2s infinite ease-in-out' }}>
              === CIVILIZATION CORE DECRYPTED ===
            </div>
            <div style={{ fontSize: '0.8rem', opacity: 0.5, marginTop: '20px' }}>
              ARCHITECT MODE UNLOCKED — WELCOME, AWAIS
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
