// components/BackgroundGhosts.tsx
'use client';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

type Dir = 'left' | 'right';
type GhostName = 'blinky' | 'pinky' | 'inky' | 'clyde';

type Ghost = {
  key: number;
  name: GhostName;
  dir: Dir;
  topVh: number; // lane (0..100)
  size: number; // px
  duration: number; // seconds to cross
  delay: number; // start delay (s)
  z: number; // depth layer
};

type Props = {
  count?: number;
  minSize?: number;
  maxSize?: number;
  minSpeed?: number; // seconds (bigger = slower)
  maxSpeed?: number;
  fps?: number; // 2-frame flap fps
  opacity?: number; // target opacity during flight
};

const NAMES: GhostName[] = ['blinky', 'pinky', 'inky', 'clyde'];

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function makeGhost(
  key: number,
  opts: Required<Pick<Props, 'minSize' | 'maxSize' | 'minSpeed' | 'maxSpeed'>>
): Ghost {
  return {
    key,
    name: pick(NAMES),
    dir: Math.random() < 0.5 ? 'left' : 'right',
    topVh: rand(5, 95),
    size: Math.round(rand(opts.minSize, opts.maxSize)),
    duration: rand(opts.minSpeed, opts.maxSpeed),
    delay: rand(0, 6),
    z: Math.random() < 0.4 ? 0 : 1,
  };
}

export default function BackgroundGhosts({
  count = 5,
  minSize = 26,
  maxSize = 54,
  minSpeed = 9,
  maxSpeed = 20,
  fps = 6,
  opacity = 0.9,
}: Props) {
  // simple 2 frame eye/leg flap
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setFrame((f) => (f ? 0 : 1)), 1000 / fps);
    return () => clearInterval(id);
  }, [fps]);

  // spawn after mount (avoid SSR randomness)
  const [ghosts, setGhosts] = useState<Ghost[]>([]);
  const nextId = useRef(count);
  useEffect(() => {
    const seed = Array.from({ length: count }).map((_, i) =>
      makeGhost(i, {
        minSize: minSize!,
        maxSize: maxSize!,
        minSpeed: minSpeed!,
        maxSpeed: maxSpeed!,
      })
    );
    setGhosts(seed);
    nextId.current = count;
  }, [count, minSize, maxSize, minSpeed, maxSpeed]);

  const respawn = (deadKey: number) => {
    setGhosts((curr) => {
      const filtered = curr.filter((g) => g.key !== deadKey);
      const newbie = makeGhost(nextId.current++, {
        minSize: minSize!,
        maxSize: maxSize!,
        minSpeed: minSpeed!,
        maxSpeed: maxSpeed!,
      });
      return [...filtered, newbie];
    });
  };

  const srcFor = useMemo(
    () => (name: GhostName, dir: Dir) => {
      const dirKey = dir === 'right' ? 'E' : 'W';
      const suffix = frame === 0 ? '' : '2';
      return `/assets/ghost/${name}/${name}${suffix}-${dirKey}.png`;
    },
    [frame]
  );

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <style jsx>{`
        @keyframes ghost-right-once {
          0% {
            transform: translateX(-12vw);
            opacity: 0;
          }
          3% {
            opacity: ${opacity};
          }
          100% {
            transform: translateX(112vw);
            opacity: ${opacity};
          }
        }
        @keyframes ghost-left-once {
          0% {
            transform: translateX(112vw);
            opacity: 0;
          }
          3% {
            opacity: ${opacity};
          }
          100% {
            transform: translateX(-12vw);
            opacity: ${opacity};
          }
        }
      `}</style>

      {ghosts.map((g) => {
        const anim = g.dir === 'right' ? 'ghost-right-once' : 'ghost-left-once';
        const startTransform =
          g.dir === 'right' ? 'translateX(-12vw)' : 'translateX(112vw)';
        const src = srcFor(g.name, g.dir);

        return (
          <div
            key={g.key}
            onAnimationEnd={() => respawn(g.key)}
            style={{
              position: 'absolute',
              top: `${g.topVh}vh`,
              left: 0,
              transform: startTransform,
              animation: `${anim} ${g.duration}s linear ${g.delay}s 1 both`,
              willChange: 'transform, opacity',
              filter: 'drop-shadow(0 0 6px rgba(255,255,255,.35))',
              zIndex: g.z,
              opacity: 0, // fades to target in keyframes
            }}
          >
            <Image
              src={src}
              alt=""
              width={g.size}
              height={g.size}
              style={{ display: 'block', imageRendering: 'pixelated' }}
            />
          </div>
        );
      })}
    </div>
  );
}
