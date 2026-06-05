import React from 'react';
import { FaSchool, FaBookReader, FaMapMarkerAlt } from 'react-icons/fa';

const Education = () => {
  return (
    <section id="education" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span style={{ fontSize: '0.9rem', color: 'var(--primary-glow)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 'bold' }}>
          // ACADEMIC DATA MODULES
        </span>
        <h2 className="section-title" style={{ margin: '10px 0' }}>EDUCATION</h2>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <div
          className="glass-panel"
          style={{
            maxWidth: '650px',
            width: '100%',
            padding: '40px',
            position: 'relative',
            background: 'rgba(5, 8, 22, 0.7)',
            border: '1px solid rgba(0, 255, 255, 0.1)',
            borderRadius: '24px',
            overflow: 'hidden',
          }}
        >
          {/* Cyber decoration lines */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'linear-gradient(to bottom, var(--primary-glow), transparent)' }} />
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(0, 255, 255, 0.05)',
                  border: '1px solid rgba(0, 255, 255, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary-glow)',
                  fontSize: '1.8rem',
                  boxShadow: '0 0 15px rgba(0,255,255,0.1)',
                }}
              >
                <FaSchool />
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.6rem', color: '#fff' }}>
                  Aybia Public School
                </h3>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                  <FaMapMarkerAlt /> Lahore, Pakistan
                </span>
              </div>
            </div>

            {/* Core details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>ACADEMIC LEVEL</span>
                <span style={{ fontWeight: 'bold', color: '#fff' }}>Matriculation</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>STATUS</span>
                <span
                  style={{
                    backgroundColor: 'rgba(0, 255, 255, 0.05)',
                    border: '1px solid var(--primary-glow)',
                    borderRadius: '12px',
                    padding: '2px 10px',
                    fontSize: '0.75rem',
                    color: 'var(--primary-glow)',
                    fontWeight: 'bold',
                  }}
                >
                  ONGOING
                </span>
              </div>
            </div>

            {/* Academic summary */}
            <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start', background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <FaBookReader style={{ color: 'var(--secondary-glow)', fontSize: '1.4rem', marginTop: '3px', flexShrink: 0 }} />
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Actively pursuing Matriculation studies while balancing rigorous academic curriculums with advanced self-guided training modules in software engineering, computational thinking, and digital systems growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
