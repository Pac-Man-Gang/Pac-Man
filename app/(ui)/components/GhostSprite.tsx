import { Direction, Ghost, GhostType } from '@/app/core/types';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

type GhostSpriteProps = {
    ghost: Ghost,
    tickCallback: () => void,
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

export default function GhostSprite({ ghost, tickCallback, size = 32, tileSize = 20, fps = 6 }: GhostSpriteProps) {
    const [frame, setFrame] = useState(0);

    if (ghost.type === GhostType.PINKY) {
        console.log('');
    }

    const baseName = useMemo(() => ghost.sprite.replace('.png', ''), [ghost.sprite])
    const dirKey = DIR_KEY[ghost.dir]

    const frames = useMemo(() => [
        `/assets/ghost/${baseName}/${baseName}-${dirKey}.png`,
        `/assets/ghost/${baseName}/${baseName}2-${dirKey}.png`
    ], [baseName, dirKey])

    //preload once
    useEffect(() => {
        frames.forEach((src) => new window.Image().src = src);
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => setFrame((f) => (f + 1) % frames.length), 1000 / fps)
        return () => clearInterval(intervalId)
    }, [fps])

    const xPixel = Math.round(ghost.pos.x * tileSize + (tileSize - size) / 2)
    const yPixel = Math.round(ghost.pos.y * tileSize + (tileSize - size) / 2)

    return (
        <div style={{
            position: 'absolute',
            left: 0,
            right: 0,
            transform: `translate3d(${xPixel}px, ${yPixel}px, 0)`,
            transition: "transform 0.2s linear",
            willChange: "transform"
        }}
            onTransitionEnd={(e) => {
                if (e.propertyName === 'transform' && ghost.type === GhostType.BLINKY) tickCallback();
            }}
        >
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


