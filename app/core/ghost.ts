import { LEVEL_MAP } from '../(ui)/game/maze';
import {
  Direction,
  GameState,
  Ghost,
  GhostMode,
  GhostType,
  Position,
} from './types';
import { equalPos, posAt, tileIsFree } from './util/position';
/*
    WARNINGS
    - targetPoints can be outside the maze or on walls
*/

/*
    TODO
    - Not all ghosts spawn right away, dpends on points and lvl
    - chooseMode() uses sprite to filter pellets, typeof only works with classes
    - Timers are not functional programming (dont use Date.now())
    - frightened pauses schedule
    - Ghost House doesnt exist
    - EatenMode: double speed through tunnes
    - Blinky speeds up and stops scattering if only few pellets are left
*/

let firstTickTimestamp: number;
let frightenedModeEnteredTimestamp: number;

export function initalGhosts(): Ghost[] {
  return [
    {
      pos: { x: 15, y: 14 },
      sprite: "clyde",
      dir: Direction.E,
      type: GhostType.CLYDE,
      mode: GhostMode.HOME,
      spawnPoint: { x: 14, y: 11 },
    },
    {
      pos: { x: 13, y: 14 },
      sprite: "inky",
      dir: Direction.E,
      type: GhostType.INKY,
      mode: GhostMode.HOME,
      spawnPoint: { x: 14, y: 11 },
    },
    {
      pos: { x: 14, y: 14 },
      sprite: "pinky",
      dir: Direction.E,
      type: GhostType.PINKY,
      mode: GhostMode.HOME,
      spawnPoint: { x: 14, y: 13 },
    },
    {
      pos: { x: 13, y: 11 },
      sprite: "blinky",
      dir: Direction.N,
      type: GhostType.BLINKY,
      mode: GhostMode.SCATTER,
      spawnPoint: { x: 14, y: 11 },
    },
  ]
}

export function ghostsTick(gameState: GameState): Ghost[] {
  return gameState.ghosts.map((ghost) => ghostTick(gameState, ghost.type));
}

function ghostTick(gameState: GameState, ghostType: GhostType): Ghost {
  if (!firstTickTimestamp) firstTickTimestamp = Date.now();

  const ghost = findGhost(gameState, ghostType);
  const newMode = calcMode(gameState, ghost);
  const newPos = calcTile(ghost, newMode, calcTargetPoint(newMode, ghost, gameState));
  const newFacing = facingDirection(ghost.pos, newPos);

  return {
    pos: newPos,
    dir: newFacing,
    mode: newMode,

    type: ghost.type,
    sprite: ghost.sprite,
    spawnPoint: ghost.spawnPoint,
  };
}

function calcTile(
  ghostState: Ghost,
  nextMode: GhostMode,
  targetPoint: Position
): Position {
  const paths = possiblePaths(ghostState, nextMode);

  if (paths.length === 1) return paths[0];
  return shortestPath(paths, targetPoint);
}

function shortestPath(paths: Position[], targetPoint: Position): Position {
  return paths.reduce(
    (bestPath, currentPath) =>
      euclideanDistance(currentPath, targetPoint) <
        euclideanDistance(bestPath, targetPoint)
        ? currentPath
        : bestPath,
    paths[0]
  );
}

function possiblePaths(ghostState: Ghost, nextMode: GhostMode): Position[] {
  const freeTiles = freeTilesAround(ghostState.pos);
  if (freeTiles.length === 1 || needsImmediateReverse(ghostState.mode, nextMode))
    return freeTiles;

  return freeTiles.filter(
    (tile) =>
      !equalPos(tile, posAt(ghostState.pos, reverseDirection(ghostState.dir), 1))
  );
}

function facingDirection(lastPoint: Position, nextPoint: Position): Direction {
  return allDirections().find((dir) =>
    equalPos(nextPoint, posAt(lastPoint, dir, 1))
  )!;
}

function calcMode(gameState: GameState, ghost: Ghost): GhostMode {
  if (ghost.mode === GhostMode.HOME) return canLeaveHouse(ghost.type, gameState) ? GhostMode.SCATTER : GhostMode.HOME;

  if (gameState.pellets
    .filter((pellet) => pellet.sprite === 'SuperPellet.png')
    .map((superPellet) => superPellet.pos)
    .find((pos) => equalPos(gameState.pacman.pos, pos))) {
    frightenedModeEnteredTimestamp = Date.now();
    return GhostMode.FRIGHTENED;
  }
  if (ghost.mode === GhostMode.FRIGHTENED && (Date.now() - frightenedModeEnteredTimestamp) / 1000 < 6) return GhostMode.FRIGHTENED;
  if (ghost.mode === GhostMode.FRIGHTENED && equalPos(gameState.pacman.pos, ghost.pos)) return GhostMode.EATEN;
  if (ghost.mode === GhostMode.EATEN && !equalPos(ghost.pos, ghost.spawnPoint)) return GhostMode.EATEN;

  const secondsSinceGameStart = (Date.now() - firstTickTimestamp) / 1000;
  if (secondsSinceGameStart > 84) return GhostMode.CHASE;
  else if (secondsSinceGameStart > 79) return GhostMode.SCATTER;
  else if (secondsSinceGameStart > 59) return GhostMode.CHASE;
  else if (secondsSinceGameStart > 54) return GhostMode.SCATTER;
  else if (secondsSinceGameStart > 34) return GhostMode.CHASE;
  else if (secondsSinceGameStart > 27) return GhostMode.SCATTER;
  else if (secondsSinceGameStart > 7) return GhostMode.CHASE;
  else return GhostMode.SCATTER;
}

function calcTargetPoint(
  nextMode: GhostMode,
  ghost: Ghost,
  gameState: GameState
): Position {
  const ghostType = ghost.type;
  if (needsImmediateReverse(ghost.mode, nextMode))
    return posAt(ghost.pos, reverseDirection(ghost.dir), 1);

  const chaseMode = () => {
    if (ghostType === GhostType.BLINKY) return gameState.pacman.pos;
    else if (ghostType === GhostType.PINKY)
      return posAt(gameState.pacman.pos, gameState.pacman.dir, 4);
    else if (ghostType === GhostType.INKY) {
      const twoTilesAheadOfPac = posAt(
        gameState.pacman.pos,
        gameState.pacman.dir,
        2
      );
      const blinkyPos = findGhost(gameState, GhostType.BLINKY).pos;
      return {
        x: twoTilesAheadOfPac.x * 2 - blinkyPos.x,
        y: twoTilesAheadOfPac.y * 2 - blinkyPos.y,
      };
    } else
      return euclideanDistance(
        gameState.pacman.pos,
        findGhost(gameState, GhostType.CLYDE).pos
      ) >= 8
        ? gameState.pacman.pos
        : { x: 0, y: 29 };
  };

  const scatterMode = () => {
    if (ghostType === GhostType.BLINKY) return { x: 27, y: 0 };
    else if (ghostType === GhostType.PINKY) return { x: 0, y: 0 };
    else if (ghostType === GhostType.INKY) return { x: 27, y: 29 };
    else return { x: 0, y: 29 };
  };

  const frightenedMode = () => {
    const dirs = allDirections();
    return posAt(ghost.pos, dirs[Math.floor(Math.random() * dirs.length)], 1);
  };

  const eatenMode = () => {
    return ghost.spawnPoint;
  };

  switch (nextMode) {
    case GhostMode.CHASE:
      return chaseMode();
    case GhostMode.SCATTER:
      return scatterMode();
    case GhostMode.FRIGHTENED:
      return frightenedMode();
    case GhostMode.EATEN:
      return eatenMode();
    default: return chaseMode();
  }
}

function needsImmediateReverse(prev: GhostMode, next: GhostMode): boolean {
  return (
    prev !== next &&
    prev !== GhostMode.FRIGHTENED &&
    prev !== GhostMode.EATEN &&
    next !== GhostMode.EATEN
  ) || next === GhostMode.HOME;
}

function canLeaveHouse(ghostType: GhostType, gameState: GameState): boolean {
  return ghostType === GhostType.BLINKY ? true :
    ghostType === GhostType.PINKY ? Date.now() - firstTickTimestamp > 2000 :
      ghostType === GhostType.INKY ? gameState.pacman.pelletsEaten >= 30 :
        gameState.pacman.pelletsEaten >= 60;
}

function findGhost(gameState: GameState, ghostType: GhostType): Ghost {
  return gameState.ghosts.find((ghost) => ghost.type === ghostType)!;
}

// Util functions -------------------------------------------

// Dir Utils -----------
function allDirections(): Direction[] {
  return [Direction.N, Direction.W, Direction.S, Direction.E];
}

function reverseDirection(dir: Direction): Direction {
  return dir === Direction.N
    ? Direction.S
    : dir === Direction.S
      ? Direction.N
      : dir === Direction.E
        ? Direction.W
        : Direction.E;
}

// Position Utils ----------
function freeTilesAround(pos: Position): Position[] {
  return allDirections()
    .filter((dir) => tileIsFree(posAt(pos, dir, 1), LEVEL_MAP[pos.y][pos.x] === 4))
    .map((dir) => posAt(pos, dir, 1));
}

function euclideanDistance(pos1: Position, pos2: Position): number {
  return Math.hypot(pos1.x - pos2.x, pos1.y - pos2.y);
}
