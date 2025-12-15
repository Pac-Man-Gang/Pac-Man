import { devToolsGhostsEnabled } from '@/app/core/dev-tools';
import { allGhostTypes } from '@/app/core/types';
import GhostSprite from '../components/GhostSprite';
import PacmanSprite from '../components/PacmanSprite';

export default function EntityLayer() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
      <PacmanSprite />
      {devToolsGhostsEnabled() && allGhostTypes().map((type) => (
        <GhostSprite key={type} ghostType={type} />
      ))}
    </div>
  );
}
