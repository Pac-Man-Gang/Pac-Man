import Image from "next/image";

type SmallPelletSpriteProps = {
    row: number,
    col: number,
    size?: number
};

export function getAllSmallPelletSprites() {
    return document.querySelectorAll("[data-type='SmallPellet']");
}

export function getPelletSprite(row: number, col: number) {
    return document.querySelector<HTMLDivElement>(`[data-r="${row}"][data-c="${col}"]`);
}

export default function SmallPelletSprite({ row, col, size = 40 }: SmallPelletSpriteProps) {
    return <Image data-r={row} data-c={col} data-type='SmallPellet' src="/assets/SmallPellet.svg" alt="Small Pellet" width={size} height={size} />;
}