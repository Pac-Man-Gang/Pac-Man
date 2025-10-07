'use client';
import { ghostsTick } from '@/app/core/ghost';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { createPacman, keyToDirection, movePacman } from '../../core/pacman';
import { Direction, GameState, GhostMode, GhostType } from '../../core/types';
import EntityLayer from './entitylayer';
import Maze from './maze';

const INITIAL_STATE: GameState = {
  pacman: createPacman(5, 5),
  ghosts: [
    { pos: { x: 14, y: 11 }, sprite: 'blinky', dir: Direction.N, frame: 0, type: GhostType.BLINKY, mode: GhostMode.SCATTER, spawnPoint: { x: 14, y: 11 } },
    { pos: { x: 14, y: 11 }, sprite: 'pinky', dir: Direction.N, frame: 0, type: GhostType.PINKY, mode: GhostMode.SCATTER, spawnPoint: { x: 14, y: 11 } },
    { pos: { x: 14, y: 11 }, sprite: 'inky', dir: Direction.N, frame: 0, type: GhostType.INKY, mode: GhostMode.SCATTER, spawnPoint: { x: 14, y: 11 } },
    { pos: { x: 14, y: 11 }, sprite: 'clyde', dir: Direction.N, frame: 0, type: GhostType.CLYDE, mode: GhostMode.SCATTER, spawnPoint: { x: 14, y: 11 } },
  ],
  pellets: [],
  score: 0,
  lives: 3,
};

const TICK_MS = 250; // your game step (4 Hz)

export default function GamePage() {
  const [viewState, setViewState] = useState<GameState>(INITIAL_STATE);

  // Mutable refs for the simulation + inputs
  const simRef = useRef<GameState>(INITIAL_STATE);
  const playerDirRef = useRef<Direction | undefined>(undefined);

  const rafIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const accRef = useRef<number>(0);

  // Input handler (doesn't cause re-renders)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const dir = keyToDirection[e.key];
      if (dir !== undefined) playerDirRef.current = dir;
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Fixed-timestep RAF loop
  useEffect(() => {
    const MAX_STEPS = 5; // avoid spiral of death if tab was backgrounded

    const loop = (now: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = now;
      let delta = now - lastTimeRef.current;
      lastTimeRef.current = now;

      accRef.current += delta;
      let steps = 0;

      while (accRef.current >= TICK_MS && steps < MAX_STEPS) {
        // advance simulation exactly one tick
        const prev = simRef.current;
        const nextPac =
          playerDirRef.current === undefined
            ? prev.pacman
            : movePacman(prev.pacman, playerDirRef.current);

        simRef.current = {
          ...prev,
          pacman: nextPac,
          ghosts: ghostsTick(prev),
        };

        accRef.current -= TICK_MS;
        steps += 1;
      }

      // Push the latest sim state to React once per frame
      setViewState(simRef.current);

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
      lastTimeRef.current = 0;
      accRef.current = 0;
    };
  }, []);

  return (
    <main>
      <Link href="/"><button>Home</button></Link>
      <p>This is the game page</p>
      <p>
        Position: ({viewState.pacman.pos.x}, {viewState.pacman.pos.y}) <br />
        Direction: {viewState.pacman.dir} <br />
        Frame: {viewState.pacman.frame}
      </p>
      <div style={{ position: 'absolute' }}>
        <Maze />
        <EntityLayer pacman={viewState.pacman} ghosts={viewState.ghosts} />
      </div>
    </main>
  );
}
