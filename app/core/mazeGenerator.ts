import data from '../../public/assets/maze/MazeChunks.json'

interface ChunkData {
    weight: number;
    validAsBorder: string[]
    data: number[][];
}

class Chunk {
    
    content: number[][];
    width: number;
    height: number;
    weight: number;
    validAsBorder: string[];

    constructor(chunkArray: number[][], weight: number, validAsBorder: string[]) {
        this.height = chunkArray.length;
        this.width = chunkArray[0].length;
        this.content = chunkArray;
        this.weight = weight;
        this.validAsBorder = validAsBorder;
        this.validAsBorder = validAsBorder;
    }
}

class RandomMaze {

    content: number[][];
    width: number;
    height: number;
    seed: number;
    chunkMap: string[][][];
    private chunks: Chunk[];
    private placedChunks: (Chunk | null)[][];

    constructor(width: number, height: number, seed: number) {
        this.width = width;
        this.height = height;
        this.seed = seed;
        this.content = this.fillContentArray();
        this.chunks = this.getChunkData();
        this.chunkMap = this.fillChunkMap();
        this.placedChunks = [];
        // Generate actual maze
        this.generate();
    }

    // Helper function to not use math.random
    private random(): number {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280;
    }

    getChunkData() {
        return (data.chunks as ChunkData[]).map( chunkData => new Chunk(chunkData.data, chunkData.weight, chunkData.validAsBorder));
    }

    fillContentArray() {
        let content = Array(this.height).fill(null).map(() => Array(this.width).fill(0));
        return content;
    }

    fillChunkMap() {
        let chunkMap = Array(this.height / 5).fill(null).map(() => Array(this. width / 5).fill([]));
        const lastRow = chunkMap.length - 1;
        const lastCol = chunkMap[0].length - 1;

        chunkMap[0][0] = ["N", "W"];
        chunkMap[0][lastCol] = ["N", "E"];
        chunkMap[lastRow][0] = ["S", "W"];
        chunkMap[lastRow][lastCol] = ["S", "E"];
        for (let i = 1; i < chunkMap[0].length - 1; i ++) {
            chunkMap[0][i] = ["N"];
            chunkMap[lastRow][i] = ["S"];
        }
        for (let j = 1; j < chunkMap.length - 1; j ++) {
            chunkMap[j][0] = ["W"];
            chunkMap[j][lastCol] = ["E"];
        }

        return chunkMap;
    }

    private arraysEqual(arr1: string[], arr2: string[]): boolean {
        if (arr1.length !== arr2.length) return false;
        const sorted1 = [...arr1].sort();
        const sorted2 = [...arr2].sort();
        return sorted1.every((val, index) => val === sorted2[index]);
    }

    private containsAllDirections(chunkDirections: string[], requiredDirections: string[]): boolean {
        return requiredDirections.every(dir => chunkDirections.includes(dir));
    }

    private isCorner(requiredDirections: string[]): boolean {
        return requiredDirections.length === 2;
    }

    // Get the opposite direction for adjacency checking
    private getOppositeDirection(direction: string): string {
        const opposites: { [key: string]: string } = {
            'N': 'S',
            'S': 'N',
            'E': 'W',
            'W': 'E'
        };
        return opposites[direction];
    }

    // Get already placed chunk at a specific grid position
    private getPlacedChunk(chunkRow: number, chunkCol: number): Chunk | null {
        if (chunkRow < 0 || chunkRow >= this.height / 5 || chunkCol < 0 || chunkCol >= this.width / 5) {
            return null;
        }
        // Check if a chunk has been placed at this position
        const actualRow = chunkRow * 5;
        const actualCol = chunkCol * 5;

        // If the position hasn't been generated yet, return null
        if (actualRow >= this.content.length || actualCol >= this.content[0].length) {
            return null;
        }

        return this.placedChunks[chunkRow]?.[chunkCol] || null;
    }

    // Check if a chunk is compatible with adjacent chunks
    private isCompatibleWithNeighbors(chunk: Chunk, chunkRow: number, chunkCol: number): boolean {
        const directions = [
            { dir: 'N', rowOffset: -1, colOffset: 0 },
            { dir: 'S', rowOffset: 1, colOffset: 0 },
            { dir: 'E', rowOffset: 0, colOffset: 1 },
            { dir: 'W', rowOffset: 0, colOffset: -1 }
        ];

        for (const { dir, rowOffset, colOffset } of directions) {
            const neighbor = this.getPlacedChunk(chunkRow + rowOffset, chunkCol + colOffset);

            if (neighbor) {
                const oppositeDir = this.getOppositeDirection(dir);

                const chunkHasOpening = chunk.validAsBorder.includes(dir);
                const neighborHasOpening = neighbor.validAsBorder.includes(oppositeDir);

                // To prevent dead ends, openings must match on both sides:
                // - If chunk has an opening towards the neighbor, neighbor MUST have an opening back
                // - If chunk is closed towards the neighbor, neighbor MUST also be closed
                // This ensures paths always have two ways through
                if (chunkHasOpening !== neighborHasOpening) {
                    return false; // This would create a dead end (mismatch)
                }
            }
        }

        return true;
    }

    generate() {
        // Initialize a map to store placed chunks
        this.placedChunks = Array(this.height / 5).fill(null).map(() => Array(this.width / 5).fill(null));

        for (let i = 0; i < this.content.length; i+=5) {
            for (let j = 0; j < this.content[i].length; j+=5) {
                const chunkRow = i / 5;
                const chunkCol = j / 5;
                let validChunks;

                if (i === 0 || i === this.content.length - 5 || j === 0 || j === this.content[i].length - 5) {
                    const requiredDirections = this.chunkMap[chunkRow][chunkCol];

                    if (this.isCorner(requiredDirections)) {
                        // Corners: exact match only
                        validChunks = this.chunks.filter(chunk => this.arraysEqual(chunk.validAsBorder, requiredDirections));
                    } else {
                        // Sides: must contain the required direction(s), but can have more
                        validChunks = this.chunks.filter(chunk => this.containsAllDirections(chunk.validAsBorder, requiredDirections));
                    }
                } else {
                    validChunks = this.chunks;
                }

                // Filter chunks based on compatibility with neighbors to prevent dead ends
                const compatibleChunks = validChunks.filter(chunk =>
                    this.isCompatibleWithNeighbors(chunk, chunkRow, chunkCol)
                );

                // If no compatible chunks found, fall back to any valid chunk (shouldn't happen with good chunk design)
                const chunksToUse = compatibleChunks.length > 0 ? compatibleChunks : validChunks;

                const randomIndex = Math.floor(this.random() * chunksToUse.length);
                const selectedChunk = chunksToUse[randomIndex];

                // Store the placed chunk
                this.placedChunks[chunkRow][chunkCol] = selectedChunk;

                this.insertChunk(i, j, selectedChunk);
            }
        }
        this.cleanUpMaze();
    }    

    isValidChunkPosition(chunk: Chunk, x: number, y: number) {
        return true
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

    cleanUpMaze() {
        let len = this.content[0].length - 1;
        this.content.splice(0, 1);
        this.content.splice(this.content.length - 1 , 1);
        for (let i = 0; i < this.content.length; i++) {
            this.content[i].splice(0, 1);
            this.content[i].splice(len - 1, 1);
        }
    }
}

    

// Generate maze only on client-side to avoid hydration mismatch
export function generateMaze(width: number = 30, height: number = 30): number[][] {
    const maze = new RandomMaze(width, height, 1);
    console.log(maze.content);
    return maze.content;
}

// For backwards compatibility, export a lazy-initialized maze
let cachedMaze: number[][] | null = null;
export const LEVEL_MAP_GENERATED: number[][] = new Proxy([] as number[][], {
    get(target, prop) {
        if (!cachedMaze && typeof window !== 'undefined') {
            cachedMaze = generateMaze();
        }
        return cachedMaze ? (cachedMaze as any)[prop] : (target as any)[prop];
    }
});