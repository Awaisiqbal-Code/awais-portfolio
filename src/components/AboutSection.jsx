import React from 'react';
import { motion } from 'motion/react';
import avatarImg from '../assets/avatar.jpg';

const AboutSection = () => {
  const stats = [
    { value: '12+', label: 'Projects Done' },
    { value: '10+', label: 'Certificates' },
    { value: '15+', label: 'Technologies' },
    { value: 'Matric', label: 'Education' }
  ];

  return (
    <section id="about" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: '50px',
          width: '100%',
          alignItems: 'center',
        }}
        className="about-grid"
      >
        {/* Left Side: Avatar Scanner Frame */}
        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', width: '100%' }}>
          <div
            style={{
              width: '100%',
              maxWidth: '320px',
              aspectRatio: '1/1',
              borderRadius: '24px',
              padding: '8px',
              border: '2px dashed var(--primary-glow)',
              boxShadow: '0 0 25px rgba(0, 255, 255, 0.2)',
              position: 'relative',
              overflow: 'hidden',
              background: 'rgba(5, 8, 22, 0.6)',
            }}
          >
            {/* Hologram Scanner Line */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '4px',
                background: 'linear-gradient(90deg, transparent, var(--primary-glow), transparent)',
                boxShadow: '0 0 15px var(--primary-glow)',
                animation: 'scanLine 3s infinite linear',
                zIndex: 3,
              }}
            />

            {/* Avatar Image */}
            <img
              src={avatarImg}
              alt="Awais Iqbal"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '16px',
                filter: 'contrast(1.1) brightness(0.9) saturate(1.2)',
                zIndex: 1,
              }}
            />

            {/* Corner Bracket Decorations */}
            <div style={{ position: 'absolute', top: '15px', left: '15px', width: '15px', height: '15px', borderLeft: '3px solid #fff', borderTop: '3px solid #fff', zIndex: 4 }} />
            <div style={{ position: 'absolute', top: '15px', right: '15px', width: '15px', height: '15px', borderRight: '3px solid #fff', borderTop: '3px solid #fff', zIndex: 4 }} />
            <div style={{ position: 'absolute', bottom: '15px', left: '15px', width: '15px', height: '15px', borderLeft: '3px solid #fff', borderBottom: '3px solid #fff', zIndex: 4 }} />
            <div style={{ position: 'absolute', bottom: '15px', right: '15px', width: '15px', height: '15px', borderRight: '3px solid #fff', borderBottom: '3px solid #fff', zIndex: 4 }} />

            {/* Overlay glow */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle, transparent 40%, rgba(5,8,22,0.6) 90%)',
                zIndex: 2,
              }}
            />
          </div>

          <style>
            {`
              @keyframes scanLine {
                0% { top: 0%; }
                50% { top: 100%; }
                100% { top: 0%; }
              }
            `}
          </style>
        </div>

        {/* Right Side: Information Content */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--primary-glow)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 'bold' }}>
              // NEURAL IDENTIFICATION
            </span>
            <h2 className="section-title" style={{ margin: '10px 0 0 0', fontSize: 'clamp(1.8rem, 5vw, 2.5rem)' }}>
              ABOUT ME
            </h2>
          </div>

          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: 'clamp(0.9rem, 3vw, 1.05rem)' }}>
            I am <strong style={{ color: '#fff' }}>Awais Iqbal</strong>, a passionate, self-driven developer based in Lahore, Pakistan. My coding journey is focused on mastering full-stack web applications, UI/UX aesthetics, search engine optimization, and advanced animations.
          </p>

          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: 'clamp(0.9rem, 3vw, 1.05rem)' }}>
            By viewing the web as a digital canvas, I construct complex, responsive environments using modern technologies like React, PHP, Python, and interactive 3D particle systems.
          </p>

          {/* Core Info Badges */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', margin: '10px 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', borderLeft: '3px solid var(--secondary-glow)' }}>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Location</span>
              <span style={{ fontWeight: 'bold' }}>Lahore, Pakistan</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', borderLeft: '3px solid var(--primary-glow)' }}>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Education</span>
              <span style={{ fontWeight: 'bold' }}>Matriculation</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '15px',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              paddingTop: '25px',
              marginTop: '10px',
            }}
            className="stats-grid"
          >
            {stats.map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', fontFamily: 'var(--font-title)', fontWeight: 'bold', color: 'var(--primary-glow)', textShadow: '0 0 10px rgba(0,255,255,0.2)' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginTop: '5px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
