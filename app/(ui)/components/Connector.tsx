import Image from 'next/image';

export default function Connector({
  size = 40,
  rotation = 0,
  mirrored = false,
}) {
  return (
    <Image
      src="assets/Connector.svg"
      alt="Connector"
      width={size}
      height={size}
      style={{
        transform: `${mirrored ? 'scaleX(-1)' : ''} rotate(${rotation}deg)`,
      }}
    />
  );
}
