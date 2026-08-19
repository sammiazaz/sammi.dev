import { useCallback, useMemo } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

export default function GlobalBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: { enable: false },
      particles: {
        number: {
          value: 100,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: '#ffffff',
        },
        shape: {
          type: 'circle',
        },
        opacity: {
          value: 0.5,
          random: false,
        },
        size: {
          value: 3,
          random: true,
        },
        links: {
          enable: true,
          distance: 150,
          color: 'var(--text-primary)',
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 6,
          direction: 'none',
          random: false,
          straight: false,
          outModes: 'out',
        },
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: 'grab',
          },
          onClick: {
            enable: true,
            mode: 'push',
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140,
            links: {
              opacity: 1,
            },
          },
          push: {
            quantity: 4,
          },
        },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <div className="global-background" aria-hidden="true">
      <div className="global-bg-glow"></div>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={options}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}
      />
    </div>
  );
}

