import EmptyCell from '../components/EmptyCell';
import Connector from '../components/maze/Connector';
import DoubleCorner from '../components/maze/DoubleCorner';
import DoubleWall from '../components/maze/DoubleWall';
import DoubleEndWall from '../components/maze/DoubleWallStop';
import SharpDoubleCorner from '../components/maze/SharpDoubleCorner';
import ShortCorner from '../components/maze/ShortCorner';
import SingleCorner from '../components/maze/SingleCorner';
import SingleWall from '../components/maze/SingleWall';
import SmallPelletSprite, {
  getAllSmallPelletSprites,
} from '../components/SmallPelletSprite';
import SuperPelletSprite, {
  getAllSuperPelletSprites,
} from '../components/SuperPelletSprite';

// Empty = 0
// Wall = 1
// Small Pellet = 2
// Out of Map = 3
// Ghost House = 4
// Super Pellets = 5
// Tunnel = 6

// prettier-ignore
export const LEVEL_MAP: number[][] = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1],
  [1, 5, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 5, 1],
  [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1],
  [1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1],
  [3, 3, 3, 3, 3, 1, 2, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 2, 1, 3, 3, 3, 3, 3],
  [3, 3, 3, 3, 3, 1, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 1, 3, 3, 3, 3, 3],
  [3, 3, 3, 3, 3, 1, 2, 1, 1, 0, 1, 1, 1, 4, 4, 1, 1, 1, 0, 1, 1, 2, 1, 3, 3, 3, 3, 3],
  [1, 1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 4, 4, 4, 4, 4, 4, 1, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1],
  [6, 6, 6, 6, 6, 6, 2, 0, 0, 0, 1, 4, 4, 4, 4, 4, 4, 1, 0, 0, 0, 2, 6, 6, 6, 6, 6, 6],
  [1, 1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 4, 4, 4, 4, 4, 4, 1, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1],
  [3, 3, 3, 3, 3, 1, 2, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 2, 1, 3, 3, 3, 3, 3],
  [3, 3, 3, 3, 3, 1, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 1, 3, 3, 3, 3, 3],
  [3, 3, 3, 3, 3, 1, 2, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 2, 1, 3, 3, 3, 3, 3],
  [1, 1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1],
  [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1],
  [1, 5, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 5, 1],
  [1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1],
  [1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
  [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

enum ComponentType {
  Wall,
  Corner,
  Smallpellet,
  Superpellet,
  Ghosthouse,
  Void,
  Empty,
}

const DIRS = {
  N: [-1, 0],
  S: [1, 0],
  W: [0, -1],
  E: [0, 1],
  NE: [-1, 1],
  NW: [-1, -1],
  SE: [1, 1],
  SW: [1, -1],
} as const;

class MazeComponent {
  row: number;
  col: number;
  type: ComponentType;
  component: ReactElement;
  neighbours: Record<string, number | undefined>;
  isNeighbourWall: Record<string, boolean>;

  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
    this.neighbours = Object.fromEntries(
      Object.entries(DIRS).map(([key, [r, c]]) => [
        key,
        LEVEL_MAP[row + r]?.[col + c],
      ])
    );
    this.isNeighbourWall = Object.fromEntries(
      Object.entries(this.neighbours).map(([key, value]) => [key, value === 1])
    );
    this.type = this.defineComponentType();
    this.component = this.defineComponent();
  }

  defineComponent(): ReactElement {
    switch (this.type) {
      case ComponentType.Empty:
      case ComponentType.Ghosthouse:
      case ComponentType.Void:
        return <EmptyCell />;
      case ComponentType.Smallpellet:
        return <SmallPelletSprite row={this.row} col={this.col} />;
      case ComponentType.Superpellet:
        return <SuperPelletSprite row={this.row} col={this.col} />;
      case ComponentType.Corner:
        return this.defineCorner();
      case ComponentType.Wall:
        return this.defineWall();
      default:
        return <EmptyCell />;
    }
  }

  defineWall(): ReactElement {
    if (Object.values(this.neighbours).every((n) => n === 1)) {
      return <EmptyCell />;
    }

    if (this.isVertical()) {
        if ([3, 4, undefined].includes(this.neighbours.E)) {
            return <DoubleWall mirrored={true}/>;
        } else if (Object.values(this.neighbours).some(n => n === 3 || n === 4 || n === undefined)) {
            return <DoubleWall />;
        } else {
            if (this.neighbours.E === 2 || this.neighbours.E === 0 || this.neighbours.E === 5) {
                return <SingleWall mirrored={true} />;
            } else {
                return <SingleWall />;
            }
        }
    } else {
        if ([3, 4, undefined].includes(this.neighbours.S)) {
            return <DoubleWall rotation={270} mirrored={true} />;
        } else if (Object.values(this.neighbours).some(n => n === 3 || n === 4 || n === undefined)){
            return <DoubleWall rotation={90} />;
        } else {
            if (this.neighbours.S === 2 || this.neighbours.S === 0 || this.neighbours.S === 5) {
                return <SingleWall rotation={270} mirrored={true} />;
            } else {
                return <SingleWall rotation={90} />;
            }
        }
        
    }

  }

  isVertical(): boolean {
    return this.isNeighbourWall.N && this.isNeighbourWall.S;
  }

  defineCorner(): ReactElement {
    // Corner (N to E)
    if (
      this.isNeighbourWall.N &&
      this.isNeighbourWall.E &&
      !this.isNeighbourWall.S &&
      !this.isNeighbourWall.W
    ) {
      if (this.neighbours.S === undefined || this.neighbours.S === 3) {
        return <DoubleCorner/>;
      } else if (this.neighbours.NE === 3) {
        return <ShortCorner/>;
      } else if (this.neighbours.NE === 4) {
        return <SharpDoubleCorner/>;
      } else {
        return <SingleCorner/>;
      }
      // Corner (N to W)
    } else if (
      this.isNeighbourWall.N &&
      this.isNeighbourWall.W &&
      !this.isNeighbourWall.S &&
      !this.isNeighbourWall.E
    ) {
      if (this.neighbours.S === undefined || this.neighbours.S === 3) {
        return <DoubleCorner rotation={270}/>;
      } else if (this.neighbours.NW === 3) {
        return <ShortCorner rotation={270}/>;
      } else if (this.neighbours.NW === 4) {
        return <SharpDoubleCorner rotation={270}/>;
      } else {
        return <SingleCorner rotation={270}/>;
      }
      // Corner (S to E)
    } else if (
      this.isNeighbourWall.S &&
      this.isNeighbourWall.E &&
      !this.isNeighbourWall.N &&
      !this.isNeighbourWall.W
    ) {
      if (this.neighbours.N === undefined || this.neighbours.N === 3) {
        return <DoubleCorner rotation={90} />;
      } else if (this.neighbours.SE === 3) {
        return <ShortCorner rotation={90} />;
      } else if (this.neighbours.SE === 4) {
        return <SharpDoubleCorner rotation={90} />;
      } else {
        return <SingleCorner rotation={90}/>;        
      }
      // Corner (S to W)
    } else if (
      this.isNeighbourWall.S &&
      this.isNeighbourWall.W &&
      !this.isNeighbourWall.N &&
      !this.isNeighbourWall.E
    ) {
      if (this.neighbours.N === undefined || this.neighbours.N === 3) {
        return <DoubleCorner rotation={180} />;
      } else if (this.neighbours.SW === 3) {
        return <ShortCorner rotation={180} />;
      } else if (this.neighbours.SW === 4) {
        return <SharpDoubleCorner rotation={180} />;
      } else {
        return <SingleCorner rotation={180}/>;
      }
    }

    return <SingleCorner />;
  }

  defineComponentType(): ComponentType {
    switch (true) {
      case this.isCorner():
        return ComponentType.Corner;
      case this.isWall():
        return ComponentType.Wall;
      case this.isSmallPellet():
        return ComponentType.Smallpellet;
      case this.isSuperPellet():
        return ComponentType.Superpellet;
      case this.isEmpty():
        return ComponentType.Empty;
      case this.isVoid():
        return ComponentType.Void;
      case this.isGhostHouse():
        return ComponentType.Ghosthouse;
      default:
        return ComponentType.Empty;
    }
  }

  isWall(): boolean {
    return LEVEL_MAP[this.row][this.col] === 1 && !this.isCorner();
  }

  isCorner(): boolean {
  const w = this.isNeighbourWall;
  return (
    LEVEL_MAP[this.row][this.col] === 1 &&
    (
      // Outside corners (L-shaped) - exactly 2 perpendicular walls
      (w.N && w.E && !w.S && !w.W) ||
      (w.N && w.W && !w.S && !w.E) ||
      (w.S && w.E && !w.N && !w.W) ||
      (w.S && w.W && !w.N && !w.E) ||
      // Inside corners - check specific diagonal based on which walls exist
      // Horizontal walls with at least one vertical wall and a missing diagonal
      (w.E && w.W && w.N && !w.S && (!w.NE || !w.NW)) ||
      (w.E && w.W && w.S && !w.N && (!w.SE || !w.SW)) ||
      // Vertical walls with at least one horizontal wall and a missing diagonal
      (w.N && w.S && w.E && !w.W && (!w.NE || !w.SE)) ||
      (w.N && w.S && w.W && !w.E && (!w.NW || !w.SW)) ||
      // Cross shape (all 4 walls) with at least one missing diagonal
      (w.N && w.S && w.E && w.W && (!w.NE || !w.NW || !w.SE || !w.SW))
    )
  );
}

  isSmallPellet(): boolean {
    return LEVEL_MAP[this.row][this.col] === 2;
  }

  isSuperPellet(): boolean {
    return LEVEL_MAP[this.row][this.col] === 5;
  }

  isEmpty(): boolean {
    return LEVEL_MAP[this.row][this.col] === 0;
  }

  isVoid(): boolean {
    return LEVEL_MAP[this.row][this.col] === 3;
  }

  isGhostHouse(): boolean {
    return LEVEL_MAP[this.row][this.col] === 4;
  }
}

export let initialPelletAmount = 0;

function defineComponent(row: number, col: number) {
  const cell = LEVEL_MAP[row]?.[col];
  const notWall: number[] = [0, 2, 4, 5];

  // Define neighbours
  const N = LEVEL_MAP[row - 1]?.[col];
  const S = LEVEL_MAP[row + 1]?.[col];
  const W = LEVEL_MAP[row]?.[col - 1];
  const E = LEVEL_MAP[row]?.[col + 1];
  const NE = LEVEL_MAP[row - 1]?.[col + 1];
  const NW = LEVEL_MAP[row - 1]?.[col - 1];
  const SE = LEVEL_MAP[row + 1]?.[col + 1];
  const SW = LEVEL_MAP[row + 1]?.[col - 1];

  // Define if neighbours are also walls
  const isN = N === 1;
  const isS = S === 1;
  const isW = W === 1;
  const isE = E === 1;
  const isNE = NE === 1;
  const isNW = NW === 1;
  const isSE = SE === 1;
  const isSW = SW === 1;

  // Empty cells / Pellets
  if (cell !== 1 && cell !== 3) {
    if (cell === 0 || cell === 4) {
      return <EmptyCell />;
    } else if (cell === 5) {
      return <SuperPelletSprite row={row} col={col} />;
    } else {
      return <SmallPelletSprite row={row} col={col} />;
    }
  }

  switch (true) {
    // Corner (N to E)
    case isN && isE && !isS && !isW:
      // Ourside Corner
      if (S === undefined || W === undefined) {
        return <DoubleCorner />;
        // Normal corners
      } else if (notWall.includes(S) && notWall.includes(W)) {
        if (NE === 3) {
          return <ShortCorner rotation={270} mirrored={true} />;
        } else {
          if (NE === 4) {
            return <SharpDoubleCorner />;
          } else {
            return <SingleCorner />;
          }
        }
      }
      break;

    // Corner (N to W)
    case isN && isW && !isS && !isE:
      // Outside corners
      if (S === undefined || E === undefined) {
        return <DoubleCorner rotation={270} />;
        // Normal corners
      } else if (notWall.includes(S) || notWall.includes(E)) {
        if (NW === 3) {
          return <ShortCorner rotation={270} />;
        } else {
          if (NW === 4) {
            return <SharpDoubleCorner rotation={270} />;
          } else {
            return <SingleCorner rotation={270} />;
          }
        }
      }
      break;

    // Corner (S to E)
    case isS && isE && !isN && !isW:
      // Outside corners
      if (N === undefined || W === undefined) {
        return <DoubleCorner rotation={90} />;
        // Normal corners
      } else if (notWall.includes(N) || notWall.includes(W)) {
        if (SE === 3) {
          return <ShortCorner rotation={90} />;
        } else {
          if (SE === 4) {
            return <SharpDoubleCorner rotation={90} />;
          } else {
            return <SingleCorner rotation={90} />;
          }
        }
      }
      break;

    // Corner (S to W)
    case isS && isW && !isN && !isE:
      // Outside corners
      if (N === undefined || E === undefined) {
        return <DoubleCorner rotation={180} />;
        // Normal corners
      } else if (notWall.includes(N) || notWall.includes(E)) {
        if (SW === 3) {
          return <ShortCorner rotation={90} mirrored={true} />;
        } else {
          if (SW === 4) {
            return <SharpDoubleCorner rotation={180} />;
          } else {
            return <SingleCorner rotation={180} />;
          }
        }
      }
      break;

    // Ghost house walls
    case N === 4 || S === 4 || E === 4 || W === 4:
      switch (true) {
        case N === 4:
          if (notWall.includes(E)) {
            return <DoubleEndWall rotation={270} />;
          } else if (notWall.includes(W)) {
            return <DoubleEndWall rotation={270} />;
          } else {
            return <DoubleWall rotation={90} />;
          }

        case S === 4:
          if (notWall.includes(E)) {
            return <DoubleEndWall mirrored={true} />;
          } else if (notWall.includes(W)) {
            return <DoubleEndWall />;
          } else {
            return <DoubleWall rotation={270} mirrored={true} />;
          }

        case E === 4:
          if (notWall.includes(N)) {
            return <DoubleEndWall rotation={90} mirrored={true} />;
          } else if (notWall.includes(S)) {
            return <DoubleEndWall rotation={270} />;
          } else {
            return <DoubleWall mirrored={true} />;
          }

        case W === 4:
          if (notWall.includes(N)) {
            return <DoubleEndWall rotation={90} />;
          } else if (notWall.includes(S)) {
            return <DoubleEndWall rotation={270} mirrored={true} />;
          } else {
            return <DoubleWall />;
          }
      }

    // Vertical walls
    case isN && isS && !(isE && isW):
      // Left edge wall
      if (W === undefined) {
        // Connectors
        if (isE) {
          if (isSE) {
            return <Connector rotation={270} />;
          } else {
            return <Connector rotation={90} mirrored={true} />;
          }
        } else {
          return <DoubleWall />;
        }
        // Right edge wall
      } else if (E === undefined) {
        // Connectors
        if (isW) {
          if (isSW) {
            return <Connector rotation={270} mirrored={true} />;
          } else {
            return <Connector rotation={90} />;
          }
        } else {
          return <DoubleWall mirrored={true} />;
        }
        // Left wall
      } else if (notWall.includes(W)) {
        if (E === 3) {
          return <DoubleWall mirrored={true} />;
        } else {
          return <SingleWall />;
        }
        // Right wall
      } else if (notWall.includes(E)) {
        if (W === 3) {
          return <DoubleWall />;
        } else {
          return <SingleWall mirrored={true} />;
        }
      }

    // Horizontal walls
    case (isE && isW) ||
      (isE && W === undefined) ||
      (isW && E === undefined && !(isN && isS)):
      // Top edge wall
      if (N === undefined) {
        // Connectors
        if (isS) {
          if (isSE) {
            return <Connector mirrored={true} />;
          } else {
            return <Connector />;
          }
        } else {
          return <DoubleWall rotation={90} />;
        }
        // Bottom edge wall
      } else if (S === undefined) {
        // Connectors
        if (isN) {
          if (isNE) {
            return <Connector mirrored={true} />;
          } else {
            return <Connector />;
          }
        } else {
          return <DoubleWall rotation={270} mirrored={true} />;
        }
        // Top wall
      } else if (notWall.includes(N)) {
        if (S === 3) {
          return <DoubleWall rotation={270} mirrored={true} />;
        } else {
          return <SingleWall rotation={90} />;
        }
        // Bottom wall
      } else if (notWall.includes(S)) {
        if (N === 3) {
          return <DoubleWall rotation={90} />;
        } else {
          return <SingleWall rotation={270} mirrored={true} />;
        }
        // Inner Corners
      } else {
        if (SW !== 1) {
          return <ShortCorner rotation={90} mirrored={true} />;
        } else if (SE !== 1) {
          return <ShortCorner rotation={90} />;
        } else if (NE !== 1) {
          return <ShortCorner rotation={270} mirrored={true} />;
        } else if (NW !== 1) {
          return <ShortCorner rotation={270} />;
        }
      }
  }
}

import { memo, ReactElement, useEffect, useMemo } from 'react';

const MazeLayer = memo(function MazeLayer() {
  // compute once inside Maze, not on every GamePage render
  const cells = useMemo(
    () =>
      LEVEL_MAP.flatMap((row, r) =>
        row.map((_, c) => (
          <div key={`${r}-${c}`}>{new MazeComponent(r, c).component}</div>
        ))
      ),
    []
  );

  useEffect(() => {
    initialPelletAmount =
      getAllSmallPelletSprites().length + getAllSuperPelletSprites().length;
  }, []);

  return (
    <div
      className="maze"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${LEVEL_MAP[0].length}, 20px)`,
        gridTemplateRows: `repeat(${LEVEL_MAP.length}, 20px)`,
      }}
    >
      {cells}
    </div>
  );
});

export default MazeLayer;
