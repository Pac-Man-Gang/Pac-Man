'use client';
import { INITIAL_GAMESTATE, nextGameState } from '@/app/core/GameStateManager';
import localFont from 'next/font/local';
import { useEffect, useRef, useState } from 'react';
import { keyToDirection } from '../../core/pacman';
import { Direction, GameState, Position } from '../../core/types';
import EntityLayer from './Entitylayer';
import MazeLayer from './MazeLayer';

const BASE_W = 560;
const BASE_H = 620;

const arcadeFont = localFont({
  src: '../../../public/fonts/ARCADECLASSIC.ttf',
  weight: '400',
  style: 'normal',
  display: 'swap',
});

export type PopupBean = {
  x: number;
  y: number;
  text: string;
};

export function calcPixelPos(rect: DOMRect): Position {
  const board = document.querySelector<HTMLElement>('.board')!;
  const boardRect = board.getBoundingClientRect();

  // Board is scaled via CSS transform. Compute current scale from rects:
  const scaleX = boardRect.width / BASE_W;
  const scaleY = boardRect.height / BASE_H;

  // Convert viewport → board-local (unscaled) and use the sprite center:
  const xLocal = (rect.left + rect.width / 2 - boardRect.left) / scaleX;
  const yLocal = (rect.top + rect.height / 2 - boardRect.top) / scaleY;

  return { x: xLocal, y: yLocal };
}

export default function GamePage() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAMESTATE);
  const [playerDir, setPlayerDir] = useState<Direction | undefined>(undefined);

  const [scale, setScale] = useState(1);
  const wrapRef = useRef<HTMLDivElement>(null);

  const [popups, setPopups] = useState<
    { id: number; x: number; y: number; text: string }[]
  >([]);

  useEffect(() => {
    const update = () => {
      const w = wrapRef.current?.clientWidth ?? window.innerWidth;
      const h = wrapRef.current?.clientHeight ?? window.innerHeight;
      setScale(Math.min(w / BASE_W, h / BASE_H));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const dir = keyToDirection[e.key];
      if (dir !== undefined) setPlayerDir(dir);
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const tick = () => setGameState(nextGameState(playerDir!));
  useEffect(() => tick(), []);

  useEffect(() => {
    window.addEventListener('tick', tick);
    return () => window.removeEventListener('tick', tick);
  }, [playerDir]);

  useEffect(() => {
    const handler = (e: CustomEvent<PopupBean>) => {
      const { x, y, text } = e.detail;
      const id = Date.now();
      setPopups((p) => [...p, { id, x, y, text }]);
      setTimeout(() => {
        setPopups((p) => p.filter((pop) => pop.id !== id));
      }, 1000);
    };
    window.addEventListener('newPopup', handler as EventListener);

    window.dispatchEvent(
      new CustomEvent<PopupBean>('newPopup', {
        detail: { x: 100, y: 100, text: '200' },
      })
    );
    return () =>
      window.removeEventListener('newPopup', handler as EventListener);
  }, []);

  return (
    <main
      ref={wrapRef}
      style={{
        minHeight: '100svh',
        display: 'grid',
        placeItems: 'center',
        background: '#000',
        overflow: 'hidden',
      }}
    >
      <div
        className={arcadeFont.className}
        style={{
          position: 'absolute',
          top: 12,
          left: '15%',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
          zIndex: 2,
          fontSize: 45,
        }}
      >
        SCORE: {gameState.score}
      </div>

      <div
        className="board"
        style={{
          width: BASE_W,
          height: BASE_H,
          position: 'relative',
          transformOrigin: 'center center',
          transform: `scale(${scale})`,
        }}
      >
        <MazeLayer></MazeLayer>
        <EntityLayer
          pacman={gameState.pacman}
          ghosts={gameState.ghosts}
          uiPlayerDir={playerDir}
        ></EntityLayer>

        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 10,
            fontFamily: arcadeFont.style.fontFamily, // keeps same font
          }}
        >
          {popups.map((p) => (
            <div
              key={p.id}
              style={{
                position: 'absolute',
                left: p.x,
                top: p.y,
                transform: 'translate(-50%, -50%)',
                color: 'blue',
                fontSize: 24,
                fontWeight: 700,
                animation:
                  'popupFloat 900ms cubic-bezier(0.22, 1.0, 0.36, 1.0) forwards',
                willChange: 'transform, opacity',
              }}
            >
              {p.text}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
