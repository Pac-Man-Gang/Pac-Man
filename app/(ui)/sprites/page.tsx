import { Sprite } from '@/app/(ui)/sprites/Sprite';

export default function Test() {
  return (
    <div style={{ position: 'relative', width: 200, height: 200 }}>
      <Sprite src="/assets/pacman/pacman1.png" size={400} rotation={90} />
    </div>
  );
}
