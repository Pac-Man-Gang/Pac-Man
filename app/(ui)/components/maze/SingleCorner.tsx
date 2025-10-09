import Image from 'next/image';

export default function SingleCorner({ size = 50, rotation = 0 }) {
  return (
    <Image
      src="/assets/maze/NormalCorner.svg"
      alt="Single Corner"
      width={size}
      height={size}
      style={{ transform: `rotate(${rotation}deg)` }}
    />
  );
}
