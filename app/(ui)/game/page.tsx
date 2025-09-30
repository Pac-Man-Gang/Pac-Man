'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createPacman, keyToDirection, movePacman } from '../../core/pacman';
import { PacMan } from '../../core/types';

export default function GamePage() {
  const [pacman, setPacman] = useState(() => createPacman(5, 5));

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
    </main>
  );
}
