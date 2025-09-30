import Image from "next/image";

export default function Connector({
  size = 50,
  rotation = 0,
  mirrored = false,
}) {
  const src = mirrored ? '/assets/ConnectorLeft.svg' : '/assets/Connector.svg';

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
