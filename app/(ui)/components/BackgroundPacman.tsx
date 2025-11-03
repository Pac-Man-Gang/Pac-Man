// components/BackgroundPacman.tsx
'use client';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

type Dir = 'left' | 'right';
type Pac = {
  key: number;
  dir: Dir;
  topVh: number;
  size: number;
  duration: number;
  delay: number;
  z: number;
};

type Props = {
  count?: number;
  minSize?: number;
  maxSize?: number;
  minSpeed?: number;
  maxSpeed?: number;
  opacity?: number;
  fps?: number;
};

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
function makePac(
  i: number,
  {
    minSize,
    maxSize,
    minSpeed,
    maxSpeed,
  }: Required<Omit<Props, 'count' | 'opacity' | 'fps'>>
): Pac {
  return {
    key: i,
    dir: Math.random() < 0.5 ? 'left' : 'right',
    topVh: rand(5, 95),
    size: Math.round(rand(minSize, maxSize)),
    duration: rand(minSpeed, maxSpeed),
    delay: rand(0, 6),
    z: Math.random() < 0.4 ? 0 : 1,
  };
}

export default function BackgroundPacman({
  count = 6,
  minSize = 24,
  maxSize = 54,
  minSpeed = 8,
  maxSpeed = 18,
  opacity = 0.9,
  fps = 8,
}: Props) {
  const [mouthFrame, setMouthFrame] = useState(1);
  const openingRef = useRef(true);
  const [pacs, setPacs] = useState<Pac[]>([]);
  const nextId = useRef(count);

  // mouth frames
  useEffect(() => {
    const id = setInterval(() => {
      setMouthFrame((prev) => {
        const opening = openingRef.current;
        if (opening && prev === 3) {
          openingRef.current = false;
          return 2;
        }
        if (!opening && prev === 1) {
          openingRef.current = true;
          return 2;
        }
        return opening ? prev + 1 : prev - 1;
      });
    }, 1000 / fps);
    return () => clearInterval(id);
  }, [fps]);

  // spawn after mount (no SSR randomness)
  useEffect(() => {
    const seed = Array.from({ length: count }).map((_, i) =>
      makePac(i, {
        minSize: minSize!,
        maxSize: maxSize!,
        minSpeed: minSpeed!,
        maxSpeed: maxSpeed!,
      })
    );
    setPacs(seed);
    nextId.current = count;
  }, [count, minSize, maxSize, minSpeed, maxSpeed]);

  const src = useMemo(
    () => `/assets/pacman/pacman${mouthFrame}.png`,
    [mouthFrame]
  );

  const respawn = (deadKey: number) => {
    setPacs((curr) => {
      const filtered = curr.filter((p) => p.key !== deadKey);
      const newbie = makePac(nextId.current++, {
        minSize: minSize!,
        maxSize: maxSize!,
        minSpeed: minSpeed!,
        maxSpeed: maxSpeed!,
      });
      return [...filtered, newbie];
    });
  };

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
        @keyframes fly-right-once {
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
        @keyframes fly-left-once {
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

      {pacs.map((p) => {
        const rotation = p.dir === 'right' ? 'rotate(0deg)' : 'rotate(180deg)';
        const anim = p.dir === 'right' ? 'fly-right-once' : 'fly-left-once';
        return (
          <div
            key={p.key}
            onAnimationEnd={() => respawn(p.key)}
            style={{
              position: 'absolute',
              top: `${p.topVh}vh`,
              left: 0,
              transform:
                p.dir === 'right' ? 'translateX(-12vw)' : 'translateX(112vw)',
              animation: `${anim} ${p.duration}s linear ${p.delay}s 1 both`,
              willChange: 'transform, opacity',
              filter: 'drop-shadow(0 0 6px rgba(255,255,0,.45))',
              zIndex: p.z,
              opacity: 0, // fades to target in keyframes
            }}
          >
            <Image
              src={src}
              alt=""
              width={p.size}
              height={p.size}
              style={{
                display: 'block',
                transform: rotation,
                imageRendering: 'pixelated',
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
