'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { createPacman, keyToDirection, movePacman } from '../../core/pacman';
import Maze from './maze';

export default function GamePage() {
  const [pacman, setPacman] = useState(() => createPacman(5, 5));
  const speed = 100; // pixels per second
  const lastTime = useRef<number | null>(null);

  // Keyboard input
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const dir = keyToDirection[e.key];
      if (dir !== undefined) {
        setPacman((prev) => movePacman(prev, dir));
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Animation loop
  useEffect(() => {
    function step(timestamp: number) {
      if (lastTime.current == null) lastTime.current = timestamp;
      const dt = (timestamp - lastTime.current) / 1000; // seconds
      lastTime.current = timestamp;

      setPacman((prev) => {
        const targetX = prev.pos.x * 20;
        const targetY = prev.pos.y * 20;

        const dx = targetX - prev.pixelPos.x;
        const dy = targetY - prev.pixelPos.y;

        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 1) {
          // close enough → snap
          return { ...prev, pixelPos: { x: targetX, y: targetY } };
        }

        const moveDist = speed * dt;
        const ratio = Math.min(1, moveDist / dist);

        return {
          ...prev,
          pixelPos: {
            x: prev.pixelPos.x + dx * ratio,
            y: prev.pixelPos.y + dy * ratio,
          },
        };
      });

      requestAnimationFrame(step);
    }

    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <main>
      <Link href="/">
        <button>Home</button>
      </Link>
      <p>This is the game page</p>
      <Maze pacman={{ ...pacman }} />
    </main>
  );
}
