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

const TILE_SPRITES: Record<
  string,
  { src: string; rotation?: number; flipX?: boolean; flipY?: boolean }
> = {
  // Variations of single wall
  singleWall: { src: '/assets/maze/SingleWall.svg' },
  singleWallFlipped: { src: '/assets/maze/SingleWall.svg', flipX: true },
  singleWallRotateRight: {
    src: '/assets/maze/SingleWall.svg',
    rotation: 90,
  },
  singleWallRotateLeft: { src: '/assets/maze/SingleWall.svg', rotation: -90 },

  // Variations of connector
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

  // Variations of double wall
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

  // Variations of wall stop
  wallStop: { src: '/assets/maze/WallStop.svg' },
  wallStopFlipped: { src: '/assets/maze/WallStop.svg', flipX: true },

  // Variations of corner
  shortCorner: { src: '/assets/maze/ShortCorner.svg' },
  shortCornerReverse: { src: '/assets/maze/ShortCorner.svg', rotation: 180 },
  shortCornerRotateRight: { src: '/assets/maze/ShortCorner.svg', rotation: 90 },
  shortCornerRotateLeft: { src: '/assets/maze/ShortCorner.svg', rotation: -90 },
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
  // Add more as you need
};
