import { getPelletSprite } from '../(ui)/components/SmallPelletSprite';
import { addScore } from './game-state-manager';
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
    dir: Direction.E, // default facing East
    movingDir: Direction.E,
  };
}

export function nextPacManState(
  pacman: PacManState,
  dir: Direction
): PacManState {
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

  const cell = getPelletSprite(pacman.pos.y, pacman.pos.x);
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
  KeyW: Direction.N,
  ArrowUp: Direction.N,
  KeyS: Direction.S,
  ArrowDown: Direction.S,
  KeyA: Direction.W,
  ArrowLeft: Direction.W,
  KeyD: Direction.E,
  ArrowRight: Direction.E,
};
