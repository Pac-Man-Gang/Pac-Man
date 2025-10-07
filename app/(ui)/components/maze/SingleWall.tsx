import Image from 'next/image';

export default function DoubleWall({
  size = 50,
  rotation = 0,
  mirrored = false,
}) {
  return (
    <Image
      src="/assets/maze/SingleWall.svg"
      alt="Single Wall"
      width={size}
      height={size}
      style={{
        transform: `${mirrored ? 'scaleX(-1)' : ''} rotate(${rotation}deg)`,
      }}
    />
  );
}
