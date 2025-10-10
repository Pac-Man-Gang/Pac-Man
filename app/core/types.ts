export type Position = { x: number; y: number };
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
export enum GhostType {
  BLINKY,
  PINKY,
  INKY,
  CLYDE,
}
export type GhostState = MoveableEntity & { type: GhostType; mode: GhostMode };

export type GameState = {
  pacman: PacManState;
  ghosts: GhostState[];
  score: number;
  lives: number;
};
