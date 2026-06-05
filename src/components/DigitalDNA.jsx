import React from 'react';
import { motion } from 'motion/react';

const DigitalDNA = () => {
  const dnaNodes = [
    { label: 'PHP', color: '#8892BF', offset: 0 },
    { label: 'Python', color: '#3776AB', offset: 45 },
    { label: 'SEO', color: '#FF3366', offset: 90 },
    { label: 'UI/UX', color: '#a259ff', offset: 135 },
    { label: 'Marketing', color: '#ffd700', offset: 180 },
    { label: 'Git', color: '#F05032', offset: 225 },
    { label: 'GSAP', color: '#88CE02', offset: 270 },
    { label: 'Vite', color: '#646CFF', offset: 315 }
  ];

  return (
    <section id="dna" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span style={{ fontSize: '0.9rem', color: 'var(--primary-glow)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 'bold' }}>
          // DIGITAL DNA SPIRAL
        </span>
        <h2 className="section-title" style={{ margin: '10px 0' }}>DIGITAL DNA</h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '50px',
          width: '100%',
          alignItems: 'center',
        }}
        className="dna-grid"
      >
        {/* Left Side: 3D DNA Simulation */}
        <div
          style={{
            height: '400px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(5, 8, 22, 0.4)',
            border: '1px solid var(--card-border)',
            borderRadius: '24px',
            overflow: 'hidden',
          }}
        >
          {/* Grid bg */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: 'radial-gradient(circle, rgba(123, 97, 255, 0.05) 1px, transparent 1px)',
              backgroundSize: '25px 25px',
            }}
          />

          {/* DNA Ladder helix Container */}
          <div
            style={{
              position: 'relative',
              width: '200px',
              height: '300px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {dnaNodes.map((node, i) => (
              <div
                key={i}
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Connecting rungs */}
                <div
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '2px',
                    background: 'linear-gradient(90deg, var(--secondary-glow), var(--primary-glow))',
                    opacity: 0.4,
                    animation: `dnaRungRotation 4s infinite linear`,
                    animationDelay: `${i * 0.4}s`,
                  }}
                />

                {/* Left Helix Node */}
                <div
                  style={{
                    position: 'absolute',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: node.color,
                    boxShadow: `0 0 10px ${node.color}`,
                    animation: `dnaLeftRotation 4s infinite ease-in-out`,
                    animationDelay: `${i * 0.4}s`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ position: 'absolute', left: '-50px', fontSize: '0.65rem', color: '#fff', fontFamily: 'var(--font-title)', background: 'rgba(5,8,22,0.8)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)', whiteSpace: 'nowrap' }}>
                    {node.label}
                  </span>
                </div>

                {/* Right Helix Node */}
                <div
                  style={{
                    position: 'absolute',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: node.color,
                    boxShadow: `0 0 10px ${node.color}`,
                    animation: `dnaRightRotation 4s infinite ease-in-out`,
                    animationDelay: `${i * 0.4}s`,
                  }}
                />
              </div>
            ))}
          </div>

          <style>
            {`
              @keyframes dnaLeftRotation {
                0%, 100% { transform: translateX(-80px) scale(1); z-index: 2; }
                50% { transform: translateX(80px) scale(0.7); opacity: 0.5; z-index: 1; }
              }
              @keyframes dnaRightRotation {
                0%, 100% { transform: translateX(80px) scale(0.7); opacity: 0.5; z-index: 1; }
                50% { transform: translateX(-80px) scale(1); z-index: 2; }
              }
              @keyframes dnaRungRotation {
                0%, 100% { transform: scaleX(1); opacity: 0.6; }
                50% { transform: scaleX(0); opacity: 0.1; }
              }
            `}
          </style>
        </div>

        {/* Right Side: Copy info */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <span style={{ fontSize: '0.9rem', color: 'var(--primary-glow)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 'bold' }}>
              // EVOLUTION & GROWTH
            </span>
            <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.8rem', color: '#fff', marginTop: '10px' }}>
              Core Technical DNA
            </h3>
          </div>

          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.95rem' }}>
            This double helix model represents my developmental foundation. It visualizes how frontend interfaces, backend logics, optimization policies, and client layouts intertwine to establish cohesive interactive solutions.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '15px' }}>
            {dnaNodes.map((n, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: '0.8rem',
                  border: `1px solid ${n.color}`,
                  padding: '6px 14px',
                  borderRadius: '20px',
                  color: '#fff',
                  background: 'rgba(5, 8, 22, 0.6)',
                  fontWeight: 'bold',
                }}
              >
                {n.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitalDNA;
