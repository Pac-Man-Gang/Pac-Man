'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createPacman, keyToDirection, movePacman } from '../../core/pacman';
import { PacMan } from '../../core/types';
import Maze from './maze';
import { DEATH_SPRITES } from '../components/PacMan';

export default function GamePage() {
  const [pacman, setPacman] = useState(() => createPacman(5, 5));
  const [isDead, setIsDead] = useState(false);

  // Trigger death animation
  function handleDeath() {
    setIsDead(true);
    let frame = 0;
    const interval = setInterval(() => {
      setPacman((prev) => ({ ...prev, frame: frame++ }));
      if (frame >= DEATH_SPRITES.length) {
        clearInterval(interval);
        // Reset game or handle game over
      }
    }, 200); // Adjust speed as needed
  }

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const dir = keyToDirection[e.key];
      if (dir !== undefined) {
        setPacman((prev: PacMan) => movePacman(prev, dir));
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <main>
      <Link href="/">
        <button>Home</button>
      </Link>
      <p>This is the game page</p>
      <p>
        Position: ({pacman.pos.x}, {pacman.pos.y}) <br />
        Direction: {pacman.dir} <br />
        Frame: {pacman.frame}
      </p>
      <Maze pacman={pacman} />
    </main>
  );
}
