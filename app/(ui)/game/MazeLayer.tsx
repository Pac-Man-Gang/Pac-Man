import EmptyCell from '../components/EmptyCell';
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
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

enum ComponentType {
  Wall,
  Corner,
  Insidecorner,
  Connector,
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
      case ComponentType.Connector:
        return this.defineConnector();
      case ComponentType.Insidecorner:
        return this.defineInsideCorner();
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
        return <MazeTile tile={'doubleWallFlipped'} />;
      } else if (
        Object.values(this.neighbours).some(
          (n) => n === 3 || n === 4 || n === undefined
        )
      ) {
        return <MazeTile tile={'doubleWall'} />;
      } else {
        if (
          this.neighbours.E === 2 ||
          this.neighbours.E === 0 ||
          this.neighbours.E === 5
        ) {
          return <MazeTile tile={'singleWallFlipped'} />;
        } else {
          return <MazeTile tile={'singleWall'} />;
        }
      }
    } else {
      if ([3, 4, undefined].includes(this.neighbours.S)) {
        if (this.neighbours.E === 4) {
          return <MazeTile tile={'wallStopFlipped'} />;
        } else if (this.neighbours.W === 4) {
          return <MazeTile tile={'wallStop'} />;
        } else {
          return <MazeTile tile={'doubleWallRotateLeft'} />;
        }
      } else if (
        Object.values(this.neighbours).some(
          (n) => n === 3 || n === 4 || n === undefined
        )
      ) {
        return <MazeTile tile={'doubleWallRotateRight'} />;
      } else {
        if (
          this.neighbours.S === 2 ||
          this.neighbours.S === 0 ||
          this.neighbours.S === 5
        ) {
          return <MazeTile tile={'singleWallRotateLeft'} />;
        } else {
          return <MazeTile tile={'singleWallRotateRight'} />;
        }
      }
    }
  }

  isVertical(): boolean {
    return this.isNeighbourWall.N && this.isNeighbourWall.S;
  }

  defineInsideCorner(): ReactElement {
    const w = this.isNeighbourWall;

    if (w.N && w.S && w.E && w.W && !w.NE) {
      return <MazeTile tile={'shortCorner'} />;
    } else if (w.N && w.S && w.E && w.W && !w.NW) {
      return <MazeTile tile={'shortCornerRotateLeft'} />;
    } else if (w.N && w.S && w.E && w.W && !w.SE) {
      return <MazeTile tile={'shortCornerRotateRight'} />;
    } else if (w.N && w.S && w.E && w.W && !w.SW) {
      return <MazeTile tile={'shortCornerReverse'} />;
    } else {
      return <MazeTile tile={'shortCorner'} />;
    }
  }

  defineConnector(): ReactElement {
    const w = this.isNeighbourWall;

    if (w.E && w.W && w.N && !w.S && !w.NE) {
      return <MazeTile tile={'connectorFlippedReverse'} />;
    } else if (w.E && w.W && w.N && !w.S && !w.NW) {
      return <MazeTile tile={'connectorReverse'} />;
    } else if (w.E && w.W && w.S && !w.N && !w.SE) {
      return <MazeTile tile={'connector'} />;
    } else if (w.E && w.W && w.S && !w.N && !w.SW) {
      return <MazeTile tile={'connectorFlipped'} />;
    } else if (w.N && w.S && w.E && !w.W && !w.NE) {
      return <MazeTile tile={'connectorRotateLeft'} />;
    } else if (w.N && w.S && w.E && !w.W && !w.SE) {
      return <MazeTile tile={'connectorFlippedRotateRight'} />;
    } else if (w.N && w.S && w.W && !w.E && !w.NW) {
      return <MazeTile tile={'connectorFlippedRotateLeft'} />;
    } else if (w.N && w.S && w.W && !w.E && !w.SW) {
      return <MazeTile tile={'connectorRotateRight'} />;
    } else {
      return <MazeTile tile={'connector'} />;
    }
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
        return <MazeTile tile={'doubleCorner'} />;
      } else if (this.neighbours.NE === 3) {
        return <MazeTile tile={'shortCorner'} />;
      } else if (this.neighbours.NE === 4) {
        return <MazeTile tile={'sharpDoubleCorner'} />;
      } else {
        return <MazeTile tile={'normalCorner'} />;
      }
      // Corner (N to W)
    } else if (
      this.isNeighbourWall.N &&
      this.isNeighbourWall.W &&
      !this.isNeighbourWall.S &&
      !this.isNeighbourWall.E
    ) {
      if (this.neighbours.S === undefined || this.neighbours.S === 3) {
        return <MazeTile tile={'doubleCornerRotateLeft'} />;
      } else if (this.neighbours.NW === 3) {
        return <MazeTile tile={'shortCornerRotateLeft'} />;
      } else if (this.neighbours.NW === 4) {
        return <MazeTile tile={'sharpDoubleCornerRotateLeft'} />;
      } else {
        return <MazeTile tile={'normalCornerRotateLeft'} />;
      }
      // Corner (S to E)
    } else if (
      this.isNeighbourWall.S &&
      this.isNeighbourWall.E &&
      !this.isNeighbourWall.N &&
      !this.isNeighbourWall.W
    ) {
      if (this.neighbours.N === undefined || this.neighbours.N === 3) {
        return <MazeTile tile={'doubleCornerRotateRight'} />;
      } else if (this.neighbours.SE === 3) {
        return <MazeTile tile={'shortCornerRotateRight'} />;
      } else if (this.neighbours.SE === 4) {
        return <MazeTile tile={'sharpDoubleCornerRotateRight'} />;
      } else {
        return <MazeTile tile={'normalCornerRotateRight'} />;
      }
      // Corner (S to W)
    } else if (
      this.isNeighbourWall.S &&
      this.isNeighbourWall.W &&
      !this.isNeighbourWall.N &&
      !this.isNeighbourWall.E
    ) {
      if (this.neighbours.N === undefined || this.neighbours.N === 3) {
        return <MazeTile tile={'doubleCornerReverse'} />;
      } else if (this.neighbours.SW === 3) {
        return <MazeTile tile={'shortCornerReverse'} />;
      } else if (this.neighbours.SW === 4) {
        return <MazeTile tile={'sharpDoubleCornerReverse'} />;
      } else {
        return <MazeTile tile={'normalCornerReverse'} />;
      }
    }

    return <MazeTile tile={'normalCorner'} />;
  }

  defineComponentType(): ComponentType {
    switch (true) {
      case this.isConnector():
        return ComponentType.Connector;
      case this.isInsideCorner():
        return ComponentType.Insidecorner;
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

  isConnector(): boolean {
    const w = this.isNeighbourWall;
    return (
      (w.E && w.W && w.N && !w.S && (!w.NE || !w.NW)) ||
      (w.E && w.W && w.S && !w.N && (!w.SE || !w.SW)) ||
      (w.N && w.S && w.E && !w.W && (!w.NE || !w.SE)) ||
      (w.N && w.S && w.W && !w.E && (!w.NW || !w.SW))
    );
  }

  isInsideCorner(): boolean {
    const w = this.isNeighbourWall;
    return w.N && w.S && w.E && w.W && (!w.NE || !w.NW || !w.SE || !w.SW);
  }

  isCorner(): boolean {
    const w = this.isNeighbourWall;
    return (
      LEVEL_MAP[this.row][this.col] === 1 &&
      ((w.N && w.E && !w.S && !w.W) ||
        (w.N && w.W && !w.S && !w.E) ||
        (w.S && w.E && !w.N && !w.W) ||
        (w.S && w.W && !w.N && !w.E))
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

import { memo, ReactElement, useEffect, useMemo } from 'react';
import { MazeTile } from '../tiles/MazeTile';

type MazeLayerProps = { gameOver: boolean };

export const HIDE_MAZE_DELAY = 2000;

function buildHideOrder(rows: number, cols: number) {
  const cx = (cols - 1) / 2;
  const cy = (rows - 1) / 2;

  type Item = {
    key: string;
    r: number;
    c: number;
    layer: number;
    angle: number;
  };
  const items: Item[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const layer = Math.min(r, c, rows - 1 - r, cols - 1 - c);
      const angle = Math.atan2(r - cy, c - cx);
      const angleNorm = (angle + Math.PI * 2) % (Math.PI * 2);
      items.push({ key: `${r}-${c}`, r, c, layer, angle: angleNorm });
    }
  }

  items.sort((a, b) => a.layer - b.layer || a.angle - b.angle);

  // Accelerating delay: later tiles have smaller increments in delay
  const order = new Map<string, number>();
  const n = items.length;
  items.forEach((it, i) => {
    const progress = i / n;
    const delay =
      ((Math.exp(progress * 3) - 1) / (Math.exp(3) - 1)) * HIDE_MAZE_DELAY;
    order.set(it.key, delay);
  });
  return order;
}

export const MazeLayer = memo(function MazeLayer({ gameOver }: MazeLayerProps) {
  const rows = LEVEL_MAP.length;
  const cols = LEVEL_MAP[0].length;

  const hideOrder = useMemo(() => buildHideOrder(rows, cols), [rows, cols]);

  const cells = useMemo(
    () =>
      LEVEL_MAP.flatMap((row, r) =>
        row.map((_, c) => {
          const key = `${r}-${c}`;
          return (
            <div
              key={key}
              className="maze-cell"
              style={
                {
                  ['--delay']: `${hideOrder.get(key) ?? 0}ms`,
                } as React.CSSProperties
              }
            >
              {new MazeComponent(r, c).component}
            </div>
          );
        })
      ),
    [hideOrder]
  );

  useEffect(() => {
    initialPelletAmount =
      getAllSmallPelletSprites().length + getAllSuperPelletSprites().length;
  }, []);

  return (
    <div
      className={`maze ${gameOver ? 'maze--hide' : ''}`}
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
