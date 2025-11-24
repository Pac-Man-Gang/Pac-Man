import { ReactElement } from "react";

// Creates random number without Math.random()
function seededRandom(seed: number): Function {
    let value = seed;
    return function() {
        value = (value * 9301 + 49297) % 233280;
        return value / 233280;
    };
}

class Chunk {
    
    content: number[][];
    width: number;
    height: number;

    constructor(chunkArray: number[][]) {
        this.width = chunkArray.length;
        this.height = chunkArray[0].length;
        this.content = chunkArray
    }

    


}

let testChunk: Chunk = new Chunk()

class RandomMaze {

    content: number[][];
    width: number;
    height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.content = Array(height).fill(null).map(() => Array(width).fill(0));
    }



}

    


let maze = new RandomMaze(28, 31);
export const LEVEL_MAP_GENERATED: number[][] = maze.content;