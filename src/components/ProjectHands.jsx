import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaExternalLinkAlt, FaGithub, FaCheckCircle } from 'react-icons/fa';

const ProjectHands = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'Premium Real Estate Platform',
      role: 'Full-Stack Developer & SEO Lead',
      desc: 'A premium property listing and rental platform featuring immersive design aesthetics, customized database filters, and high-performance load speeds.',
      features: [
        'Advanced SEO optimization (structured schema, meta configurations)',
        'Fully responsive glassmorphism client UI',
        'Blazing-fast loading speeds (Vite + optimized CDN images)',
        'Secure dashboard panels with custom filters'
      ],
      tech: ['React', 'PHP', 'MySQL', 'GSAP', 'CSS Variables'],
      demoLink: '#',
      githubLink: '#'
    },
    {
      id: 2,
      title: 'AI Smart Automation Portal',
      role: 'Backend Developer',
      desc: 'An automated dashboard that interacts with custom scripting engines to run diagnostics and schedule server maintenance tasks dynamically.',
      features: [
        'Secure token-based API routing',
        'Automatic email/SMS warning triggers',
        'Real-time task scheduling grids',
        'Lightweight database migrations'
      ],
      tech: ['Python', 'Django', 'SQLite', 'Tailwind', 'Docker'],
      demoLink: '#',
      githubLink: '#'
    }
  ];

  const handleMouseMove = (e, index) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Convert to rotate degree angles
    const rotateX = -(y / (box.height / 2)) * 12;
    const rotateY = (x / (box.width / 2)) * 12;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  React.useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [selectedProject]);

  return (
    <section id="projects" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: selectedProject ? 99999 : 2 }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span style={{ fontSize: '0.9rem', color: 'var(--primary-glow)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 'bold' }}>
          // CREATIONS & ARCHITECTURE
        </span>
        <h2 className="section-title" style={{ margin: '10px 0' }}>PROJECT HANDS</h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '40px',
          width: '100%',
        }}
        className="projects-grid"
      >
        {projects.map((proj, idx) => (
          <div
            key={proj.id}
            className="glass-panel interactive"
            onMouseMove={(e) => handleMouseMove(e, idx)}
            onMouseLeave={handleMouseLeave}
            onClick={() => setSelectedProject(proj)}
            style={{
              cursor: 'pointer',
              transition: 'transform 0.1s ease, border-color 0.3s, box-shadow 0.3s',
              transformStyle: 'preserve-3d',
              padding: '30px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '380px',
            }}
          >
            <div>
              {/* Project ID Tag */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span style={{ fontFamily: 'var(--font-title)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)' }}>
                  PROJECT // 0{proj.id}
                </span>
                <span
                  style={{
                    backgroundColor: 'rgba(0, 255, 255, 0.05)',
                    border: '1px solid rgba(0, 255, 255, 0.15)',
                    borderRadius: '12px',
                    padding: '4px 10px',
                    fontSize: '0.75rem',
                    color: 'var(--primary-glow)',
                    fontFamily: 'var(--font-title)',
                  }}
                >
                  ACTIVE
                </span>
              </div>

              {/* Title */}
              <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.6rem', color: '#fff', marginBottom: '10px' }}>
                {proj.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '25px' }}>
                {proj.desc}
              </p>
            </div>

            <div>
              {/* Tech Badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '25px' }}>
                {proj.tech.map((t, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      color: 'rgba(255,255,255,0.7)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Details link cue */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--primary-glow)', fontSize: '0.85rem', fontFamily: 'var(--font-title)', fontWeight: 'bold' }}>
                <span>SCAN MATRIX INFO</span>
                <FaExternalLinkAlt />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(5, 8, 22, 0.85)',
              backdropFilter: 'blur(10px)',
              zIndex: 999999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-panel"
              style={{
                maxWidth: '650px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'relative',
                border: '1px solid rgba(0, 255, 255, 0.2)',
                boxShadow: '0 0 40px rgba(0,255,255,0.2)',
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                }}
              >
                &times;
              </button>

              <span style={{ fontSize: '0.8rem', color: 'var(--primary-glow)', letterSpacing: '2px', fontFamily: 'var(--font-title)' }}>
                // ARCHIVE DETAILED PROFILE
              </span>
              <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '2rem', color: '#fff', margin: '10px 0 5px 0' }}>
                {selectedProject.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--secondary-glow)', marginBottom: '20px' }}>
                Role: {selectedProject.role}
              </p>

              <div style={{ marginBottom: '25px' }}>
                <h4 style={{ fontFamily: 'var(--font-title)', fontSize: '1rem', color: '#fff', marginBottom: '10px' }}>
                  DESCRIPTION
                </h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                  {selectedProject.desc}
                </p>
              </div>

              <div style={{ marginBottom: '30px' }}>
                <h4 style={{ fontFamily: 'var(--font-title)', fontSize: '1rem', color: '#fff', marginBottom: '12px' }}>
                  KEY SPECIFICATIONS
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {selectedProject.features.map((feature, i) => (
                    <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <FaCheckCircle style={{ color: 'var(--primary-glow)', marginTop: '4px', flexShrink: 0 }} />
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.4' }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '15px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px' }}>
                <a
                  href={selectedProject.demoLink}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    background: 'linear-gradient(90deg, var(--secondary-glow), var(--primary-glow))',
                    color: '#fff',
                    padding: '12px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    fontFamily: 'var(--font-title)',
                    fontSize: '0.9rem',
                  }}
                >
                  LIVE EXPERIENCE
                </a>
                <a
                  href={selectedProject.githubLink}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#fff',
                    padding: '12px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    fontFamily: 'var(--font-title)',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                  }}
                >
                  <FaGithub /> SOURCE REPO
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectHands;
