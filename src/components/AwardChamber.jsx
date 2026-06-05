import React from 'react';
import { motion } from 'motion/react';
import { FaCrown, FaUsers, FaGraduationCap } from 'react-icons/fa';

const AwardChamber = () => {
  return (
    <section id="awards" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span style={{ fontSize: '0.9rem', color: 'var(--accent-gold)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 'bold' }}>
          // DIGITAL RECOGNITIONS
        </span>
        <h2 className="section-title neon-text-gold" style={{ margin: '10px 0' }}>AWARD CHAMBER</h2>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <div
          className="glass-panel gold-glow"
          style={{
            maxWidth: '650px',
            width: '100%',
            padding: '40px',
            position: 'relative',
            background: 'rgba(5, 8, 22, 0.7)',
            border: '1px solid rgba(255, 215, 0, 0.15)',
            borderRadius: '24px',
            overflow: 'hidden',
          }}
        >
          {/* Animated Gold Aura Background */}
          <div
            style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(255, 215, 0, 0.03) 0%, transparent 60%)',
              pointerEvents: 'none',
              animation: 'spinAura 20s infinite linear',
            }}
          />

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '25px' }}>
            {/* Crown Icon Container with Rotating Energy Rings */}
            <div style={{ position: 'relative', width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyStyle: 'center', justifyContent: 'center' }}>
              {/* Outer Golden Energy Ring */}
              <div
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  border: '2px dashed rgba(255, 215, 0, 0.4)',
                  borderRadius: '50%',
                  animation: 'spinRingForward 10s infinite linear',
                }}
              />
              {/* Inner Golden Energy Ring */}
              <div
                style={{
                  position: 'absolute',
                  width: '80%',
                  height: '80%',
                  border: '1px dashed rgba(255, 215, 0, 0.3)',
                  borderRadius: '50%',
                  animation: 'spinRingBackward 6s infinite linear',
                }}
              />
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'rgba(255, 215, 0, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-gold)',
                  fontSize: '2rem',
                  boxShadow: '0 0 20px rgba(255,215,0,0.3)',
                }}
              >
                <FaCrown />
              </div>
            </div>

            <div>
              <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.8rem', color: '#fff', marginBottom: '5px' }}>
                Social Media Marketing Award
              </h3>
              <p style={{ color: 'var(--accent-gold)', fontFamily: 'var(--font-title)', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Batch Champion / Top Performer
              </p>
            </div>

            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '1rem', maxWidth: '500px' }}>
              Recognized for outstanding performance and project execution during the intensive digital marketing modules at NextGen Digital University. Completed comprehensive campaigns reaching targeted reach indices.
            </p>

            {/* Details Badges */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
                width: '100%',
                borderTop: '1px solid rgba(255,215,0,0.1)',
                paddingTop: '25px',
                marginTop: '10px',
              }}
              className="award-badges"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'flex-start', background: 'rgba(255,215,0,0.02)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(255,215,0,0.05)' }}>
                <FaUsers style={{ fontSize: '1.8rem', color: 'var(--accent-gold)' }} />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Mentor</div>
                  <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '0.9rem' }}>Sir Zain Ali</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'flex-start', background: 'rgba(255,215,0,0.02)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(255,215,0,0.05)' }}>
                <FaGraduationCap style={{ fontSize: '1.8rem', color: 'var(--accent-gold)' }} />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Institution</div>
                  <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '0.9rem' }}>NextGen Digital Univ.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes spinAura {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes spinRingForward {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes spinRingBackward {
            from { transform: rotate(0deg); }
            to { transform: rotate(-360deg); }
          }
        `}
      </style>
    </section>
  );
};

export default AwardChamber;
