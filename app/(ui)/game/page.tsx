'use client';
import localFont from 'next/font/local';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  allGhostTypes,
  Position
} from '../../core/types';
import { getGhostSprite } from '../components/GhostSprite';
import { getPacmanArrow } from '../components/PacmanSprite';
import EntityLayer from './EntityLayer';
import { MazeLayer } from './MazeLayer';

const BASE_W = 560;
const BASE_H = 620;

const arcadeFont = localFont({
  src: '../../../public/fonts/ARCADECLASSIC.ttf',
  weight: '400',
  style: 'normal',
  display: 'swap',
});

const aubreyFont = localFont({
  src: '../../../public/fonts/Jacquard.ttf',
  weight: '400',
  style: 'normal',
  display: 'swap',
});

export type PopupBean = {
  x: number;
  y: number;
  text: string;
};

export type ScoreBean = {
  score: number
}

const motivationalTexts = [
  'Seems to be a skill issue',
  'Do you really think youre capable?',
  'Some people just arent meant for greatness...',
  'Pathetic',
  'Why keep trying?',
  'Each death tells me a little more about you',
  'Is this how you spend your free time?',
  'What are you trying to prove?',
  'Every retry brings you closer to... nothing',
  'This gameplay has to be ragebait',
];
let motivationalText = '';

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
  const [gameOver, setGameOver] = useState(false);
  const [showGameOverImage, setShowGameOverImage] = useState(false);
  const [showPlayAgainButton, setShowPlayAgainButton] = useState(false);
  const [playAgainButtonPressed, setPlayAgainButtonPressed] = useState(false);

  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);

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
    const handleGameOver = () => {
      setGameOver(true);
      allGhostTypes().forEach((gt, index) =>
        setTimeout(
          () => (getGhostSprite(gt).style.visibility = 'hidden'),
          index * 100
        )
      );
      getPacmanArrow().style.visibility = 'hidden';
      motivationalText =
        motivationalTexts[Math.floor(Math.random() * motivationalTexts.length)];
      setTimeout(() => setShowGameOverImage(true), 2750);
    };
    window.addEventListener('gameOver', handleGameOver);
    return () => window.removeEventListener('gameOver', handleGameOver);
  }, []);

  useEffect(() => {
    const handleAddScore = (e: CustomEvent<ScoreBean>) => {
      const { score } = e.detail;
      setScore(score);
    }
    window.addEventListener('addScore', handleAddScore as EventListener);
    return () => window.removeEventListener('addScore', handleAddScore as EventListener);
  }, []);

  useEffect(() => {
    const handlePacHit = () => setLives(lives - 1);
    window.addEventListener('pacHit', handlePacHit);
    return () => window.removeEventListener('addScore', handlePacHit);
  }, [lives]);

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
        SCORE: {score}
      </div>
      <div
        className={arcadeFont.className}
        style={{
          position: 'absolute',
          top: 50,
          left: '15%',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
          zIndex: 2,
          fontSize: 45,
        }}
      >
        LIVES: {lives}
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
        <MazeLayer gameOver={gameOver}></MazeLayer>
        <EntityLayer></EntityLayer>
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

      {showGameOverImage && (
        <div
          style={{
            position: 'fixed', // 👈 independent of board scaling
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 999, // make sure it's above everything
            display: 'grid',
            justifyItems: 'center',
            rowGap: 80, // space between image & button
            pointerEvents: 'auto',
          }}
        >
          <Image
            src="/assets/hud/gameover.png"
            alt="Game Over"
            width={800}
            height={300}
            priority
            style={{
              imageRendering: 'pixelated',
              opacity: 0,
              animation: 'gameoverFade 1s ease forwards',
            }}
            onAnimationEnd={() => setShowPlayAgainButton(true)}
          />

          {showPlayAgainButton && (
            <Link
              href="/game"
              aria-label="Play again"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/game';
              }}
              style={{
                outline: 'none',
                borderRadius: '12px',
                transition: 'transform 80ms ease, filter 120ms ease',
              }}
              onMouseDown={() => setPlayAgainButtonPressed(true)}
              onMouseUp={() => setPlayAgainButtonPressed(false)}
              onMouseLeave={() => setPlayAgainButtonPressed(false)}
              onBlur={(e) => (e.currentTarget.style.filter = 'none')}
            >
              <Image
                src={
                  playAgainButtonPressed
                    ? '/assets/hud/tryagainbutton_pressed.png'
                    : '/assets/hud/tryagainbutton.png'
                }
                alt="Play button"
                width={300}
                height={96}
                priority
                style={{
                  display: 'block',
                  cursor: 'pointer',
                  borderRadius: '12px',
                  userSelect: 'none',
                  transform: playAgainButtonPressed
                    ? 'translateY(2px)'
                    : 'translateY(0)',
                  opacity: 0,
                  animation: 'gameoverFade 0.5s ease forwards',
                }}
              />
            </Link>
          )}
        </div>
      )}

      {showPlayAgainButton && (
        <div
          className={aubreyFont.className}
          style={{
            position: 'fixed', // 👈 stays relative to viewport
            bottom: 80, // 👈 distance from bottom edge
            left: 100, // 👈 distance from left edge
            pointerEvents: 'none',
            zIndex: 1000,
            fontSize: 34,
            maxWidth: '40vw', // optional line wrap
            textAlign: 'left',
            opacity: 0,
            animation: 'gameoverFade 1s ease forwards',
            fontFamily: aubreyFont.style.fontFamily,
          }}
        >
          {motivationalText}
        </div>
      )}
    </main>
  );
}
