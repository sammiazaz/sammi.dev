import { useState, useEffect, useRef } from 'react';

const VantaBackground = ({ mode, theme }) => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);

  // Vanta colors based on theme + mode
  const getColors = () => {
    if (mode === 'light') return { color: 0x10b981, color2: 0x047857, backgroundColor: 0xd6e4f0 };
    return { color: 0x10b981, color2: 0xffffff, backgroundColor: 0x0 };
  };

  useEffect(() => {
    if (theme === 'editorial') return; // No particles in editorial mode
    if (!vantaEffect && window.VANTA && window.VANTA.DOTS) {
      try {
        const { color, color2, backgroundColor } = getColors();
        setVantaEffect(
          window.VANTA.DOTS({
            el: myRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color, color2, backgroundColor,
            size: 3,
            spacing: 36.00,
            showLines: false
          })
        );
      } catch (error) {
        console.error('Vanta init error:', error);
      }
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect, theme]);

  // Update options when mode/theme changes
  useEffect(() => {
    if (vantaEffect) {
      if (theme === 'editorial') {
        vantaEffect.destroy();
        setVantaEffect(null);
        return;
      }
      const { color, color2, backgroundColor } = getColors();
      vantaEffect.setOptions({ color, color2, backgroundColor });
    }
  }, [mode, theme, vantaEffect]);

  // Hidden in editorial theme
  if (theme === 'editorial') return null;

  return (
    <div
      ref={myRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
};

export default VantaBackground;
