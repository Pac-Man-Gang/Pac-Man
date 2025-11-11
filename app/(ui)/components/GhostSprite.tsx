import { updateGhost } from '@/app/core/game-state-manager';
import { getInitialGhost } from '@/app/core/ghost';
import { Direction, GhostMode, GhostState, GhostType } from '@/app/core/types';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

type GhostSpriteProps = {
  ghostType: GhostType;
  size?: number;
  tileSize?: number;
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
  ghostType,
  size = 32,
  tileSize = 20,
}: GhostSpriteProps) {
  const [timer, setTimer] = useState(0);
  const [ghostState, setGhostState] = useState<GhostState>(
    getInitialGhost(ghostType)
  );
  const [speed, setSpeed] = useState(0.2); // Seconds per Tile

  const baseName = useMemo(
    () => ghostState.sprite.replace('.png', ''),
    [ghostState.sprite]
  );
  const dirKey = DIR_KEY[ghostState.dir];

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
  if (ghostState.mode === GhostMode.EATEN) src = eatenFrame;
  else
    src =
      ghostState.mode === GhostMode.FRIGHTENED
        ? frightenedFrames[timer]
        : frames[timer];

  useEffect(() => {
    if (ghostState.mode === GhostMode.FRIGHTENED && speed !== 0.4)
      setSpeed(0.4);
    else if (ghostState.mode !== GhostMode.FRIGHTENED && speed !== 0.2)
      setSpeed(0.2);
  }, [ghostState, speed]);

  useEffect(
    () => frames.forEach((src) => (new window.Image().src = src)),
    [frames]
  );

  useEffect(() => {
    const intervalId = setInterval(
      () => setTimer((prev) => (prev === 0 ? 1 : 0)),
      100
    );
    const handleGameOver = () => clearInterval(intervalId);
    window.addEventListener('gameOver', handleGameOver);
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('gameOver', handleGameOver);
    };
  }, []);

<<<<<<< HEAD
  const xPixel = Math.round(ghost.pos.x * tileSize + (tileSize - size) / 2);
  const yPixel = Math.round(ghost.pos.y * tileSize + (tileSize - size) / 2);
  console.log(ghost.isTeleporting);
=======
  useEffect(() => setGhostState(updateGhost(ghostType)), [ghostType]);

  const xPixel = Math.round(
    ghostState.pos.x * tileSize + (tileSize - size) / 2
  );
  const yPixel = Math.round(
    ghostState.pos.y * tileSize + (tileSize - size) / 2
  );
  //asdf
>>>>>>> main
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        transform: `translate3d(${xPixel}px, ${yPixel}px, 0)`,
<<<<<<< HEAD
        transition: ghost.isTeleporting ? 'none' : 'transform 0.2s linear',
=======
        transition: `transform ${speed}s linear`,
>>>>>>> main
        willChange: 'transform',
      }}
      onTransitionEnd={(e) => {
        if (e.propertyName === 'transform')
          setGhostState(updateGhost(ghostType));
      }}
    >
      <Image
        data-type={ghostState.type}
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
