export type Position = { x: number; y: number };
export enum Direction {
  N,
  S,
  W,
  E,
}

export type Entity = { pos: Position; sprite: string };
export type MoveableEntity = Entity & { dir: Direction };

export type PacMan = MoveableEntity & { movingDir: Direction, pelletsEaten: number };

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
export type Ghost = MoveableEntity & { type: GhostType; mode: GhostMode; spawnPoint: Position; };

export type Pellet = Entity & {};
export type SuperPellet = Pellet & {};

export type GameState = {
  pacman: PacMan;
  ghosts: Ghost[];
  pellets: Pellet[];
  score: number;
  lives: number;
};
