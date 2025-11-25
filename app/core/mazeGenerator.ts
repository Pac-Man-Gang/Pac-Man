'use client';
import data from '../../public/assets/maze/MazeChunks.json'



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

class RandomMaze {

    content: number[][];
    width: number;
    height: number;
    seed: number;

    constructor(width: number, height: number, seed: number) {
        this.width = width;
        this.height = height;
        this.seed = seed;
        this.content = Array(height).fill(null).map(() => Array(width).fill(0));
        this.generate();
    }

    private random(): number {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280;
    }

    private randomRange(min: number, max: number): number {
        return Math.floor(this.random() * (max - min + 1)) + min;
    }

    generate() {
        this.makeBorder();

        for (let i = 0; i < 10; i++) {
            let chunk: Chunk = this.getRandomChunk();
            let xRandom: number = Math.floor(this.randomRange(2, 25));
            let yRandom: number = Math.floor(this.randomRange(2, 21));
            this.insertChunk(xRandom, yRandom, chunk);
        }
    }

    makeBorder() {
        this.content[0] = Array(this.width).fill(1);
        this.content[this.content.length - 1] = Array(this.width).fill(1);

        for (let i = 0; i < this.content.length - 1; i++) {
            this.content[i][0] = 1;
            this.content[i][this.content[0].length - 1] = 1;
        }
    }

    getRandomChunk(): Chunk {
        const randomIndex = Math.floor(this.random() * data.chunks.length);
        return new Chunk(data.chunks[randomIndex]);
    }

    insertChunk(startX: number, startY: number, chunk: Chunk) {
        for (let i = 0; i < chunk.content.length; i++) {
            for (let j = 0; j < chunk.content[0].length; j++) {
                if (chunk.content[i][j] === 1) {
                    if (startX + i < this.content.length && startY + j < this.content[0].length) {
                        this.content[startX + i][startY + j] = chunk.content[i][j];
                    }
                }
            }
        }
    }
}

    

let maze = new RandomMaze(28, 31, 6711);
console.log(maze.content);
export const LEVEL_MAP_GENERATED: number[][] = maze.content;