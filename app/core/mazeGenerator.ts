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
        // Place ghost house first, then generate maze around it
        this.placeGhostHouse();
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

    // Place ghost house in the center of the maze
    private placeGhostHouse() {
        // Ghost house is 7 tiles wide x 5 tiles tall in classic Pac-Man
        const ghostHouseWidth = 7;
        const ghostHouseHeight = 5;

        // Calculate starting position (in tile coordinates, centered)
        const startRow = Math.floor((this.height - ghostHouseHeight) / 2);
        const startCol = Math.floor((this.width - ghostHouseWidth) / 2);

        // Classic ghost house layout:
        //  1111111
        //  1444444
        //  1444444
        //  1444444
        //  1111111
        const ghostHousePattern = [
            [1, 1, 4, 4, 4, 1, 1],
            [1, 4, 4, 4, 4, 4, 1],
            [1, 4, 4, 4, 4, 4, 1],
            [1, 4, 4, 4, 4, 4, 1],
            [1, 1, 1, 1, 1, 1, 1]
        ];

        // Place the ghost house pattern in the content array
        for (let i = 0; i < ghostHouseHeight; i++) {
            for (let j = 0; j < ghostHouseWidth; j++) {
                const row = startRow + i;
                const col = startCol + j;
                if (row >= 0 && row < this.height && col >= 0 && col < this.width) {
                    this.content[row][col] = ghostHousePattern[i][j];
                }
            }
        }

        // Mark the chunks that contain the ghost house as occupied
        // This will prevent the generation algorithm from placing chunks there
        const startChunkRow = Math.floor(startRow / 5);
        const endChunkRow = Math.floor((startRow + ghostHouseHeight - 1) / 5);
        const startChunkCol = Math.floor(startCol / 5);
        const endChunkCol = Math.floor((startCol + ghostHouseWidth - 1) / 5);

        // Mark these chunk positions so generation skips them
        for (let chunkRow = startChunkRow; chunkRow <= endChunkRow; chunkRow++) {
            for (let chunkCol = startChunkCol; chunkCol <= endChunkCol; chunkCol++) {
                if (!this.placedChunks[chunkRow]) {
                    this.placedChunks[chunkRow] = [];
                }
                // Use a special marker to indicate ghost house
                this.placedChunks[chunkRow][chunkCol] = null;
            }
        }
    }

    // Check if a chunk position overlaps with ghost house
    private isGhostHouseChunk(chunkRow: number, chunkCol: number): boolean {
        const ghostHouseWidth = 7;
        const ghostHouseHeight = 5;

        const startRow = Math.floor((this.height - ghostHouseHeight) / 2);
        const startCol = Math.floor((this.width - ghostHouseWidth) / 2);

        const startChunkRow = Math.floor(startRow / 5);
        const endChunkRow = Math.floor((startRow + ghostHouseHeight - 1) / 5);
        const startChunkCol = Math.floor(startCol / 5);
        const endChunkCol = Math.floor((startCol + ghostHouseWidth - 1) / 5);

        return chunkRow >= startChunkRow && chunkRow <= endChunkRow &&
               chunkCol >= startChunkCol && chunkCol <= endChunkCol;
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

    // Check if a chunk is compatible with adjacent chunks (both placed and future)
    private isCompatibleWithNeighbors(chunk: Chunk, chunkRow: number, chunkCol: number): boolean {
        const directions = [
            { dir: 'N', rowOffset: -1, colOffset: 0 },
            { dir: 'S', rowOffset: 1, colOffset: 0 },
            { dir: 'E', rowOffset: 0, colOffset: 1 },
            { dir: 'W', rowOffset: 0, colOffset: -1 }
        ];

        for (const { dir, rowOffset, colOffset } of directions) {
            const neighborRow = chunkRow + rowOffset;
            const neighborCol = chunkCol + colOffset;
            const neighbor = this.getPlacedChunk(neighborRow, neighborCol);

            if (neighbor) {
                // Check compatibility with already placed neighbor
                const oppositeDir = this.getOppositeDirection(dir);

                const chunkHasOpening = chunk.validAsBorder.includes(dir);
                const neighborHasOpening = neighbor.validAsBorder.includes(oppositeDir);

                // Openings must match on both sides to prevent dead ends
                if (chunkHasOpening !== neighborHasOpening) {
                    return false;
                }
            } else {
                // Check if neighbor is a ghost house chunk (treat as wall/blocked)
                if (this.isGhostHouseChunk(neighborRow, neighborCol)) {
                    // Ghost house acts like a wall - chunk should NOT have an opening towards it
                    const chunkHasOpening = chunk.validAsBorder.includes(dir);
                    if (chunkHasOpening) {
                        return false; // Can't open towards ghost house
                    }
                } else {
                    // Check if a future neighbor position exists
                    const hasNeighborPosition = neighborRow >= 0 &&
                                              neighborRow < this.height / 5 &&
                                              neighborCol >= 0 &&
                                              neighborCol < this.width / 5;

                    if (hasNeighborPosition) {
                        // Ensure that if this chunk has an opening in this direction,
                        // there exists at least one valid chunk for the neighbor position
                        // that can connect back
                        const chunkHasOpening = chunk.validAsBorder.includes(dir);

                        if (chunkHasOpening) {
                            // Check if the future neighbor position can have a chunk that connects back
                            if (!this.canFutureNeighborConnect(neighborRow, neighborCol, this.getOppositeDirection(dir), chunkRow, chunkCol)) {
                                return false;
                            }
                        }
                    }
                }
            }
        }

        return true;
    }

    // Check if a future neighbor position can have at least one valid chunk that connects back
    private canFutureNeighborConnect(
        neighborRow: number,
        neighborCol: number,
        requiredDirection: string,
        currentRow: number,
        currentCol: number
    ): boolean {
        // Get the required border directions for the neighbor position
        const requiredBorderDirs = this.chunkMap[neighborRow][neighborCol];

        // Get valid chunks for this position
        let validChunks;
        const isNeighborOnBorder = neighborRow === 0 ||
                                   neighborRow === (this.height / 5) - 1 ||
                                   neighborCol === 0 ||
                                   neighborCol === (this.width / 5) - 1;

        if (isNeighborOnBorder) {
            if (this.isCorner(requiredBorderDirs)) {
                validChunks = this.chunks.filter(chunk => this.arraysEqual(chunk.validAsBorder, requiredBorderDirs));
            } else {
                validChunks = this.chunks.filter(chunk => this.containsAllDirections(chunk.validAsBorder, requiredBorderDirs));
            }
        } else {
            validChunks = this.chunks;
        }

        // Check if any valid chunk has the required opening
        // and is compatible with OTHER already-placed neighbors
        for (const potentialChunk of validChunks) {
            if (potentialChunk.validAsBorder.includes(requiredDirection)) {
                // Temporarily simulate placing this chunk to check compatibility with other neighbors
                if (this.isChunkCompatibleWithOtherNeighbors(potentialChunk, neighborRow, neighborCol, currentRow, currentCol)) {
                    return true; // At least one valid chunk exists
                }
            }
        }

        return false; // No valid chunk can connect back
    }

    // Check if a chunk is compatible with neighbors, excluding one specific position
    private isChunkCompatibleWithOtherNeighbors(
        chunk: Chunk,
        chunkRow: number,
        chunkCol: number,
        excludeRow: number,
        excludeCol: number
    ): boolean {
        const directions = [
            { dir: 'N', rowOffset: -1, colOffset: 0 },
            { dir: 'S', rowOffset: 1, colOffset: 0 },
            { dir: 'E', rowOffset: 0, colOffset: 1 },
            { dir: 'W', rowOffset: 0, colOffset: -1 }
        ];

        for (const { dir, rowOffset, colOffset } of directions) {
            const neighborRow = chunkRow + rowOffset;
            const neighborCol = chunkCol + colOffset;

            // Skip the excluded position (the chunk we're currently placing)
            if (neighborRow === excludeRow && neighborCol === excludeCol) {
                continue;
            }

            // Check if neighbor is a ghost house chunk
            if (this.isGhostHouseChunk(neighborRow, neighborCol)) {
                // Ghost house acts like a wall - chunk should NOT have an opening towards it
                const chunkHasOpening = chunk.validAsBorder.includes(dir);
                if (chunkHasOpening) {
                    return false;
                }
                continue;
            }

            const neighbor = this.getPlacedChunk(neighborRow, neighborCol);

            if (neighbor) {
                const oppositeDir = this.getOppositeDirection(dir);
                const chunkHasOpening = chunk.validAsBorder.includes(dir);
                const neighborHasOpening = neighbor.validAsBorder.includes(oppositeDir);

                if (chunkHasOpening !== neighborHasOpening) {
                    return false;
                }
            }
        }

        return true;
    }

    generate() {
        // Initialize a map to store placed chunks
        this.placedChunks = Array(this.height / 5).fill(null).map(() => Array(this.width / 5).fill(null));

        const maxAttempts = 100; // Maximum retry attempts for entire maze generation
        let attempt = 0;
        let success = false;

        while (attempt < maxAttempts && !success) {
            attempt++;

            // Reset the maze and placed chunks for new attempt
            this.content = this.fillContentArray();
            this.placedChunks = Array(this.height / 5).fill(null).map(() => Array(this.width / 5).fill(null));

            // Re-place ghost house after reset
            this.placeGhostHouse();

            try {
                success = this.generateWithBacktracking();
            } catch (e) {
                // Failed to generate, try again with different random seed
                this.seed += 1;
            }
        }

        if (!success) {
            console.warn('Failed to generate maze without dead ends after', maxAttempts, 'attempts. Using last attempt.');
        }

        this.placePellets();
        this.cleanUpMaze();
    }

    // Place pellets on all empty spaces except around the ghost house
    private placePellets() {
        const ghostHouseWidth = 7;
        const ghostHouseHeight = 5;

        // Calculate ghost house boundaries
        const ghostStartRow = Math.floor((this.height - ghostHouseHeight) / 2);
        const ghostEndRow = ghostStartRow + ghostHouseHeight - 1;
        const ghostStartCol = Math.floor((this.width - ghostHouseWidth) / 2);
        const ghostEndCol = ghostStartCol + ghostHouseWidth - 1;

        // Define exclusion zone around ghost house (1 tile buffer)
        const exclusionStartRow = ghostStartRow - 1;
        const exclusionEndRow = ghostEndRow + 1;
        const exclusionStartCol = ghostStartCol - 1;
        const exclusionEndCol = ghostEndCol + 1;

        for (let i = 0; i < this.content.length; i++) {
            for (let j = 0; j < this.content[i].length; j++) {
                // Check if position is empty (0)
                if (this.content[i][j] === 0) {
                    // Check if position is outside the ghost house exclusion zone
                    const isInExclusionZone = i >= exclusionStartRow && i <= exclusionEndRow &&
                                             j >= exclusionStartCol && j <= exclusionEndCol;

                    if (!isInExclusionZone) {
                        // Place a pellet
                        this.content[i][j] = 2;
                    }
                }
            }
        }
    }

    private generateWithBacktracking(): boolean {
        // Track placement order for backtracking
        const placementStack: Array<{row: number, col: number, chunk: Chunk}> = [];

        for (let i = 0; i < this.content.length; i+=5) {
            for (let j = 0; j < this.content[i].length; j+=5) {
                const chunkRow = i / 5;
                const chunkCol = j / 5;

                // Skip chunks that overlap with ghost house
                if (this.isGhostHouseChunk(chunkRow, chunkCol)) {
                    continue;
                }

                let placed = false;
                let backtrackCount = 0;
                const maxBacktracks = 10;

                while (!placed && backtrackCount < maxBacktracks) {
                    let validChunks;

                    // Determine valid chunks based on position
                    if (i === 0 || i === this.content.length - 5 || j === 0 || j === this.content[i].length - 5) {
                        const requiredDirections = this.chunkMap[chunkRow][chunkCol];

                        if (this.isCorner(requiredDirections)) {
                            validChunks = this.chunks.filter(chunk => this.arraysEqual(chunk.validAsBorder, requiredDirections));
                        } else {
                            validChunks = this.chunks.filter(chunk => this.containsAllDirections(chunk.validAsBorder, requiredDirections));
                        }
                    } else {
                        validChunks = this.chunks;
                    }

                    // Filter chunks based on compatibility with neighbors
                    const compatibleChunks = validChunks.filter(chunk =>
                        this.isCompatibleWithNeighbors(chunk, chunkRow, chunkCol)
                    );

                    if (compatibleChunks.length > 0) {
                        // Select chunk using weighted random selection
                        const selectedChunk = this.selectWeightedChunk(compatibleChunks);

                        // Place the chunk
                        this.placedChunks[chunkRow][chunkCol] = selectedChunk;
                        this.insertChunk(i, j, selectedChunk);
                        placementStack.push({row: chunkRow, col: chunkCol, chunk: selectedChunk});
                        placed = true;
                    } else {
                        // No compatible chunks found - need to backtrack
                        if (placementStack.length === 0) {
                            // Can't backtrack anymore, generation failed
                            throw new Error('Cannot generate valid maze');
                        }

                        // Backtrack: remove the last placed chunk
                        const lastPlacement = placementStack.pop()!;
                        this.placedChunks[lastPlacement.row][lastPlacement.col] = null;
                        this.clearChunk(lastPlacement.row * 5, lastPlacement.col * 5);

                        // Move back to retry the previous position
                        // Adjust loop indices
                        if (j > 0) {
                            j -= 10; // Will be incremented by 5 in the loop, so net -5
                        } else {
                            i -= 5;
                            j = this.content[i].length - 5;
                        }

                        backtrackCount++;
                        break; // Exit the while loop to continue with adjusted position
                    }
                }

                if (!placed && backtrackCount >= maxBacktracks) {
                    throw new Error('Max backtracks reached');
                }
            }
        }

        return true;
    }

    // Select a chunk using weighted random selection
    private selectWeightedChunk(chunks: Chunk[]): Chunk {
        // For now, use uniform random selection
        // Weight-based selection can be added if weights are properly defined
        const randomIndex = Math.floor(this.random() * chunks.length);
        return chunks[randomIndex];
    }

    // Clear a chunk from the content grid
    private clearChunk(startX: number, startY: number) {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (startX + i < this.content.length && startY + j < this.content[0].length) {
                    this.content[startX + i][startY + j] = 0;
                }
            }
        }
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
    const maze = new RandomMaze(width, height, 356456);
    // console.log(maze.content);
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