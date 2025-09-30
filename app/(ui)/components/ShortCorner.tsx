import Image from 'next/image';

export default function ShortCorner({
  size = 50,
  rotation = 0,
  mirrored = false,
}) {
  const src = mirrored
    ? '/assets/ShortCorner.svg'
    : '/assets/RightShortCorner.svg';

  return (
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      style={{ transform: `rotate(${rotation}deg)` }}
    />
  );
}
