import { Direction, PacManState } from '@/app/core/types';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

type PacmanSpriteProps = {
  pacman: PacManState;
  uiPlayerDir?: Direction;
  size?: number;
  tileSize?: number;
  fps?: number;
};

export function getPacmanSprite() {
  return document.querySelector("[data-type='PacMan']")!;
}

export default function PacmanSprite({
  pacman,
  uiPlayerDir,
  size = 32,
  tileSize = 20,
  fps = 8,
}: PacmanSpriteProps) {
  const getPath = (frame: number) => `/assets/pacman/pacman${frame}.png`;
  const [anim, setAnim] = useState<{ frame: number; opening: boolean }>({
    frame: 1,
    opening: true,
  });

  const dirToRotation = (dir: Direction): number => {
    return dir === Direction.N
      ? 270
      : dir === Direction.E
        ? 0
        : dir === Direction.S
          ? 90
          : 180;
  };

  // preload once
  useEffect(() => {
    for (let i = 1; i <= 3; i++) new window.Image().src = getPath(i);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setAnim((anim) => {
        const { frame, opening } = anim;
        if (opening && frame === 3) return { frame: 2, opening: false };
        if (!opening && frame === 1) return { frame: 2, opening: true };
        return { frame: opening ? frame + 1 : frame - 1, opening };
      });
    }, 1000 / fps);
    return () => clearInterval(id);
  }, [fps]);

  const pacSrc = useMemo(() => getPath(anim.frame), [anim.frame]);
  const pacRotation = dirToRotation(pacman.movingDir);
  const pacX = Math.round(pacman.pos.x * tileSize + (tileSize - size) / 2);
  const pacY = Math.round(pacman.pos.y * tileSize + (tileSize - size) / 2);

  const arrowOffset = 30;
  const arrowDir = uiPlayerDir ?? pacman.dir;
  const arrowX =
    arrowDir === Direction.E
      ? arrowOffset
      : arrowDir === Direction.W
        ? -arrowOffset
        : 0;
  const arrowY =
    arrowDir === Direction.S
      ? arrowOffset
      : arrowDir === Direction.N
        ? -arrowOffset
        : 0;
  const arrowRotation = dirToRotation(uiPlayerDir ?? pacman.dir);

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          transform: `translate3d(${pacX}px, ${pacY}px, 0)`,
          transition: 'transform 0.2s linear',
          willChange: 'transform',
        }}
      >
        <div
          style={{
            transform: `rotate(${pacRotation}deg)`,
            transition: 'none',
          }}
        >
          <Image
            data-type="PacMan"
            src={pacSrc}
            alt="PACMAN"
            width={size}
            height={size}
            style={{ imageRendering: 'pixelated' }}
            priority
          />
        </div>

        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            transform: `translate3d(${arrowX}px, ${arrowY}px, 0) rotate(${arrowRotation}deg)`,
            transition: 'none',
          }}
        >
          <Image
            src="/assets/pacman/facingArrow.png"
            alt="ARROW"
            width={size}
            height={size}
            style={{ imageRendering: 'pixelated' }}
            priority
          />
        </div>
      </div>
    </div>
  );
}
