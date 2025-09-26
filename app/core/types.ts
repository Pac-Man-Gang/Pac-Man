type Position = { x: number; y: number };
type Direction = 'N' | 'S' | 'W' | 'E';

type Entity = { pos: Position; sprite: string };
type MoveableEntity = Entity & { dir: Direction; frame: number };

type PacMan = MoveableEntity & {};
type Ghost = MoveableEntity & {};
type Pellet = Entity & {};
type SuperPellet = Pellet & {};

type GameState = {
  pacman: PacMan;
  ghosts: Ghost[];
  pellets: Pellet[];
  score: number;
  lives: number;
};
