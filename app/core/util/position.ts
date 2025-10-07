import { LEVEL_MAP } from "@/app/(ui)/game/maze";
import { Position } from "../types";

export function equalPos(pos1: Position, pos2: Position): boolean {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

export function tileIsFree(pos: Position): boolean {
    return inBounds(pos) && LEVEL_MAP[pos.y][pos.x] === 0;
}

export function inBounds(pos: Position): boolean {
    return (
        pos.y >= 0 &&
        pos.y < LEVEL_MAP.length &&
        pos.x >= 0 &&
        pos.x < LEVEL_MAP[pos.y].length
    );
}