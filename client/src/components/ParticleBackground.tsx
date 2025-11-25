import { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useTheme } from './ThemeProvider';
import type { Container, ISourceOptions } from '@tsparticles/engine';

interface ParticleBackgroundProps {
  id?: string;
}

export default function ParticleBackground({ id = 'tsparticles' }: ParticleBackgroundProps) {
  const { theme } = useTheme();
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particleOptions = useMemo(() => {
    const isLight = theme === 'light';

    const options: ISourceOptions = {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      background: {
        color: {
          value: 'transparent',
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: false,
          },
          onHover: {
            enable: true,
            mode: 'grab',
          },
          resize: {
            enable: true,
          } as any,
        },
        modes: {
          grab: {
            distance: 140,
            links: {
              opacity: isLight ? 0.5 : 0.4,
            },
          },
        },
      },
      particles: {
        color: {
          value: isLight ? '#3b82f6' : '#60a5fa', // Blue particles that adapt to theme
        },
        links: {
          color: isLight ? '#93c5fd' : '#3b82f6', // Constellation lines
          distance: 150,
          enable: true,
          opacity: isLight ? 0.4 : 0.3,
          width: 1,
        },
        move: {
          direction: 'none',
          enable: true,
          outModes: {
            default: 'bounce',
          },
          random: false,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            width: 1920,
            height: 1080,
          },
          value: 80,
        },
        opacity: {
          value: isLight ? 0.5 : 0.4,
        },
        shape: {
          type: 'circle',
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      
      detectRetina: true,
    };

    return options;
  }, [theme]);

  if (!init) {
    return null;
  }

  return (
    <Particles
      id={id}
      options={particleOptions}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
