import { getGhostSprite } from '../(ui)/components/GhostSprite';
import { getPacmanSprite } from '../(ui)/components/PacmanSprite';
import { getAllSmallPelletSprites } from '../(ui)/components/SmallPelletSprite';
import {
  getAllSuperPelletSprites,
  getSuperPelletSprite,
} from '../(ui)/components/SuperPelletSprite';
import { initialPelletAmount, LEVEL_MAP } from '../(ui)/game/MazeLayer';
import { spritesOverlapping } from './game-state-manager';
import {
  allDirections,
  Direction,
  GameState,
  GhostMode,
  GhostState,
  GhostType,
  PacManState,
  Position,
} from './types';
import { equalPos, posAt, tileIsFree } from './util/position';

/*
    WARNINGS
    - targetPoints can be outside the maze or on walls
*/

/*
    TODO
    - Timers are not functional programming (dont use Date.now())
    - frightened pauses schedule
    - EatenMode: double speed through tunnes
    - Blinky speeds up and stops scattering if only few pellets are left
*/

// Precompute tunnel runs by row when module loads
type TunnelRange = { row: number; startX: number; endX: number }; // inclusive indices

const TUNNEL_RANGES: TunnelRange[] = (function computeTunnelRanges() {
  const ranges: TunnelRange[] = [];
  for (let r = 0; r < LEVEL_MAP.length; r++) {
    let inRange = false;
    let rangeStart = -1;
    for (let c = 0; c < LEVEL_MAP[0].length; c++) {
      const isTunnel = LEVEL_MAP[r][c] === 6;
      if (isTunnel && !inRange) {
        inRange = true;
        rangeStart = c;
      } else if (!isTunnel && inRange) {
        ranges.push({ row: r, startX: rangeStart, endX: c - 1 });
        inRange = false;
      }
    }
    if (inRange) {
      ranges.push({
        row: r,
        startX: rangeStart,
        endX: LEVEL_MAP[0].length - 1,
      });
    }
  }
  return ranges;
})();

/**
 * If `pos` is a tunnel tile and there's another tunnel range on the same row,
 * teleport it to the equivalent offset inside the opposite range.
 * Only called for ghosts.
 */
function teleportGhostIfInTunnel(
  ghost: GhostState,
  newPos: Position
): Position {
  const prevPos = ghost.pos;
  const prevTile = LEVEL_MAP[prevPos.y]?.[prevPos.x];
  const nextTile = LEVEL_MAP[newPos.y]?.[newPos.x];

  // Only consider rows that contain tunnels
  const rangesOnRow = TUNNEL_RANGES.filter((r) => r.row === newPos.y);
  if (rangesOnRow.length < 2) return newPos;

  // Find which range we’re in
  const currentRange = rangesOnRow.find(
    (r) => newPos.x >= r.startX && newPos.x <= r.endX
  );
  if (!currentRange) return newPos;

  // We only teleport if:
  // - The ghost is currently ON the outermost tunnel tile
  // - And is trying to move OUT of the tunnel (next tile would be non-tunnel)
  // - And the tunnel is at the border of the map
  const movingLeft = newPos.x < prevPos.x;
  const movingRight = newPos.x > prevPos.x;

  const isAtLeftEdge = newPos.x === currentRange.startX;
  const isAtRightEdge = newPos.x === currentRange.endX;

  const goingOutLeft = isAtLeftEdge && movingLeft && currentRange.startX === 0;
  const goingOutRight =
    isAtRightEdge &&
    movingRight &&
    currentRange.endX === LEVEL_MAP[0].length - 1;

  if (!goingOutLeft && !goingOutRight) {
    return newPos; // not leaving the tunnel at the border
  }

  // Find opposite tunnel range
  const otherRange =
    rangesOnRow.length === 2
      ? rangesOnRow.find((r) => r !== currentRange)!
      : rangesOnRow.reduce((farthest, r) => {
          const curCenter = (currentRange.startX + currentRange.endX) / 2;
          const farCenter = (farthest.startX + farthest.endX) / 2;
          const rCenter = (r.startX + r.endX) / 2;
          return Math.abs(rCenter - curCenter) > Math.abs(farCenter - curCenter)
            ? r
            : farthest;
        }, rangesOnRow[0]);

  // Teleport to the OPPOSITE edge tile
  const targetX = goingOutLeft
    ? otherRange.endX // leaving left side → appear on far right edge
    : otherRange.startX; // leaving right side → appear on far left edge

  const targetPos = { x: targetX, y: otherRange.row };

  return targetPos;
}

let firstTickTimestamp: number;
let frightenedModeEnteredTimestamp: number;

// WARNING: HARDCODED
const housePos = { x: 14, y: 14 };

export function initalGhosts(): GhostState[] {
  return [
    {
      pos: { x: 15, y: 14 },
      sprite: 'clyde',
      dir: Direction.N,
      type: GhostType.CLYDE,
      mode: GhostMode.HOME,
    },
    {
      pos: { x: 13, y: 14 },
      sprite: 'inky',
      dir: Direction.N,
      type: GhostType.INKY,
      mode: GhostMode.HOME,
    },
    {
      pos: { x: 14, y: 14 },
      sprite: 'pinky',
      dir: Direction.N,
      type: GhostType.PINKY,
      mode: GhostMode.HOME,
    },
    {
      pos: { x: 13, y: 11 },
      sprite: 'blinky',
      dir: Direction.N,
      type: GhostType.BLINKY,
      mode: GhostMode.SCATTER,
    },
  ];
}

export function nextGhostStates(gameState: GameState): GhostState[] {
  return gameState.ghosts.map((ghost) => nextGhostState(gameState, ghost.type));
}

function nextGhostState(
  gameState: GameState,
  ghostType: GhostType
): GhostState {
  if (!firstTickTimestamp) firstTickTimestamp = Date.now();

  const ghost = findGhost(gameState, ghostType);
  const newMode = nextMode(gameState, ghost);
  const newPos = nextTile(
    ghost,
    newMode,
    calcTargetPoint(newMode, ghost, gameState)
  );

  const teleportedPos = teleportGhostIfInTunnel(ghost, newPos);

  const newFacing = calcFacing(ghost.pos, teleportedPos);

  return {
    pos: teleportedPos,
    dir: newFacing,
    mode: newMode,

    type: ghost.type,
    sprite: ghost.sprite,
  };
}

function nextTile(
  ghostState: GhostState,
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

function possiblePaths(
  ghostState: GhostState,
  nextMode: GhostMode
): Position[] {
  const freeTiles = freeTilesAround(ghostState.pos, ghostState.mode);
  if (
    freeTiles.length === 1 ||
    needsImmediateReverse(ghostState.mode, nextMode)
  )
    return freeTiles;

  return freeTiles.filter(
    (tile) =>
      !equalPos(
        tile,
        posAt(ghostState.pos, reverseDirection(ghostState.dir), 1)
      )
  );
}

function calcFacing(lastPoint: Position, nextPoint: Position): Direction {
  return allDirections().find((dir) =>
    equalPos(nextPoint, posAt(lastPoint, dir, 1))
  )!;
}

function nextMode(gameState: GameState, ghost: GhostState): GhostMode {
  if (ghost.mode === GhostMode.HOME)
    return canLeaveHouse(ghost.type) ? GhostMode.SCATTER : GhostMode.HOME;

  if (
    pacmanAteSuperPellet(gameState.pacman) &&
    ghost.mode !== GhostMode.EATEN
  ) {
    frightenedModeEnteredTimestamp = Date.now();
    return GhostMode.FRIGHTENED;
  }
  if (
    ghost.mode === GhostMode.FRIGHTENED &&
    spritesOverlapping(getPacmanSprite(), getGhostSprite(ghost.type))
  )
    return GhostMode.EATEN;
  if (
    ghost.mode === GhostMode.FRIGHTENED &&
    (Date.now() - frightenedModeEnteredTimestamp) / 1000 < 6
  )
    return GhostMode.FRIGHTENED;
  if (ghost.mode === GhostMode.EATEN && !equalPos(ghost.pos, housePos))
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
  ghost: GhostState,
  gameState: GameState
): Position {
  const ghostType = ghost.type;

  if (needsImmediateReverse(ghost.mode, nextMode))
    return posAt(ghost.pos, reverseDirection(ghost.dir), 1);

  if (LEVEL_MAP[ghost.pos.y][ghost.pos.x] === 4 && nextMode !== GhostMode.EATEN)
    return { x: 13, y: 11 };

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
    return housePos;
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
    default:
      return chaseMode();
  }
}

function needsImmediateReverse(prev: GhostMode, next: GhostMode): boolean {
  return (
    (prev !== next &&
      prev !== GhostMode.FRIGHTENED &&
      prev !== GhostMode.EATEN &&
      next !== GhostMode.EATEN) ||
    next === GhostMode.HOME
  );
}

function canLeaveHouse(ghostType: GhostType): boolean {
  const pelletsEaten =
    initialPelletAmount -
    (getAllSmallPelletSprites().length + getAllSuperPelletSprites().length);
  return ghostType === GhostType.BLINKY
    ? true
    : ghostType === GhostType.PINKY
      ? Date.now() - firstTickTimestamp > 4000
      : ghostType === GhostType.INKY
        ? pelletsEaten >= 30
        : pelletsEaten >= 60;
}

function findGhost(gameState: GameState, ghostType: GhostType): GhostState {
  return gameState.ghosts.find((ghost) => ghost.type === ghostType)!;
}

function pacmanAteSuperPellet(pacman: PacManState): boolean {
  return getSuperPelletSprite(pacman.pos.y, pacman.pos.x) !== null;
}

// Util functions -------------------------------------------

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
function freeTilesAround(pos: Position, ghostMode: GhostMode): Position[] {
  return allDirections()
    .filter((dir) =>
      tileIsFree(
        posAt(pos, dir, 1),
        LEVEL_MAP[pos.y][pos.x] === 4 || ghostMode === GhostMode.EATEN
      )
    )
    .map((dir) => posAt(pos, dir, 1));
}

function euclideanDistance(pos1: Position, pos2: Position): number {
  return Math.hypot(pos1.x - pos2.x, pos1.y - pos2.y);
}
