import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaPhp, FaPython, FaJs, FaHtml5, FaCss3Alt, FaGitAlt, FaSearch, FaPaintBrush, FaFigma, FaNodeJs } from 'react-icons/fa';
import { SiVite, SiGreensock } from 'react-icons/si';

const BrainSkills = () => {
  const [activeSkill, setActiveSkill] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const skills = [
    { name: 'PHP', level: '85%', icon: <FaPhp />, desc: 'Backend development, custom CMS architectures, and REST APIs.', color: '#8892BF', x: 20, y: 20, mx: 15, my: 15 },
    { name: 'Python', level: '80%', icon: <FaPython />, desc: 'Scripting, backend automation, and data analytics tools.', color: '#3776AB', x: 75, y: 22, mx: 85, my: 15 },
    { name: 'JavaScript', level: '90%', icon: <FaJs />, desc: 'Modern ES6+ frontend architectures, dynamic components, and R3F systems.', color: '#F7DF1E', x: 42, y: 38, mx: 50, my: 50 },
    { name: 'HTML5', level: '95%', icon: <FaHtml5 />, desc: 'Semantic layout, accessibility structures, and responsive canvas integrations.', color: '#E34F26', x: 18, y: 56, mx: 15, my: 50 },
    { name: 'CSS3', level: '90%', icon: <FaCss3Alt />, desc: 'Futuristic layout engines, custom variables, keyframe animations, and styling modules.', color: '#1572B6', x: 82, y: 58, mx: 85, my: 50 },
    { name: 'GSAP', level: '85%', icon: <SiGreensock />, desc: 'High-performance web motion pipelines, ScrollTrigger sequences, and timelines.', color: '#88CE02', x: 30, y: 74, mx: 15, my: 85 },
    { name: 'Vite', level: '80%', icon: <SiVite />, desc: 'Blazing fast bundle optimization, asset pipelines, and fast reload servers.', color: '#646CFF', x: 68, y: 76, mx: 85, my: 85 },
    { name: 'SEO Growth', level: '85%', icon: <FaSearch />, desc: 'Metadata structures, semantic layouts, performance improvements, and site maps.', color: '#FF3366', x: 48, y: 84, mx: 50, my: 85 },
    { name: 'UI/UX Design', level: '80%', icon: <FaFigma />, desc: 'Modern layout frameworks, custom glassmorphism design layouts, and color schemas.', color: '#a259ff', x: 50, y: 12, mx: 50, my: 15 }
  ];

  const handleSkillTap = (skill) => {
    if (activeSkill?.name === skill.name) {
      setActiveSkill(null);
    } else {
      setActiveSkill(skill);
    }
  };

  /* ===================== MOBILE LAYOUT ===================== */
  if (isMobile) {
    return (
      <section id="skills" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 1rem', alignItems: 'stretch' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--primary-glow)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 'bold' }}>
            // NEURAL CONNECTIONS
          </span>
          <h2 className="section-title" style={{ margin: '10px 0', fontSize: '1.6rem' }}>SKILL GALAXY</h2>
          <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-title)', color: 'var(--primary-glow)', textShadow: '0 0 6px rgba(0,255,255,0.3)', pointerEvents: 'none', animation: 'pulse-glow 2s infinite', letterSpacing: '1px', fontWeight: 'bold', marginTop: '5px' }}>
            [ TAP NODES TO INTERACT ]
          </div>
        </div>

        {/* Full Interactive Galaxy with ALL 9 skills */}
        <div
          style={{
            width: '100%',
            height: '380px',
            background: 'rgba(5, 8, 22, 0.5)',
            border: '1px solid var(--card-border)',
            borderRadius: '20px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'inset 0 0 20px rgba(123,97,255,0.1)',
            marginBottom: '16px',
          }}
        >
          {/* Cyberpunk grid lines in background */}
          <div
            style={{
              position: 'absolute',
              top: 0, left: 0,
              width: '100%', height: '100%',
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
              pointerEvents: 'none',
            }}
          />

          {/* Brain Core Glow */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60px', height: '60px', borderRadius: '50%', background: 'radial-gradient(circle, var(--secondary-glow) 0%, transparent 70%)', filter: 'blur(6px)', opacity: 0.6, zIndex: 1 }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '14px', height: '14px', borderRadius: '50%', background: 'var(--primary-glow)', boxShadow: '0 0 15px var(--primary-glow)', zIndex: 2 }} />

          {/* SVG Neural Lines — ALL 9 skills */}
          <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 0 }}>
            {skills.map((skill, index) => (
              <line
                key={index}
                x1="50%" y1="50%"
                x2={`${skill.mx}%`} y2={`${skill.my}%`}
                stroke={activeSkill?.name === skill.name ? 'var(--primary-glow)' : 'rgba(123, 97, 255, 0.12)'}
                strokeWidth={activeSkill?.name === skill.name ? '2' : '1'}
                strokeDasharray={activeSkill?.name === skill.name ? '5,5' : 'none'}
                style={{
                  transition: 'all 0.3s ease',
                  animation: activeSkill?.name === skill.name ? 'dash 10s infinite linear' : 'none'
                }}
              />
            ))}
          </svg>

          {/* ALL 9 Mobile Skill Nodes */}
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              onClick={() => handleSkillTap(skill)}
              style={{
                position: 'absolute',
                left: `${skill.mx}%`,
                top: `${skill.my}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: 3,
                cursor: 'pointer',
              }}
              whileTap={{ scale: 0.9 }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(5, 8, 22, 0.85)',
                  border: `2px solid ${activeSkill?.name === skill.name ? 'var(--primary-glow)' : skill.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: activeSkill?.name === skill.name ? 'var(--primary-glow)' : '#fff',
                  fontSize: '1rem',
                  boxShadow: activeSkill?.name === skill.name ? `0 0 18px ${skill.color}` : `0 0 8px rgba(0,0,0,0.4)`,
                  transition: 'all 0.3s ease',
                }}
              >
                {skill.icon}
              </div>
              <div style={{ position: 'absolute', top: '42px', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', fontSize: '0.55rem', fontFamily: 'var(--font-title)', color: activeSkill?.name === skill.name ? 'var(--primary-glow)' : 'rgba(255,255,255,0.6)', fontWeight: 'bold', background: 'rgba(5,8,22,0.7)', padding: '1px 4px', borderRadius: '3px' }}>
                {skill.name}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Skill Detail Card (appears on tap below galaxy) */}
        <AnimatePresence>
          {activeSkill && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              style={{
                background: 'rgba(5, 8, 22, 0.7)',
                border: `1px solid ${activeSkill.color}40`,
                borderRadius: '16px',
                padding: '16px',
                marginBottom: '16px',
                overflow: 'hidden',
                boxShadow: `0 0 15px ${activeSkill.color}15`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ fontSize: '2rem', color: activeSkill.color }}>{activeSkill.icon}</div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.2rem', color: '#fff', margin: 0 }}>{activeSkill.name}</h3>
                  <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Skill Node</span>
                </div>
              </div>
              {/* Progress bar */}
              <div style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontFamily: 'var(--font-title)', fontSize: '0.75rem' }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)' }}>LEVEL</span>
                  <span style={{ color: 'var(--primary-glow)' }}>{activeSkill.level}</span>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: activeSkill.level }}
                    transition={{ duration: 0.4 }}
                    style={{ height: '100%', background: `linear-gradient(90deg, ${activeSkill.color}, var(--primary-glow))` }}
                  />
                </div>
              </div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5', fontSize: '0.85rem', margin: 0 }}>{activeSkill.desc}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <style>{`
          @keyframes dash { to { stroke-dashoffset: -100; } }
        `}</style>
      </section>
    );
  }

  /* ===================== DESKTOP LAYOUT ===================== */
  return (
    <section id="skills" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span style={{ fontSize: '0.9rem', color: 'var(--primary-glow)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 'bold' }}>
          // NEURAL CONNECTIONS
        </span>
        <h2 className="section-title" style={{ margin: '10px 0' }}>SKILL GALAXY</h2>
        <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-title)', color: 'var(--primary-glow)', textShadow: '0 0 8px rgba(0, 255, 255, 0.4)', animation: 'pulse-glow 2s infinite', letterSpacing: '1.5px', fontWeight: 'bold', marginTop: '10px' }}>
          [ HOVER OR TAP NODES TO INTERACT ]
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: '40px',
          width: '100%',
          alignItems: 'center',
        }}
        className="skills-grid"
      >
        {/* Left: Starfield Skill Map */}
        <div
          style={{
            height: '420px',
            background: 'rgba(5, 8, 22, 0.5)',
            border: '1px solid var(--card-border)',
            borderRadius: '24px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'inset 0 0 30px rgba(123,97,255,0.1)',
          }}
        >
          {/* Cyberpunk grid lines in background */}
          <div
            style={{
              position: 'absolute',
              top: 0, left: 0,
              width: '100%', height: '100%',
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              pointerEvents: 'none',
            }}
          />

          {/* Glowing central node (Brain core) */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80px', height: '80px', borderRadius: '50%', background: 'radial-gradient(circle, var(--secondary-glow) 0%, transparent 70%)', filter: 'blur(8px)', opacity: 0.7, zIndex: 1 }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '20px', height: '20px', borderRadius: '50%', background: 'var(--primary-glow)', boxShadow: '0 0 20px var(--primary-glow)', zIndex: 2 }} />

          {/* SVG Neural lines */}
          <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
            {skills.map((skill, index) => (
              <line
                key={index}
                x1="50%" y1="50%"
                x2={`${skill.x}%`} y2={`${skill.y}%`}
                stroke={activeSkill?.name === skill.name ? 'var(--primary-glow)' : 'rgba(123, 97, 255, 0.15)'}
                strokeWidth={activeSkill?.name === skill.name ? '2' : '1'}
                strokeDasharray={activeSkill?.name === skill.name ? '5,5' : 'none'}
                style={{
                  transition: 'all 0.3s ease',
                  animation: activeSkill?.name === skill.name ? 'dash 10s infinite linear' : 'none'
                }}
              />
            ))}
          </svg>

          {/* Skill Planets */}
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="interactive"
              onMouseEnter={() => setActiveSkill(skill)}
              onMouseLeave={() => setActiveSkill(null)}
              onClick={() => handleSkillTap(skill)}
              style={{
                position: 'absolute',
                left: `${skill.x}%`,
                top: `${skill.y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: 3,
                cursor: 'pointer',
              }}
              whileHover={{ scale: 1.2 }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(5, 8, 22, 0.8)',
                  border: `2px solid ${activeSkill?.name === skill.name ? 'var(--primary-glow)' : skill.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: activeSkill?.name === skill.name ? 'var(--primary-glow)' : '#fff',
                  fontSize: '1.5rem',
                  boxShadow: activeSkill?.name === skill.name
                    ? `0 0 20px ${skill.color}`
                    : `0 0 10px rgba(0,0,0,0.5)`,
                  transition: 'all 0.3s ease',
                }}
              >
                {skill.icon}
              </div>
              <div
                style={{
                  position: 'absolute',
                  top: '55px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  whiteSpace: 'nowrap',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-title)',
                  color: activeSkill?.name === skill.name ? 'var(--primary-glow)' : 'rgba(255,255,255,0.7)',
                  fontWeight: 'bold',
                  background: 'rgba(5, 8, 22, 0.7)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                }}
              >
                {skill.name}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right: Detailed Card */}
        <div className="glass-panel purple-glow" style={{ height: '420px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {activeSkill ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ fontSize: '3rem', color: activeSkill.color }}>
                  {activeSkill.icon}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.8rem', color: '#fff' }}>
                    {activeSkill.name}
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
                    Skill Proficiency Node
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontFamily: 'var(--font-title)', fontSize: '0.9rem' }}>
                  <span>ALIGNMENT LEVEL</span>
                  <span style={{ color: 'var(--primary-glow)' }}>{activeSkill.level}</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: activeSkill.level }}
                    transition={{ duration: 0.5 }}
                    style={{ height: '100%', background: `linear-gradient(90deg, ${activeSkill.color}, var(--primary-glow))` }}
                  />
                </div>
              </div>

              {/* Description */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
                  Functionality Description
                </span>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                  {activeSkill.desc}
                </p>
              </div>

              {/* Status */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
                <span>NODE PATHWAY: ACTIVE</span>
                <span>STATUS: OPERATIONAL</span>
              </div>
            </motion.div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', gap: '15px' }}>
              <div style={{ fontSize: '3rem', color: 'rgba(255, 255, 255, 0.05)', animation: 'float 3s infinite ease-in-out' }}>
                🧠
              </div>
              <h3 style={{ fontFamily: 'var(--font-title)', color: 'rgba(255,255,255,0.6)' }}>
                NEURAL OVERVIEW
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', maxWidth: '300px' }}>
                Hover over any skill node in the starfield map to scan its database profile, connection details, and efficiency ratings.
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes dash { to { stroke-dashoffset: -100; } }
      `}</style>
    </section>
  );
};

export default BrainSkills;
