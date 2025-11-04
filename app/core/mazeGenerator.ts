

// Creates random number without Math.random()
function seededRandom(seed: number): Function {
    let value = seed;
    return function() {
        value = (value * 9301 + 49297) % 233280;
        return value / 233280;
    };
}



export class RandomMaze {
    content: number[][];

    constructor(width: number, height: number) {
        this.content = Array(height).fill(null).map(() => Array(width).fill(0));
    }

    testRandomGen(seed: number = 12345) {
        const random = seededRandom(seed);
        
        // First pass: walls and paths
        for (let i = 0; i < this.content.length; i++) {
            for (let j = 0; j < this.content[i].length; j++) {
                const rand = random();
                
                // Outer border is always wall
                if (i === 0 || i === this.content.length - 1 || j === 0 || j === this.content[0].length - 1) {
                    this.content[i][j] = 1;
                }
                // Create ghost house in center
                else if (i >= 12 && i <= 15 && j >= 11 && j <= 16) {
                    if (i === 12 || i === 15 || j === 11 || j === 16) {
                        this.content[i][j] = 1; // Ghost house walls
                    } else {
                        this.content[i][j] = 4; // Inside ghost house
                    }
                }
                // Random walls and pellets
                else {
                    if (rand < 0.3) {
                        this.content[i][j] = 1; // Wall
                    } else if (rand < 0.99) {
                        this.content[i][j] = 2; // Small pellet
                    } else {
                        this.content[i][j] = 5; // Super pellet
                    }
                }
            }
        }
    }
}

let maze = new RandomMaze(28, 31);
maze.testRandomGen(67);
export const LEVEL_MAP_GENERATED: number[][] = maze.content;