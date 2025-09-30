import Image from 'next/image';

export default function EmptyCell() {
  return <Image src="/assets/Empty.svg" width={40} height={40} alt="" />;
}
