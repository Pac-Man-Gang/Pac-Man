export type Position = { x: number; y: number };
export enum Direction {
  N,
  S,
  W,
  E,
}

export type Entity = { pos: Position; sprite: string };
export type MoveableEntity = Entity & { dir: Direction; frame: number };

export type PacMan = MoveableEntity & {};
export type Ghost = MoveableEntity & {};
export type Pellet = Entity & {};
export type SuperPellet = Pellet & {};

export type GameState = {
  pacman: PacMan;
  ghosts: Ghost[];
  pellets: Pellet[];
  score: number;
  lives: number;
};
