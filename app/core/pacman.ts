import type { PacMan, Position, Direction } from './types';

export function createPacman(
  x: number,
  y: number,
  sprite = 'pacman.png'
): PacMan {
  return {
    pos: { x, y },
    sprite,
    dir: 'E', // default facing East
    frame: 0,
  };
}

export function movePacman(pacman: PacMan, dir: Direction): PacMan {
  const { pos } = pacman;
  let newPos: Position;

  switch (dir) {
    case 'N':
      newPos = { x: pos.x, y: pos.y - 1 };
      break;
    case 'S':
      newPos = { x: pos.x, y: pos.y + 1 };
      break;
    case 'W':
      newPos = { x: pos.x - 1, y: pos.y };
      break;
    case 'E':
      newPos = { x: pos.x + 1, y: pos.y };
      break;
    default:
      newPos = pos; // no movement if direction is invalid
  }

  return {
    ...pacman,
    pos: newPos,
    dir,
    frame: (pacman.frame + 1) % 4, // assuming 4 frames for animation
  };
}

export const keyToDirection: Record<string, Direction> = {
  w: 'N',
  ArrowUp: 'N',
  s: 'S',
  ArrowDown: 'S',
  a: 'W',
  ArrowLeft: 'W',
  d: 'E',
  ArrowRight: 'E',
};
