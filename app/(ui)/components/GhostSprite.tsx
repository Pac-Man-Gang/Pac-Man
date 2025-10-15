import { Direction, GhostMode, GhostState, GhostType } from '@/app/core/types';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

type GhostSpriteProps = {
  ghost: GhostState;
  size?: number;
  tileSize?: number;
  fps?: number;
};

const DIR_KEY: Record<Direction, 'N' | 'E' | 'S' | 'W'> = {
  [Direction.N]: 'N',
  [Direction.E]: 'E',
  [Direction.S]: 'S',
  [Direction.W]: 'W',
};

const frightenedFrames = [
  '/assets/ghost/frightened.png',
  '/assets/ghost/frightened2.png',
];

export function getGhostSprite(ghostType: GhostType) {
  return document.querySelector(`[data-type='${ghostType}']`)! as HTMLElement;
}

export default function GhostSprite({
  ghost,
  size = 32,
  tileSize = 20,
  fps = 6,
}: GhostSpriteProps) {
  const [timer, setTimer] = useState(0);

  const baseName = useMemo(
    () => ghost.sprite.replace('.png', ''),
    [ghost.sprite]
  );
  const dirKey = DIR_KEY[ghost.dir];

  const frames = useMemo(
    () => [
      `/assets/ghost/${baseName}/${baseName}-${dirKey}.png`,
      `/assets/ghost/${baseName}/${baseName}2-${dirKey}.png`,
    ],
    [baseName, dirKey]
  );

  const eatenFrame = useMemo(
    () => `/assets/ghost/eaten-${dirKey}.png`,
    [dirKey]
  );

  let src = '';
  if (ghost.mode === GhostMode.EATEN) src = eatenFrame;
  else
    src =
      ghost.mode === GhostMode.FRIGHTENED
        ? frightenedFrames[timer]
        : frames[timer];

  //preload once
  useEffect(() => frames.forEach((src) => (new window.Image().src = src)), []);

  useEffect(() => {
    const intervalId = setInterval(() => setTimer((prev) => (prev === 0 ? 1 : 0)), 100);
    const handleGameOver = () => clearInterval(intervalId);
    window.addEventListener('gameOver', handleGameOver);
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('gameOver', handleGameOver);
    }
  }, []);

  const xPixel = Math.round(ghost.pos.x * tileSize + (tileSize - size) / 2);
  const yPixel = Math.round(ghost.pos.y * tileSize + (tileSize - size) / 2);

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        transform: `translate3d(${xPixel}px, ${yPixel}px, 0)`,
        transition: 'transform 0.2s linear',
        willChange: 'transform',
      }}
      onTransitionEnd={(e) => {
        if (e.propertyName === 'transform' && ghost.type === GhostType.BLINKY)
          window.dispatchEvent(new CustomEvent('tick'));
      }}
    >
      <Image
        data-type={ghost.type}
        src={src}
        alt="BLINKY"
        width={size}
        height={size}
        style={{ imageRendering: 'pixelated' }}
        priority
      />
    </div>
  );
}
