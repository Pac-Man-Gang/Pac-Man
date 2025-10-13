import Image from 'next/image';

export default function DoubleCorner({ size = 50, rotation = 0 }) {
  return (
    <Image
      src="/assets/maze/DoubleCorner.svg"
      alt=""
      width={size}
      height={size}
      style={{ transform: `rotate(${rotation}deg)` }}
    />
  );
}
