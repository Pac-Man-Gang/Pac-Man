import { getGhostState, rectOverlapping } from '@/app/core/game-state-manager';
import {
  allGhostTypes,
  Direction,
  GhostMode,
  GhostType,
  Position,
} from '@/app/core/types';
import { posAt, tileIsFree } from '@/app/core/util/position';
import Image from 'next/image';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { getGhostSprite } from './GhostSprite';

type BulletSpriteProps = {
  id: string;
  initialPos: Position;
  dir: Direction;
  speed: number;
  onHit: (id: string, ghostType: GhostType | null) => void;
};
// ...imports unchanged

export default function BulletSprite({
  id,
  initialPos,
  dir,
  speed,
  onHit,
}: BulletSpriteProps) {
  const [position, setPosition] = useState(initialPos);
  const bulletRef = useRef<HTMLDivElement | null>(null);
  const prevRectRef = useRef<DOMRect | null>(null);

  // move one tile on mount (like you did), but no DOM queries here
  useEffect(() => {
    setPosition(posAt(initialPos, dir, 1));
  }, [initialPos, dir]);

  // compute pixel coords
  const offset = 7.5; // (20 - 5) / 2
  const pxX = Math.round(position.x * 20 + offset);
  const pxY = Math.round(position.y * 20 + offset);

  // collision check after layout, on every position change
  useLayoutEffect(() => {
    const bulletEl = bulletRef.current;
    if (!bulletEl) return;

    const endRect = bulletEl.getBoundingClientRect();
    const startRect = prevRectRef.current ?? endRect; // first frame: zero-length sweep

    const sweep = {
      left: Math.min(startRect.left, endRect.left),
      right: Math.max(startRect.right, endRect.right),
      top: Math.min(startRect.top, endRect.top),
      bottom: Math.max(startRect.bottom, endRect.bottom),
    };

    const bulletRect = new DOMRect(
      sweep.left,
      sweep.top,
      sweep.right - sweep.left,
      sweep.bottom - sweep.top
    );

    const hitGhost = allGhostTypes()
      .filter((ghostType) => getGhostState(ghostType)!.mode !== GhostMode.EATEN)
      .find((ghostType) => {
        const el = getGhostSprite(ghostType);
        if (!el) return false;
        const r = el.getBoundingClientRect(); // same viewport space ✅
        return rectOverlapping(bulletRect, r, 0);
      });

    if (hitGhost !== undefined) onHit(id, hitGhost);

    // remember for next step
    prevRectRef.current = endRect;
  }, [position, dir, id, onHit]);

  return (
    <div
      ref={bulletRef}
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        transform: `translate3d(${pxX}px, ${pxY}px, 0)`,
        transition: `transform ${speed}s linear`,
        willChange: 'transform',
        width: 5,
        height: 5,
      }}
      onTransitionEnd={(e) => {
        if (e.propertyName !== 'transform') return;

        const nextPos = posAt(position, dir, 1);

        // NOTE: you likely want to check the *next* tile, not the current one.
        if (!tileIsFree(nextPos, true)) {
          // <-- was `position` previously
          onHit(id, null); // wall hit: remove bullet
          return;
        }

        setPosition(nextPos);
      }}
      data-type={`bullet-${id}`}
    >
      <Image
        src="/assets/pacman/bullet.png"
        alt="bullet"
        width={5}
        height={5}
      />
    </div>
  );
}
