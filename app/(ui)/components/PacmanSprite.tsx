import { INVINCIBLE_MS, updatePacman } from '@/app/core/game-state-manager';
import { initialPacman, keyToDirection } from '@/app/core/pacman';
import { Direction, GhostType, PacManState, Position } from '@/app/core/types';
import { equalPos } from '@/app/core/util/position';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import BulletSprite from './BulletSprite';

type PacmanSpriteProps = {
  uiPlayerDir?: Direction;
  size?: number;
  tileSize?: number;
  fps?: number;
};

type BulletData = {
  id: string;
  initialPos: Position;
  dir: Direction;
  speed: number;
};

export function getPacmanSprite() {
  return document.querySelector("[data-type='PacMan']")! as HTMLElement;
}

export function getPacmanArrow() {
  return document.querySelector("[data-type='pacArrow']")! as HTMLElement;
}

const shootCooldown = 750;

export default function PacmanSprite({
  size = 32,
  tileSize = 20,
  fps = 8,
}: PacmanSpriteProps) {
  const getPath = (frame: number) => `/assets/pacman/pacman${frame}.png`;

  const [pacmanState, setPacmanState] = useState<PacManState>(
    initialPacman(13, 23)
  );
  const [playerDir, setPlayerDir] = useState<Direction | undefined>(undefined);
  const [pacIsStanding, setPacIsStanding] = useState(true);
  const [invincible, setInvincible] = useState(false);
  const [anim, setAnim] = useState<{ frame: number; opening: boolean }>({
    frame: 1,
    opening: true,
  });
  const [gameOver, setGameOver] = useState(false);

  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [lastMovementKey, setLastMovementKey] = useState<string | null>(null);
  const [lastArrowKey, setLastArrowKey] = useState<string | null>(null);
  const [bullets, setBullets] = useState<BulletData[]>([]);
  const [shootOnCooldown, setShootOnCooldown] = useState(false);

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
    if (gameOver) return;
    const keyDown = (e: KeyboardEvent) => {
      if (['KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(e.code))
        setLastMovementKey(e.code);
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code))
        setLastArrowKey(e.code);
      setPressedKeys((prev) => {
        const next = new Set(prev);
        next.add(e.code);
        return next;
      });
    };
    const keyUp = (e: KeyboardEvent) =>
      setPressedKeys((prev) => {
        const next = new Set(prev);
        next.delete(e.code);
        return next;
      });
    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);
    return () => {
      window.removeEventListener('keydown', keyDown);
      window.removeEventListener('keyup', keyUp);
    };
  }, [gameOver]);

  useEffect(() => {
    if (
      (pressedKeys.has('ArrowUp') ||
        pressedKeys.has('ArrowDown') ||
        pressedKeys.has('ArrowLeft') ||
        pressedKeys.has('ArrowRight')) &&
      !shootOnCooldown &&
      !gameOver
    ) {
      setShootOnCooldown(true);
      setBullets((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          initialPos: pacmanState.pos,
          dir: keyToDirection[lastArrowKey!],
          speed: 0.05,
        },
      ]);
      setTimeout(() => {
        setShootOnCooldown(false);
      }, shootCooldown);
    }

    const dir = keyToDirection[lastMovementKey!];
    if (dir !== undefined) {
      if (pacIsStanding) {
        const newPacmanState = updatePacman(dir!);
        if (!equalPos(pacmanState.pos, newPacmanState.pos))
          setPacIsStanding(false);
        setPacmanState(newPacmanState);
      }
      setPlayerDir(dir);
    }
  }, [pressedKeys, lastArrowKey, lastMovementKey, pacmanState.pos, pacIsStanding, shootOnCooldown, gameOver]);

  useEffect(() => {
    const id = setInterval(() => {
      setAnim((anim) => {
        const { frame, opening } = anim;
        if (opening && frame === 3) return { frame: 2, opening: false };
        if (!opening && frame === 1) return { frame: 2, opening: true };
        return { frame: opening ? frame + 1 : frame - 1, opening };
      });
    }, 1000 / fps);
    const handleGameOver = () => {
      setGameOver(true);
      clearInterval(id);
      //window.removeEventListener('keydown', handleKey);
    };
    window.addEventListener('gameOver', handleGameOver);
    return () => {
      clearInterval(id);
      window.removeEventListener('gameOver', handleGameOver);
    };
  }, [fps]);

  useEffect(() => {
    const handleHit = () => {
      setInvincible(true);
    };
    window.addEventListener('pacHit', handleHit);
    return () => window.removeEventListener('pacHit', handleHit);
  }, []);

  useEffect(() => {
    if (!invincible) return;
    const t = setTimeout(() => setInvincible(false), INVINCIBLE_MS);
    return () => clearTimeout(t);
  }, [invincible]);

  const onBulletHit = useCallback((id: string, hitGhost: GhostType | null) => {
    setBullets((prev) => prev.filter((b) => b.id !== id));
    if (hitGhost !== null) {
      window.dispatchEvent(new CustomEvent(`bulletHit-${hitGhost}`));
    }
  }, []);

  const pacSrc = useMemo(() => getPath(anim.frame), [anim.frame]);
  const pacRotation = dirToRotation(pacmanState.movingDir);
  const pacX = Math.round(pacmanState.pos.x * tileSize + (tileSize - size) / 2);
  const pacY = Math.round(pacmanState.pos.y * tileSize + (tileSize - size) / 2);

  const arrowOffset = 30;
  const arrowDir = playerDir ?? pacmanState.dir;
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
  const arrowRotation = dirToRotation(playerDir ?? pacmanState.dir);

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
        onTransitionEnd={(e) => {
          if (e.propertyName === 'transform' && !gameOver) {
            const newPacmanState = updatePacman(playerDir!);
            if (equalPos(pacmanState.pos, newPacmanState.pos))
              setPacIsStanding(true);
            setPacmanState(newPacmanState);
          }
        }}
      >
        <div
          style={{
            transform: `rotate(${pacRotation}deg)`,
            transition: 'none',
          }}
        >
          <Image
            className={invincible ? 'flashOnHit' : ''}
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
            data-type="pacArrow"
            width={size}
            height={size}
            style={{ imageRendering: 'pixelated' }}
            priority
          />
        </div>
      </div>
      {bullets.map((b) => (
        <BulletSprite
          key={b.id}
          id={b.id}
          initialPos={b.initialPos}
          dir={b.dir}
          speed={b.speed}
          onHit={onBulletHit}
        />
      ))}
    </div>
  );
}
