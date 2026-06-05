import React, { useEffect, useState } from 'react';

const CursorEffect = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName === 'A' ||
        e.target.tagName === 'BUTTON' ||
        e.target.closest('.interactive') ||
        e.target.closest('button') ||
        e.target.closest('a')
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Smooth trail effect
  useEffect(() => {
    let animFrameId;
    
    const updateTrail = () => {
      setTrail((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });
      animFrameId = requestAnimationFrame(updateTrail);
    };

    updateTrail();
    return () => cancelAnimationFrame(animFrameId);
  }, [position]);

  return (
    <>
      {/* Light Beam Background Effect */}
      <div
        className="cursor-beam"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      
      {/* Visual Custom Cursor */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: hovered ? '30px' : '10px',
          height: hovered ? '30px' : '10px',
          borderRadius: '50%',
          backgroundColor: hovered ? 'transparent' : 'var(--primary-glow)',
          border: hovered ? '2px solid var(--primary-glow)' : 'none',
          boxShadow: hovered ? '0 0 15px var(--primary-glow)' : '0 0 8px var(--primary-glow)',
          transform: `translate3d(calc(${trail.x}px - 50%), calc(${trail.y}px - 50%), 0)`,
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'width 0.2s, height 0.2s, background-color 0.2s, border 0.2s',
        }}
      />
    </>
  );
};

export default CursorEffect;
