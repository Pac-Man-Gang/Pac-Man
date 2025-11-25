'use client';
import { Sprite } from '@/app/(ui)/sprites/Sprite';

type MazeTileProps = {
  tile: number;
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
  number,
  { src: string; rotation?: number; flipX?: boolean; flipY?: boolean }
> = {
  1: { src: '/assets/maze/SingleWall.svg' },
  2: { src: '/assets/maze/Connector.svg' },
  3: { src: '/assets/maze/DoubleWall.svg' },
  4: { src: '/assets/maze/WallStop.svg' },
  5: { src: '/assets/maze/ShortCorner.svg' },
  6: { src: '/assets/maze/DoubleCorner.svg' },
  7: { src: '/assets/maze/SharpDoubleCorner.svg' },
  // Add more as you need
};
