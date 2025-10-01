import Image from 'next/image';

export default function EmptyCell({ size = 40 }) {
  return (
    <Image
      src="/assets/Empty.svg"
      alt="Empty Cell"
      width={size}
      height={size}
    />
  );
}
