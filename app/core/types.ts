export type Position = { x: number; y: number };

export function allDirections(): Direction[] {
  return [Direction.N, Direction.W, Direction.S, Direction.E];
}
export enum Direction {
  N,
  S,
  W,
  E,
}

export type Entity = { pos: Position; sprite: string };
export type MoveableEntity = Entity & { dir: Direction };

export type PacManState = MoveableEntity & { movingDir: Direction };

export enum GhostMode {
  HOME,
  CHASE,
  SCATTER,
  FRIGHTENED,
  EATEN,
}

export function allGhostTypes(): GhostType[] {
  return [GhostType.BLINKY, GhostType.PINKY, GhostType.INKY, GhostType.CLYDE];
}
export enum GhostType {
  BLINKY,
  PINKY,
  INKY,
  CLYDE,
}
export type GhostState = MoveableEntity & {
  type: GhostType;
  mode: GhostMode;
  isTeleporting?: boolean;
};

export type GameState = {
  pacman: PacManState;
  ghosts: GhostState[];
  score: number;
  lives: number;
};
