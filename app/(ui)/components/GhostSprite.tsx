import { Direction, Ghost } from '@/app/core/types';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

type GhostSpriteProps = {
    ghost: Ghost,
    size?: number,
    tileSize?: number,
    fps?: number
}

const DIR_KEY: Record<Direction, 'N' | 'E' | 'S' | 'W'> = {
    [Direction.N]: 'N',
    [Direction.E]: 'E',
    [Direction.S]: 'S',
    [Direction.W]: 'W',
}


export default function GhostSprite({ ghost, size = 32, tileSize = 20, fps = 5 }: GhostSpriteProps) {
    const [frame, setFrame] = useState(0);

    const baseName = useMemo(() => ghost.sprite.replace('.png', ''), [ghost.sprite])
    const dirKey = DIR_KEY[ghost.dir]

    const frames = useMemo(() => [
        `/assets/ghost/${baseName}/${baseName}-${dirKey}.png`,
        `/assets/ghost/${baseName}/${baseName}2-${dirKey}.png`
    ], [baseName, dirKey])

    useEffect(() => {
        frames.forEach((src) => new window.Image().src = src);
    }, [frames]);

    useEffect(() => {
        const id = setInterval(() => setFrame((f) => (f + 1) % frames.length), 1000 / fps)
        return () => clearInterval(id)
    }, [fps, frames.length])

    const xPixel = Math.round(ghost.pos.x * tileSize + (tileSize - size) / 2)
    const yPixel = Math.round(ghost.pos.y * tileSize + (tileSize - size) / 2)

    return (
        <div style={{
            position: 'absolute',
            left: 0,
            right: 0,
            transform: `translate3d(${xPixel}px, ${yPixel}px, 0)`,
            transition: "transform 0.4s linear",
            willChange: "transform"
        }}>
            <Image
                src={frames[frame]}
                alt="BLINKY"
                width={size}
                height={size}
                style={{ imageRendering: 'pixelated' }}
                priority
            />
        </div>
    );
}