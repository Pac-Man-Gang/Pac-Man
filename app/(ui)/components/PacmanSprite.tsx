import { PacMan } from "@/app/core/types";
import Image from "next/image";

type PacmanSpriteProps = {
    pacman: PacMan,
    size?: number,
    tileSize?: number
}

export default function PacmanSprite({ pacman, size = 32, tileSize = 20 }: PacmanSpriteProps) {
    const xPixel = Math.round(pacman.pos.x * tileSize + (tileSize - size) / 2)
    const yPixel = Math.round(pacman.pos.y * tileSize + (tileSize - size) / 2)

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
                src={'/assets/pacman/pacman.png'}
                alt="PACMAN"
                width={size}
                height={size}
                style={{ imageRendering: 'pixelated' }}
                priority
            />
        </div>
    );
}