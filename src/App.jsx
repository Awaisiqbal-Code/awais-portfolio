import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import CinematicIntro from './components/CinematicIntro';
import AvatarScene from './components/AvatarScene';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import BrainSkills from './components/BrainSkills';
import ProjectHands from './components/ProjectHands';
import ExperienceTimeline from './components/ExperienceTimeline';
import CertificateVault from './components/CertificateVault';
import AwardChamber from './components/AwardChamber';
import Education from './components/Education';
import DigitalDNA from './components/DigitalDNA';
import ContactPortal from './components/ContactPortal';
import AIOrb from './components/AIOrb';
import CursorEffect from './components/CursorEffect';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

import avatarImg from './assets/avatar.jpg';

// Styles
import './styles/global.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [introActive, setIntroActive] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [devMode, setDevMode] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [matrixActive, setMatrixActive] = useState(false);
  const konamiIndexRef = useRef(0);

  // Konami Code sequence: ↑ ↑ ↓ ↓ ← → ← → B A
  const konamiCode = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'b', 'a'
  ];

  // Initialize Lenis Scroll & GSAP update hooks
  useEffect(() => {
    if (introActive) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      syncTouch: true
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, [introActive]);

  // Konami code event listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;
      const expectedKey = konamiCode[konamiIndexRef.current];

      if (key.toLowerCase() === expectedKey.toLowerCase()) {
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
    setTimeout(() => {
      setMatrixActive(false);
    }, 3000);
  };

  // 5 Click Developer Mode Trigger
  const handleAvatarClick = () => {
    setClicks((prev) => {
      const next = prev + 1;
      if (next >= 5) {
        setDevMode((d) => !d);
        triggerMatrixMode();
        return 0;
      }
      return next;
    });
  };

  return (
    <div className={`app-container ${devMode ? 'dev-mode-active' : ''}`}>
      {/* Background CRT & Scanline Effects */}
      <div className="scanlines-overlay" />
      <div className="crt-flicker" />

      {/* Floating Cursor Neon Effect */}
      <CursorEffect />

      <AnimatePresence>
        {introActive ? (
          <CinematicIntro onComplete={() => setIntroActive(false)} />
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
            {/* 3D R3F Background WebGL Layer */}
            <AvatarScene />

            {/* AI Assist Assistant Orb */}
            <AIOrb />

            {/* Main scroll layout content overlay */}
            <div style={{ position: 'relative', zIndex: 10 }}>
              {/* Top Navigation Bar with Logo */}
              <Navbar 
                devMode={devMode} 
                handleAvatarClick={handleAvatarClick} 
                avatarImg={avatarImg} 
              />

              {/* Sections */}
              <Hero 
                onExplore={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })} 
                isMuted={isMuted}
                toggleSound={() => setIsMuted(!isMuted)}
              />
              
              <AboutSection />
              
              <BrainSkills />
              
              <ProjectHands />
              
              <ExperienceTimeline />
              
              <CertificateVault />
              
              <AwardChamber />
              
              <Education />
              
              <DigitalDNA />
              
              <ContactPortal />

              <Footer />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Secret Matrix glitch transition */}
      <AnimatePresence>
        {matrixActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.95)',
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
              === CYBER MATRIX DECRYPTED ===
            </div>
            <div style={{ fontSize: '0.8rem', opacity: 0.5, marginTop: '20px' }}>
              INITIALIZING DEVEL_OVERRIDE_SHELL...
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
