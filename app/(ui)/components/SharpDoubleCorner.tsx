import Image from 'next/image';

export default function SharpDoubleCorner({ size = 40, rotation = 0 }) {
  return (
    <Image
      src="/assets/SharpDoubleCorner.svg"
      alt="Sharp Double Corner"
      width={size}
      height={size}
      style={{ transform: `rotate(${rotation}deg)` }}
    />
  );
}
