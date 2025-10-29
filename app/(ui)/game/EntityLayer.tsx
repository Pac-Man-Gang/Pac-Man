import { allGhostTypes, Direction, PacManState } from '@/app/core/types';
import GhostSprite from '../components/GhostSprite';
import PacmanSprite from '../components/PacmanSprite';

type GhostLayerProps = {
  pacman: PacManState;
  uiPlayerDir?: Direction;
};

export default function EntityLayer({
  pacman,
  uiPlayerDir,
}: GhostLayerProps) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
      <PacmanSprite />
      {allGhostTypes().map((type) => (
        <GhostSprite key={type} ghostType={type} />
      ))}
    </div>
  );
}
