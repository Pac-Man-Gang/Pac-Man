import { LEVEL_MAP } from '@/app/(ui)/game/MazeLayer';
import { Direction, Position } from '../types';

export function equalPos(pos1: Position, pos2: Position): boolean {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

export function posAt(
  from: Position,
  dir: Direction,
  amount: number
): Position {
  return {
    x:
      dir === Direction.W
        ? from.x - amount
        : dir === Direction.E
          ? from.x + amount
          : from.x,
    y:
      dir === Direction.N
        ? from.y - amount
        : dir === Direction.S
          ? from.y + amount
          : from.y,
  };
}

export function tileIsFree(pos: Position, includeGhostHouse: boolean): boolean {
  if (!inBounds(pos)) return false;

  const tile = LEVEL_MAP[pos.y][pos.x];
  return (
    tile === 0 ||
    tile === 2 ||
    tile === 5 ||
    tile === 6 ||
    (includeGhostHouse && tile === 4)
  );
}

export function inBounds(pos: Position): boolean {
  return (
    pos.y >= 0 &&
    pos.y < LEVEL_MAP.length &&
    pos.x >= 0 &&
    pos.x < LEVEL_MAP[pos.y].length
  );
}
