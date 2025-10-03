import Image from 'next/image';
import { Direction } from '../../core/types';

const SPRITES = {
  [Direction.N]: [
    'PacmanFacingUp.svg',
    'PacmanMouthOpenFacingUp.svg',
    'PacmanFacingUp.svg',
    'PacmanFull.svg',
  ],
  [Direction.S]: [
    'PacmanFacingDown.svg',
    'PacmanMouthOpenFacingDown.svg',
    'PacmanFacingDown.svg',
    'PacmanFull.svg',
  ],
  [Direction.E]: [
    'PacmanFacingRight.svg',
    'PacmanMouthOpenFacingRight.svg',
    'PacmanFacingRight.svg',
    'PacmanFull.svg',
  ],
  [Direction.W]: [
    'PacmanFacingLeft.svg',
    'PacmanMouthOpenFacingLeft.svg',
    'PacmanFacingLeft.svg',
    'PacmanFull.svg',
  ],
};

export const DEATH_SPRITES = [
  'PacmanDeathStart.svg',
  'PacmanDeath1.svg',
  'PacmanDeath2.svg',
  'PacmanDeath3.svg',
  'PacmanDeath4.svg',
  'PacmanDeath5.svg',
  'PacmanDeath6.svg',
  'PacmanDeath7.svg',
  'PacmanDeath8.svg',
  'PacmanDeath9.svg',
  'PacmanDeathEnd.svg',
];
export default function PacMan({
  direction,
  frame,
  pixelPos,
  isDead,
}: {
  direction: Direction;
  frame: number;
  pixelPos: { x: number; y: number };
  isDead: boolean;
}) {
  const sprite = isDead ? DEATH_SPRITES[frame] : SPRITES[direction][frame];

  return (
    <div
      style={{
        position: 'absolute',
        top: `${pixelPos.y}px`,
        left: `${pixelPos.x}px`,
      }}
    >
      <Image
        src={`/assets/pacman/${sprite}`}
        alt="Pac-Man"
        width={20}
        height={20}
      />
    </div>
  );
}
