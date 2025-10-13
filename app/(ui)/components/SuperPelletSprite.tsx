import Image from "next/image";
import { useEffect, useState } from "react";

type SuperPelletSpriteProps = {
    row: number,
    col: number,
    size?: number,
    fps?: number
};

const frames = [
    '/assets/SuperPellet.png',
    '/assets/SuperPellet2.png'
];

export function getAllSuperPelletSprites() {
    return document.querySelectorAll("[data-type='SmallPellet']");
}

export function getSuperPelletSprite(row: number, col: number) {
    return document.querySelector<HTMLDivElement>(`[data-r="${row}"][data-c="${col}"][data-type='SuperPellet']`);
}

export default function SuperPelletSprite({ row, col, size = 40, fps = 5 }: SuperPelletSpriteProps) {
    const [frame, setFrame] = useState(0);

    useEffect(() => {
        frames.forEach((src) => new window.Image().src = src);
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => setFrame((f) => (f + 1) % frames.length), 1000 / fps)
        return () => clearInterval(intervalId)
    }, [fps]);

    return <Image data-r={row} data-c={col} data-type='SuperPellet' src={frames[frame]} alt="Super Pellet" width={size} height={size} style={{ imageRendering: 'pixelated' }} />;
}