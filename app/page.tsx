'use client';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const BackgroundPacman = dynamic(
  () => import('./(ui)/components/BackgroundPacman'),
  { ssr: false }
);
const BackgroundGhosts = dynamic(
  () => import('./(ui)/components/BackgroundGhosts'),
  { ssr: false }
);

const maxTitleWidth = 1000;

export default function HomePage() {
  const [titleWidth, setTitleWidth] = useState(0);
  const [buttonVisibility, setButtonVisibility] = useState<
    'visible' | 'hidden'
  >('hidden');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTitleWidth((prev) => {
        let next = prev + 10;
        if (next >= maxTitleWidth) {
          next = maxTitleWidth;
          setButtonVisibility('visible');
          clearInterval(intervalId);
        }
        return next;
      });
    }, 8);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <main style={{ position: 'relative', minHeight: '100vh' }}>
      <BackgroundPacman count={8} />
      <BackgroundGhosts count={8} />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: 'transparent',
        }}
      >
        <Image
          src="/assets/hud/title.png"
          alt="Pacman's Rogue Logo"
          width={titleWidth}
          height={0}
        />
        <Link
          href="/game"
          aria-label="Start game"
          style={{
            display: 'inline-block',
            outline: 'none',
            borderRadius: '12px',
            transition: 'transform 120ms ease, filter 120ms ease',
            visibility: `${buttonVisibility}`,
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.98)')}
          onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          onFocus={(e) =>
            (e.currentTarget.style.filter =
              'drop-shadow(0 0 8px rgba(255,255,255,.5))')
          }
          onBlur={(e) => (e.currentTarget.style.filter = 'none')}
        >
          <Image
            src="/assets/hud/play.png"
            alt=""
            width={300}
            height={96}
            priority
            style={{
              display: 'block',
              cursor: 'pointer',
              borderRadius: '12px',
            }}
          />
        </Link>
      </div>
    </main>
  );
}
