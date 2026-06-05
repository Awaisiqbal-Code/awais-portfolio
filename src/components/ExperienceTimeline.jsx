import React from 'react';

const ExperienceTimeline = () => {
  const experiences = [
    {
      year: '2024',
      title: 'Initiation & Exploration',
      desc: 'Discovered the programming landscape. Explored fundamental computer science, Python logic matrices, basic networking models, and web styling protocols.',
      highlights: ['Python Essentials 1 & 2', 'Introduced to Cyber Security models', 'Foundations of HTML5/CSS3 coding']
    },
    {
      year: '2025',
      title: 'Freelance Architectures',
      desc: 'Moved to practical implementations. Began creating responsive client sites, SEO optimizing platforms, custom backend code in PHP, and digital marketing strategies.',
      highlights: ['Delivered client platforms', 'Sir Zain Ali mentoring (NextGen digital university)', 'Established social marketing foundations']
    },
    {
      year: '2026',
      title: 'Advanced Interactive Systems',
      desc: 'Current stage of growth. Immersive 3D development with Three.js, React Three Fiber pipelines, GSAP scroll dynamics, and production-level system deployments.',
      highlights: ['Developed Living Developer Museum', 'Integrated FBO particles & GLSL shaders', 'Full-stack automation portals']
    }
  ];

  return (
    <section id="experience" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span style={{ fontSize: '0.9rem', color: 'var(--primary-glow)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 'bold' }}>
          // TIME MATRIX PROGRESSION
        </span>
        <h2 className="section-title" style={{ margin: '10px 0' }}>EXPERIENCE TIMELINE</h2>
      </div>

      <div
        style={{
          position: 'relative',
          maxWidth: '800px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        {/* Central Vertical Connector Line */}
        <div
          style={{
            position: 'absolute',
            left: '30px',
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'linear-gradient(to bottom, var(--secondary-glow), var(--primary-glow), transparent)',
            boxShadow: '0 0 8px var(--primary-glow)',
          }}
          className="timeline-line"
        />

        {/* Milestones */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
          {experiences.map((exp, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                gap: '30px',
                position: 'relative',
              }}
              className="timeline-item"
            >
              {/* Year Dot Indicator */}
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-color)',
                  border: '2px solid var(--primary-glow)',
                  boxShadow: '0 0 15px var(--primary-glow)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-title)',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  color: 'var(--primary-glow)',
                  zIndex: 2,
                  flexShrink: 0,
                }}
              >
                {exp.year}
              </div>

              {/* Information Panel */}
              <div
                className="glass-panel"
                style={{
                  flex: 1,
                  padding: '25px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--card-border)',
                }}
              >
                <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.3rem', color: '#fff', marginBottom: '8px' }}>
                  {exp.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '20px' }}>
                  {exp.desc}
                </p>

                {/* Bullets */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {exp.highlights.map((h, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '0.75rem',
                        background: 'rgba(123, 97, 255, 0.05)',
                        border: '1px solid rgba(123, 97, 255, 0.2)',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        color: 'var(--secondary-glow)',
                        fontWeight: 'bold',
                      }}
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;
