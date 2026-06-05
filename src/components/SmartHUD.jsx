import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';

// Living Memory System helpers
const MEMORY_KEY = 'awais_portfolio_memory';

const getMemory = () => {
  try { return JSON.parse(localStorage.getItem(MEMORY_KEY) || '{}'); }
  catch { return {}; }
};

const saveMemory = (key, value) => {
  const mem = getMemory();
  mem[key] = value;
  localStorage.setItem(MEMORY_KEY, JSON.stringify(mem));
};

// Phase data for the civilization world
const PHASES = [
  { id: 0, key: 'origin',       label: 'THE ORIGIN',         range: [0.00, 0.14] },
  { id: 1, key: 'creation',     label: 'THE CREATION',        range: [0.14, 0.30] },
  { id: 2, key: 'forest',       label: 'KNOWLEDGE FOREST',    range: [0.30, 0.52] },
  { id: 3, key: 'city',         label: 'INNOVATION CITY',     range: [0.52, 0.72] },
  { id: 4, key: 'hall',         label: 'HALL OF ACHIEVEMENTS', range: [0.72, 0.88] },
  { id: 5, key: 'final',        label: 'THE FINAL SCENE',     range: [0.88, 1.00] },
];

// Skills data for the Knowledge Forest
const SKILLS_DATA = {
  react:   { name: 'React',   icon: '⚛️', level: 85, desc: 'Building component-driven, reactive UIs with hooks, state management, and the React Three Fiber 3D ecosystem.', tags: ['JSX', 'Hooks', 'R3F', 'Framer Motion'] },
  nextjs:  { name: 'Next.js', icon: '▲',  level: 75, desc: 'Full-stack React framework for SSR, SSG, API routes, and optimized production deployment on Vercel.', tags: ['SSR', 'SSG', 'API Routes', 'Vercel'] },
  node:    { name: 'Node.js', icon: '🟢', level: 70, desc: 'Server-side JavaScript for REST APIs, real-time socket servers, and backend service integrations.', tags: ['Express', 'REST API', 'WebSockets', 'JWT'] },
  python:  { name: 'Python',  icon: '🐍', level: 80, desc: 'Data processing, automation scripting, machine learning pipelines with NumPy, Pandas, and Scikit-learn.', tags: ['Scikit-learn', 'NumPy', 'Pandas', 'Automation'] },
  ai:      { name: 'AI / ML', icon: '🧠', level: 65, desc: 'Building intelligent features using OpenAI APIs, Langchain prompt engineering, and custom ML model fine-tuning.', tags: ['OpenAI API', 'LLM', 'Langchain', 'RAG'] },
};

// Projects data for the Innovation City
const PROJECTS_DATA = [
  {
    id: 'proj_portfolio',
    name: 'Digital Civilization Portfolio',
    icon: '🌍',
    type: 'Full-Stack Application',
    desc: 'The very world you are exploring right now. A scroll-driven 3D civilization built with React Three Fiber, GSAP, and Framer Motion.',
    problem: 'Standard portfolios fail to represent the depth of a developer. They are flat documents, not experiences.',
    architecture: 'Vite + React + R3F canvas with scroll-interpolated camera, a Living Memory System, and a persistent Smart HUD overlay.',
    result: 'A fully immersive digital world that recruiters remember long after closing the tab.',
    tags: ['R3F', 'GSAP', 'Vite', 'Three.js', 'Framer Motion'],
    color: '#00ffff',
  },
  {
    id: 'proj_ecommerce',
    name: 'E-Commerce Platform',
    icon: '🏪',
    type: 'Web Application',
    desc: 'A complete full-stack e-commerce platform with product management, payment integration, and an admin dashboard.',
    problem: 'Small businesses needed a professional, customizable online shop without high SaaS fees.',
    architecture: 'PHP backend with MySQL, vanilla CSS front-end, RESTful API design, and a secure admin panel.',
    result: 'Delivered 60% faster checkout flow compared to similar platforms. Integrated WhatsApp order alerts.',
    tags: ['PHP', 'MySQL', 'JavaScript', 'REST API'],
    color: '#7b61ff',
  },
  {
    id: 'proj_ai_assistant',
    name: 'AI Content Assistant',
    icon: '🤖',
    type: 'AI / Python Tool',
    desc: 'An AI-powered writing assistant that generates SEO-optimized content using prompt engineering with OpenAI API.',
    problem: 'Content teams spent 8+ hours per week generating first drafts of blog posts and social media content.',
    architecture: 'Python FastAPI backend, OpenAI GPT API with a Langchain prompt-chain pipeline, served on a React frontend.',
    result: 'Reduced content drafting time by 78%. Used by 3 active content teams.',
    tags: ['Python', 'OpenAI API', 'Langchain', 'FastAPI'],
    color: '#ffd700',
  },
  {
    id: 'proj_networking',
    name: 'Network Monitor Dashboard',
    icon: '📡',
    type: 'Networking / Systems',
    desc: 'A real-time network monitoring and alerting dashboard built during Cisco networking studies.',
    problem: 'Needed a live visualization tool to practice and demonstrate network topology and device status.',
    architecture: 'Python-based data collector, WebSocket feed to a React dashboard with live charts and alert thresholds.',
    result: 'Demonstrated at college lab session. Cisco IoT fundamentals certification received.',
    tags: ['Python', 'WebSockets', 'Cisco', 'React'],
    color: '#00ff88',
  },
];

// Certificates data for the Hall of Achievements
const CERTS_DATA = [
  { id: 'c1', name: 'Python Essentials 1',        issuer: 'Cisco NetAcad',      year: '2024', icon: '🐍', color: '#ffd700' },
  { id: 'c2', name: 'Python Essentials 2',        issuer: 'Cisco NetAcad',      year: '2024', icon: '🐍', color: '#ffd700' },
  { id: 'c3', name: 'IoT Fundamentals',           issuer: 'Cisco NetAcad',      year: '2024', icon: '📡', color: '#00ffff' },
  { id: 'c4', name: 'Cybersecurity Essentials',   issuer: 'Cisco NetAcad',      year: '2024', icon: '🔒', color: '#ff0055' },
  { id: 'c5', name: 'Network Technician (I)',      issuer: 'Cisco NetAcad',      year: '2024', icon: '🌐', color: '#7b61ff' },
  { id: 'c6', name: 'Network Technician (II)',     issuer: 'Cisco NetAcad',      year: '2024', icon: '🌐', color: '#7b61ff' },
  { id: 'c7', name: 'Digital Safety',             issuer: 'Cambridge',           year: '2024', icon: '🛡️', color: '#00ff88' },
  { id: 'c8', name: 'Social Media Marketing',     issuer: 'Google / Coursera',  year: '2024', icon: '📱', color: '#ff8800' },
  { id: 'c9', name: 'Compelling Reports & Charts', issuer: 'LinkedIn Learning',  year: '2024', icon: '📊', color: '#00ccff' },
  { id: 'c10', name: 'Digital Content Creation',  issuer: 'Cambridge',           year: '2024', icon: '🎨', color: '#ff66cc' },
];

// ── Info Modal Component ──
const InfoModal = ({ type, data, onClose }) => {
  if (!data) return null;

  return (
    <motion.div
      className="info-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="info-modal"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ type: 'spring', damping: 20 }}
        onClick={e => e.stopPropagation()}
      >
        <button className="info-modal-close" onClick={onClose}>✕</button>

        {type === 'skill' && (
          <>
            <div className="info-modal-badge">⚡ SKILL NODE — KNOWLEDGE FOREST</div>
            <div className="info-modal-title">{data.icon} {data.name}</div>
            <div className="info-modal-sub">{data.desc}</div>
            <div className="info-modal-section">
              <div className="info-modal-section-title">Proficiency Level</div>
              <div className="info-modal-skill-bar-wrap">
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'6px' }}>
                  <span style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.5)' }}>Expertise</span>
                  <span style={{ fontSize:'0.72rem', color:'var(--primary-glow)', fontFamily:'var(--font-title)' }}>{data.level}%</span>
                </div>
                <div className="info-modal-skill-bar-bg">
                  <motion.div
                    className="info-modal-skill-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${data.level}%` }}
                    transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>
            <div className="info-modal-section">
              <div className="info-modal-section-title">Technologies</div>
              <div className="info-modal-tags">
                {data.tags.map(t => <span key={t} className="info-modal-tag">{t}</span>)}
              </div>
            </div>
          </>
        )}

        {type === 'project' && (
          <>
            <div className="info-modal-badge" style={{ color: data.color }}>🏙️ PROJECT BUILDING — INNOVATION CITY</div>
            <div className="info-modal-title" style={{ color: data.color, textShadow: `0 0 20px ${data.color}66` }}>
              {data.icon} {data.name}
            </div>
            <div className="info-modal-sub">{data.desc}</div>
            <div className="info-modal-section">
              <div className="info-modal-section-title">The Problem</div>
              <div className="info-modal-section-body">{data.problem}</div>
            </div>
            <div className="info-modal-section">
              <div className="info-modal-section-title">Architecture</div>
              <div className="info-modal-section-body">{data.architecture}</div>
            </div>
            <div className="info-modal-section">
              <div className="info-modal-section-title">Result</div>
              <div className="info-modal-section-body" style={{ color: 'var(--accent-green)' }}>{data.result}</div>
            </div>
            <div className="info-modal-tags">
              {data.tags.map(t => <span key={t} className="info-modal-tag" style={{ borderColor: `${data.color}44`, color: data.color }}>{t}</span>)}
            </div>
          </>
        )}

        {type === 'cert' && (
          <>
            <div className="info-modal-badge" style={{ color: data.color }}>💎 ENERGY CRYSTAL — HALL OF ACHIEVEMENTS</div>
            <div className="info-modal-title" style={{ color: data.color, textShadow: `0 0 20px ${data.color}66`, fontSize:'1.4rem' }}>
              {data.icon} {data.name}
            </div>
            <div style={{ fontSize:'0.82rem', color:'var(--text-secondary)', marginBottom:'14px' }}>
              Issued by <strong style={{ color: 'white' }}>{data.issuer}</strong> · {data.year}
            </div>
            <div className="info-modal-section-body" style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.4)', fontStyle:'italic' }}>
              This certification represents a verified milestone in Awais's learning journey — part of the ever-growing Hall of Achievements.
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

// ── Smart HUD Component ──
const SmartHUD = ({ scrollProgress, activePhase, onNavClick }) => {
  const pct = Math.round(scrollProgress * 100);

  return (
    <div className="smart-hud">
      <div className="smart-hud-panel">
        <div className="hud-name">AWAIS IQBAL</div>
        <div className="hud-title">Full-Stack Architect · Developer</div>
        <div className="hud-phase">⬡ {activePhase?.label || 'THE ORIGIN'}</div>

        <div className="hud-stats">
          <div className="hud-stat-row">
            <span className="hud-stat-label">Projects Built</span>
            <span className="hud-stat-value">12+</span>
          </div>
          <div className="hud-stat-row">
            <span className="hud-stat-label">Certifications</span>
            <span className="hud-stat-value">10+</span>
          </div>
          <div className="hud-stat-row">
            <span className="hud-stat-label">Technologies</span>
            <span className="hud-stat-value">15+</span>
          </div>
          <div className="hud-stat-row">
            <span className="hud-stat-label">World Progress</span>
            <span className="hud-stat-value">{pct}%</span>
          </div>
        </div>

        <div className="hud-nav-links">
          {PHASES.map((p, i) => (
            <button
              key={p.key}
              className={`hud-nav-btn ${activePhase?.key === p.key ? 'active' : ''}`}
              onClick={() => onNavClick(p.range[0] + 0.01)}
            >
              {i === 0 ? '◎' : i === 1 ? '◈' : i === 2 ? '🌲' : i === 3 ? '🏙️' : i === 4 ? '💎' : '★'} {p.label}
            </button>
          ))}
        </div>

        <div className="hud-bottom-btns">
          <a
            href="mailto:hafizawaisiqbal40@gmail.com"
            className="hud-action-btn primary"
          >
            ✉ Contact
          </a>
          <a
            href="https://github.com/Awaisiqbal-Code"
            target="_blank"
            rel="noopener noreferrer"
            className="hud-action-btn secondary"
          >
            ⌥ GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

// ── Living Memory Popup ──
const MemoryPopup = ({ message, onClose }) => (
  <motion.div
    className="memory-popup"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ type: 'spring', damping: 18 }}
  >
    <div className="memory-popup-inner">
      <div className="memory-icon">🧠</div>
      <div className="memory-text">
        <div className="memory-label">LIVING MEMORY SYSTEM</div>
        <div className="memory-msg">{message}</div>
      </div>
      <button className="memory-close" onClick={onClose}>✕</button>
    </div>
  </motion.div>
);

// ── Phase Label (bottom-right) ──
const PhaseLabel = ({ scrollProgress, activePhase }) => (
  <div className="phase-label-overlay">
    <div className="phase-label-text">{activePhase?.label}</div>
    <div className="phase-scroll-progress">
      <div className="phase-scroll-fill" style={{ width: `${scrollProgress * 100}%` }} />
    </div>
  </div>
);

// ── Main SmartHUD export (all sub-components + data) ──
export default SmartHUD;
export {
  InfoModal, MemoryPopup, PhaseLabel,
  PHASES, SKILLS_DATA, PROJECTS_DATA, CERTS_DATA,
  getMemory, saveMemory,
};
