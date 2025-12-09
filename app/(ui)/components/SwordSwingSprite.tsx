import { getGhostState, rectOverlapping } from '@/app/core/game-state-manager';
import {
  allGhostTypes,
  Direction,
  GhostMode,
  GhostType,
  Position,
} from '@/app/core/types';
import { posAt } from '@/app/core/util/position';
import Image from 'next/image';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { getGhostSprite } from './GhostSprite';

type SwordSwingSprite = {
  id: string;
  initialPos: Position;
  dir: Direction;
  speed: number;
  onHit: (id: string, ghostType: GhostType | null) => void;
};

export default function SwordSwingSprite({
  id,
  initialPos,
  dir,
  speed,
  onHit,
}: SwordSwingSprite) {
  const [position, setPosition] = useState(() => {
    let position = initialPos;
    if (dir === 0) {
      position = posAt(position, Direction.N, 3);
      position = posAt(position, Direction.W, 2);
    } else if (dir === 1) {
      position = posAt(position, Direction.W, 2);
    } else if (dir === 2) {
      position = posAt(position, Direction.W, 3);
      position = posAt(position, Direction.N, 2);
    } else if (dir === 3) {
      position = posAt(position, Direction.N, 2);
    }
    return position;
  });
  const [animFrame, setAnimFrame] = useState<number>(1);
  const swordRef = useRef<HTMLDivElement | null>(null);
  const prevRectRef = useRef<DOMRect | null>(null);

  const getPath = (frame: number) =>
    `/assets/pacman/sword/swordSwing${frame}.png`;
  const rotationByDir: Record<Direction, number> = {
    0: 0,
    1: 180,
    2: -90,
    3: 90,
  };

  useEffect(() => {
    setPosition((prev) => posAt(prev, dir, 1));

    const intervalId = window.setInterval(() => {
      setAnimFrame((prev) => {
        const frame = prev === 9 ? 9 : prev + 1;
        return frame;
      });
    }, 75); // or whatever speed you want

    return () => {
      window.clearInterval(intervalId);
    };
  }, [initialPos, dir]);

  useEffect(() => {
    if (animFrame === 9) onHit(id, null);
  }, [animFrame, id, onHit]);

  const offset = 7.5; // (20 - 5) / 2
  const pxX = Math.round(position.x * 20 + offset);
  const pxY = Math.round(position.y * 20 + offset);
  const src = useMemo(() => getPath(animFrame), [animFrame]);

  useLayoutEffect(() => {
    const swingEl = swordRef.current;
    if (!swingEl) return;

    const endRect = swingEl.getBoundingClientRect();
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
      ref={swordRef}
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        transform: `
                    translate3d(${pxX}px, ${pxY}px, 0)
                    rotate(${rotationByDir[dir]}deg)
                `,
        transition: `transform ${speed}s linear`,
        willChange: 'transform',
        width: 75,
        height: 75,
      }}
      onTransitionEnd={(e) => {
        setPosition((prev) => posAt(prev, dir, 1));
      }}
      data-type={`bullet-${id}`}
    >
      <Image
        src={src}
        alt="sword-swing"
        width={75}
        height={75}
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  );
}
