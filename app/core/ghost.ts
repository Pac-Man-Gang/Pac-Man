import {
  Direction,
  GameState,
  Ghost,
  GhostMode,
  GhostType,
  Position,
} from './types';
import { equalPos, tileIsFree } from './util/position';
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
    frame: 0,
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
  if (
    freeTiles.length === 1 ||
    needsImmediateReverse(ghostState.mode, nextMode)
  )
    return freeTiles;

  return freeTiles.filter(
    (tile) =>
      !equalPos(
        tile,
        tileAt(ghostState.pos, reverseDirection(ghostState.dir), 1)
      )
  );
}

function facingDirection(lastPoint: Position, nextPoint: Position): Direction {
  return allDirections().find((dir) =>
    equalPos(nextPoint, tileAt(lastPoint, dir, 1))
  )!;
}

function calcMode(gameState: GameState, ghost: Ghost): GhostMode {
  if (
    gameState.pellets
      .filter((pellet) => pellet.sprite === 'SuperPellet.png')
      .map((superPellet) => superPellet.pos)
      .find((pos) => equalPos(gameState.pacman.pos, pos))
  ) {
    frightenedModeEnteredTimestamp = Date.now();
    return GhostMode.FRIGHTENED;
  }
  if (
    ghost.mode === GhostMode.FRIGHTENED &&
    (Date.now() - frightenedModeEnteredTimestamp) / 1000 < 6
  )
    return GhostMode.FRIGHTENED;
  if (
    ghost.mode === GhostMode.FRIGHTENED &&
    equalPos(gameState.pacman.pos, ghost.pos)
  )
    return GhostMode.EATEN;
  if (ghost.mode === GhostMode.EATEN && !equalPos(ghost.pos, ghost.spawnPoint))
    return GhostMode.EATEN;

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
    return tileAt(ghost.pos, reverseDirection(ghost.dir), 1);

  const chaseMode = () => {
    if (ghostType === GhostType.BLINKY) return gameState.pacman.pos;
    else if (ghostType === GhostType.PINKY)
      return tileAt(gameState.pacman.pos, gameState.pacman.dir, 4);
    else if (ghostType === GhostType.INKY) {
      const twoTilesAheadOfPac = tileAt(
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
    return tileAt(ghost.pos, dirs[Math.floor(Math.random() * dirs.length)], 1);
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
  }
}

function needsImmediateReverse(prev: GhostMode, next: GhostMode): boolean {
  return (
    prev !== next &&
    prev !== GhostMode.FRIGHTENED &&
    prev !== GhostMode.EATEN &&
    next !== GhostMode.EATEN
  );
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
    .filter((dir) => tileIsFree(tileAt(pos, dir, 1)))
    .map((dir) => tileAt(pos, dir, 1));
}

function tileAt(from: Position, dir: Direction, amount: number): Position {
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

function euclideanDistance(pos1: Position, pos2: Position): number {
  return Math.hypot(pos1.x - pos2.x, pos1.y - pos2.y);
}
