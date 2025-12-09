'use client';
import Image from 'next/image';

type SpriteProps = {
  src: string;
  size?: number;
  rotation?: number;
  flipX?: boolean;
  flipY?: boolean;
  style?: React.CSSProperties;
  className?: string;
};

export function Sprite({
  src,
  size = 40,
  rotation = 0,
  flipX = false,
  flipY = false,
  style,
  className,
}: SpriteProps) {
  return (
    <Image
      src={src}
      width={size}
      height={size}
      alt=""
      draggable={false}
      className={className}
      style={{
        pointerEvents: 'none',
        imageRendering: 'pixelated',
        transform: `
          rotate(${rotation}deg)
          scaleX(${flipX ? -1 : 1})
          scaleY(${flipY ? -1 : 1})
        `,
        position: 'absolute',
        ...style,
      }}
    />
  );
}
