import { Direction, PacMan } from './types';
import { posAt, tileIsFree } from './util/position';

export function createPacman(
  x: number,
  y: number,
  sprite = 'pacman.png'
): PacMan {
  return {
    pos: { x, y },
    sprite,
    dir: Direction.N, // default facing East
    movingDir: Direction.N,
    pelletsEaten: 0
  };
}

export function movePacman(pacman: PacMan, dir: Direction): PacMan {
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

  return {
    ...pacman,
    pos: newPos,
    dir,
    movingDir: newMovingDir
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
