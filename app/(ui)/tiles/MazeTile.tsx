'use client';
import { Sprite } from '@/app/(ui)/sprites/Sprite';

type MazeTileProps = {
  tile: string;
  size?: number;
};

export function MazeTile({ tile, size = 40 }: MazeTileProps) {
  const info = TILE_SPRITES[tile];
  if (!info) return null;

  const { src, rotation = 0, flipX = false, flipY = false } = info;

  return (
    <Sprite
      src={src}
      size={size}
      rotation={rotation}
      flipX={flipX}
      flipY={flipY}
    />
  );
}

/**
 * TILE_SPRITES
 * -------------
 * A complete lookup table for every maze tile variant in the game.
 *
 * Each entry provides:
 *  - src: the base SVG image
 *  - rotation: degrees to rotate the sprite (0, 90, -90, 180)
 *  - flipX / flipY: optional horizontal/vertical mirroring
 *
 * Why so many variants?
 * ----------------------
 * Pac-Man style mazes rely heavily on precise symmetry.
 * The same base SVG is reused in different orientations, so each variant
 * (corner type, connector type, wall alignment) is resolved in logic
 * and mapped here to a final sprite presentation.
 *
 * Example:
 *   "doubleWallRotateLeft" → uses DoubleWall.svg rotated -90 degrees.
 *
 * These names match exactly what defineWall(), defineCorner(),
 * defineInsideCorner(), and defineConnector() return.
 */

const TILE_SPRITES: Record<
  string,
  { src: string; rotation?: number; flipX?: boolean; flipY?: boolean }
> = {
  // ============================================================
  // SPECIAL / DEFAULT TILES
  // ============================================================
  emptyCell: { src: '/assets/Empty.svg' },

  // ============================================================
  // SINGLE WALL SEGMENTS
  // For thin 1-direction wall pieces: used mostly for outer edges.
  // ============================================================
  singleWall: { src: '/assets/maze/SingleWall.svg' },
  singleWallFlipped: { src: '/assets/maze/SingleWall.svg', flipX: true },

  // Single wall rotated 90° clockwise (vertical orientation)
  singleWallRotateRight: {
    src: '/assets/maze/SingleWall.svg',
    rotation: 90,
  },

  // Single wall rotated 90° counter-clockwise
  singleWallRotateLeft: {
    src: '/assets/maze/SingleWall.svg',
    rotation: -90,
  },

  // Flipped horizontal + rotated
  singleWallFlippedRotateRight: {
    src: '/assets/maze/SingleWall.svg',
    rotation: 90,
    flipX: true,
  },
  singleWallFlippedRotateLeft: {
    src: '/assets/maze/SingleWall.svg',
    rotation: -90,
    flipX: true,
  },

  // ============================================================
  // CONNECTORS (T-JUNCTIONS & 4-WAY CROSSINGS)
  // These tiles visually represent junctions where 3 or 4 paths meet.
  //
  // connector            — default orientation (open upward)
  // connectorReverse     — flipped 180° (open downward)
  // RotateRight/Left     — open to right/left
  // Flipped              — used for mirrored layouts in the maze
  // ============================================================
  connector: { src: '/assets/maze/Connector.svg' },
  connectorReverse: { src: '/assets/maze/Connector.svg', rotation: 180 },
  connectorFlipped: { src: '/assets/maze/Connector.svg', flipX: true },
  connectorFlippedReverse: {
    src: '/assets/maze/Connector.svg',
    flipX: true,
    rotation: 180,
  },

  connectorRotateRight: { src: '/assets/maze/Connector.svg', rotation: 90 },
  connectorFlippedRotateRight: {
    src: '/assets/maze/Connector.svg',
    rotation: 90,
    flipY: true,
  },

  connectorRotateLeft: { src: '/assets/maze/Connector.svg', rotation: -90 },
  connectorFlippedRotateLeft: {
    src: '/assets/maze/Connector.svg',
    rotation: -90,
    flipY: true,
  },

  // ============================================================
  // DOUBLE WALLS (STRAIGHT THICK WALLS)
  // Used for the wider, double-line walls typical in Pac-Man.
  // ============================================================
  doubleWall: { src: '/assets/maze/DoubleWall.svg' },
  doubleWallFlipped: { src: '/assets/maze/DoubleWall.svg', flipX: true },
  doubleWallRotateRight: {
    src: '/assets/maze/DoubleWall.svg',
    rotation: 90,
  },
  doubleWallRotateLeft: {
    src: '/assets/maze/DoubleWall.svg',
    rotation: -90,
  },

  // ============================================================
  // WALL STOP / DEAD END
  // A single-direction wall endcap.
  // Used when a wall ends abruptly (like cul-de-sacs).
  // ============================================================
  wallStop: { src: '/assets/maze/WallStop.svg' },
  wallStopFlipped: { src: '/assets/maze/WallStop.svg', flipX: true },

  // ============================================================
  // CORNERS (OUTSIDE + INSIDE VARIANTS)
  // These are the most visually complex pieces.
  // shortCorner         — inside corner (tight turn)
  // doubleCorner        — large outer corner (rounded)
  // sharpDoubleCorner   — sharper version for ghost house / inner maze
  // normalCorner        — default outside corner look
  //
  // All exist in multiple rotations.
  // ============================================================

  // ---- Inside / short corners ----
  shortCorner: { src: '/assets/maze/ShortCorner.svg' },
  shortCornerReverse: { src: '/assets/maze/ShortCorner.svg', rotation: 180 },
  shortCornerRotateRight: { src: '/assets/maze/ShortCorner.svg', rotation: 90 },
  shortCornerRotateLeft: {
    src: '/assets/maze/ShortCorner.svg',
    rotation: -90,
  },

  // ---- Outside rounded corners ----
  doubleCorner: { src: '/assets/maze/DoubleCorner.svg' },
  doubleCornerReverse: { src: '/assets/maze/DoubleCorner.svg', rotation: 180 },
  doubleCornerRotateRight: {
    src: '/assets/maze/DoubleCorner.svg',
    rotation: 90,
  },
  doubleCornerRotateLeft: {
    src: '/assets/maze/DoubleCorner.svg',
    rotation: -90,
  },

  // ---- Sharp corners (used for ghost house or tight turns) ----
  sharpDoubleCorner: { src: '/assets/maze/SharpDoubleCorner.svg' },
  sharpDoubleCornerReverse: {
    src: '/assets/maze/SharpDoubleCorner.svg',
    rotation: 180,
  },
  sharpDoubleCornerRotateRight: {
    src: '/assets/maze/SharpDoubleCorner.svg',
    rotation: 90,
  },
  sharpDoubleCornerRotateLeft: {
    src: '/assets/maze/SharpDoubleCorner.svg',
    rotation: -90,
  },

  // ---- Neutral/default corners ----
  normalCorner: { src: '/assets/maze/NormalCorner.svg' },
  normalCornerReverse: {
    src: '/assets/maze/NormalCorner.svg',
    rotation: 180,
  },
  normalCornerRotateRight: {
    src: '/assets/maze/NormalCorner.svg',
    rotation: 90,
  },
  normalCornerRotateLeft: {
    src: '/assets/maze/NormalCorner.svg',
    rotation: -90,
  },

  // ============================================================
  // (More tiles can be added here — tunnels, special ghost-house tiles, etc.)
  // ============================================================
};
