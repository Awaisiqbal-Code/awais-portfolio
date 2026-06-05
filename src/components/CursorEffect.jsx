import React, { useEffect, useRef, useState } from 'react';

const CursorEffect = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  const cursorBeamRef = useRef(null);
  const cursorDotRef = useRef(null);
  
  const mousePos = useRef({ x: 0, y: 0 });
  const trailPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const checkMobile = () => {
      // Touch/mobile devices do not use a cursor
      setIsMobile(window.innerWidth < 1024 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      // Update light beam position instantly
      if (cursorBeamRef.current) {
        cursorBeamRef.current.style.left = `${e.clientX}px`;
        cursorBeamRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseOver = (e) => {
      const isInteractive = 
        e.target.tagName === 'A' ||
        e.target.tagName === 'BUTTON' ||
        e.target.closest('.interactive') ||
        e.target.closest('button') ||
        e.target.closest('a');

      if (cursorDotRef.current) {
        if (isInteractive) {
          cursorDotRef.current.style.width = '30px';
          cursorDotRef.current.style.height = '30px';
          cursorDotRef.current.style.backgroundColor = 'transparent';
          cursorDotRef.current.style.border = '2px solid var(--primary-glow)';
          cursorDotRef.current.style.boxShadow = '0 0 15px var(--primary-glow)';
        } else {
          cursorDotRef.current.style.width = '10px';
          cursorDotRef.current.style.height = '10px';
          cursorDotRef.current.style.backgroundColor = 'var(--primary-glow)';
          cursorDotRef.current.style.border = 'none';
          cursorDotRef.current.style.boxShadow = '0 0 8px var(--primary-glow)';
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    // Smooth trail animation loop
    let animFrameId;
    const updateTrail = () => {
      const dx = mousePos.current.x - trailPos.current.x;
      const dy = mousePos.current.y - trailPos.current.y;
      
      trailPos.current.x += dx * 0.15;
      trailPos.current.y += dy * 0.15;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(calc(${trailPos.current.x}px - 50%), calc(${trailPos.current.y}px - 50%), 0)`;
      }

      animFrameId = requestAnimationFrame(updateTrail);
    };
    
    updateTrail();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animFrameId);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Light Beam Background Effect */}
      <div
        ref={cursorBeamRef}
        className="cursor-beam"
        style={{
          left: '0px',
          top: '0px',
        }}
      />
      
      {/* Visual Custom Cursor */}
      <div
        ref={cursorDotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: 'var(--primary-glow)',
          boxShadow: '0 0 8px var(--primary-glow)',
          transform: 'translate3d(-50%, -50%, 0)',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'width 0.2s, height 0.2s, background-color 0.2s, border 0.2s, box-shadow 0.2s',
        }}
      />
    </>
  );
};

export default CursorEffect;
