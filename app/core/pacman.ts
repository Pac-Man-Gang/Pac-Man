import { addScore } from './GameStateManager';
import { Direction, PacManState } from './types';
import { posAt, tileIsFree } from './util/position';

export function initialPacman(
  x: number,
  y: number,
  sprite = 'pacman.png'
): PacManState {
  return {
    pos: { x, y },
    sprite,
    dir: Direction.N, // default facing East
    movingDir: Direction.N
  };
}

export function nextPacManState(pacman: PacManState, dir: Direction): PacManState {
  let newPos = posAt(pacman.pos, dir, 1);
  let newMovingDir = dir;
  if (!tileIsFree(newPos, false)) {
    newPos = posAt(pacman.pos, pacman.movingDir, 1);
    if (!tileIsFree(newPos, false)) newPos = pacman.pos;

    if (newPos.x > pacman.pos.x) newMovingDir = Direction.E;
    else if (newPos.x < pacman.pos.x) newMovingDir = Direction.W;
    else if (newPos.y > pacman.pos.y) newMovingDir = Direction.S;
    else if (newPos.y < pacman.pos.y) newMovingDir = Direction.N;
  }

  const cell = document.querySelector<HTMLDivElement>(`[data-r="${pacman.pos.y}"][data-c="${pacman.pos.x}"]`);
  if (cell) {
    cell.remove();
    addScore(10);
  }

  return {
    ...pacman,
    pos: newPos,
    dir,
    movingDir: newMovingDir,
  };
}

export const keyToDirection: Record<string, Direction> = {
  w: Direction.N,
  ArrowUp: Direction.N,
  s: Direction.S,
  ArrowDown: Direction.S,
  a: Direction.W,
  ArrowLeft: Direction.W,
  d: Direction.E,
  ArrowRight: Direction.E,
};
