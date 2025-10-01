import Image from 'next/image';

export default function ShortCorner({
  size = 40,
  rotation = 0,
  mirrored = false,
}) {
  return (
    <Image
      src="/assets/ShortCorner.svg"
      alt="Short Corner"
      width={size}
      height={size}
      style={{
        transform: `${mirrored ? 'scaleX(-1)' : ''} rotate(${rotation}deg)`,
      }}
    />
  );
}
