import { Direction, PacMan, Position } from './types';
import { tileIsFree } from './util/position';

export function createPacman(
  x: number,
  y: number,
  sprite = 'pacman.png'
): PacMan {
  return {
    pos: { x, y },
    sprite,
    dir: Direction.N, // default facing East
    frame: 0,
  };
}

export function movePacman(pacman: PacMan, dir: Direction): PacMan {
  const { pos } = pacman;
  let newPos: Position;

  switch (dir) {
    case Direction.N:
      newPos = { x: pos.x, y: pos.y - 1 };
      break;
    case Direction.S:
      newPos = { x: pos.x, y: pos.y + 1 };
      break;
    case Direction.W:
      newPos = { x: pos.x - 1, y: pos.y };
      break;
    case Direction.E:
      newPos = { x: pos.x + 1, y: pos.y };
      break;
    default:
      newPos = pos; // no movement if direction is invalid
  }

  if (!tileIsFree(newPos)) newPos = pos;

  return {
    ...pacman,
    pos: newPos,
    dir,
    frame: (pacman.frame + 1) % 4, // assuming 4 frames for animation
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
