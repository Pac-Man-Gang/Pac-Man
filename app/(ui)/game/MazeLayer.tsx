import SmallPelletSprite, {
  getAllSmallPelletSprites,
} from '../components/SmallPelletSprite';
import SuperPelletSprite, {
  getAllSuperPelletSprites,
} from '../components/SuperPelletSprite';

/**
 * ========================================================
 * TILE VALUES (LEVEL_MAP encoding)
 * ========================================================
 * 0 → Empty
 * 1 → Wall
 * 2 → Small pellet
 * 3 → Out of bounds / void
 * 4 → Ghost house
 * 5 → Super pellet
 * 6 → Tunnel
 */

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

/**
 * ========================================================
 * DIRECTION OFFSETS
 * ========================================================
 */
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

  /**
   * ========================================================
   * VALUE HELPERS
   * ========================================================
   */
  isEmptyValue(value: number | undefined) {
    return value === 0;
  }

  isOutOfBoundsValue(value: number | undefined) {
    return value === 3 || value === undefined;
  }

  isGhostHouseValue(value: number | undefined) {
    return value === 4;
  }

  isPelletValue(value: number | undefined) {
    return value === 2 || value === 5;
  }

  isNonWallValue(value: number | undefined) {
    // all *non-wall* but valid tiles
    return value !== 1 && value !== 3 && value !== undefined;
  }

  isWallOrBlockValue(value: number | undefined) {
    return value === 1 || value === 3 || value === 4 || value === undefined;
  }

  isNonWallOrPelletValue(value: number | undefined) {
    return value === 0 || value === 2 || value === 5;
  }

  isWallorGhostHouseValue(value: number | undefined) {
    return value === 1 || value === 4;
  }

  /**
   * ========================================================
   * CONSTRUCTOR: read neighbours and classify component
   * ========================================================
   */
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

  /**
   * ========================================================
   * COMPONENT SELECTION
   * ========================================================
   */
  defineComponent(): ReactElement {
    switch (this.type) {
      case ComponentType.Empty:
      case ComponentType.Ghosthouse:
      case ComponentType.Void:
        return <MazeTile tile={'emptyCell'} />;
      case ComponentType.Smallpellet:
        return <SmallPelletSprite row={this.row} col={this.col} />;
      case ComponentType.Superpellet:
        return <SuperPelletSprite row={this.row} col={this.col} />;
      case ComponentType.Connector:
        return <MazeTile tile={this.defineConnector()} />;
      case ComponentType.Insidecorner:
        return <MazeTile tile={this.defineInsideCorner()} />;
      case ComponentType.Corner:
        return <MazeTile tile={this.defineCorner()} />;
      case ComponentType.Wall:
        return <MazeTile tile={this.defineWall()} />;
      default:
        return <MazeTile tile={'emptyCell'} />;
    }
  }

  /**
   * ========================================================
   * WALL SELECTION
   * ========================================================
   */
  defineWall(): string {
    const N = this.isWallOrBlockValue(this.neighbours.N);
    const E = this.isWallOrBlockValue(this.neighbours.E);
    const S = this.isWallOrBlockValue(this.neighbours.S);
    const W = this.isWallOrBlockValue(this.neighbours.W);

    const anyOOB = Object.values(this.neighbours).some(
      (n) => n === 3 || n === 4 || n === undefined
    );

    // For detecting pellets/empty spots
    const E_open = this.isNonWallOrPelletValue(this.neighbours.E);
    const S_open = this.isNonWallOrPelletValue(this.neighbours.S);

    // ========================================================
    // SPECIAL CASE: fully enclosed → EmptyCell
    // ========================================================
    if (Object.values(this.neighbours).every((n) => n === 1)) {
      return 'emptyCell';
    }

    // ========================================================
    // VERTICAL WALLS
    // ========================================================
    if (N && S) {
      // Out-of-bounds East → flipped double wall
      if (E && anyOOB) return 'doubleWallFlipped';

      // Any boundary → double wall
      if (anyOOB) return 'doubleWall';

      // Normal vertical wall
      return E_open ? 'singleWallFlipped' : 'singleWall';
    }

    // ========================================================
    // HORIZONTAL WALLS
    // ========================================================
    if (E && W) {
      // Out-of-bounds SOUTH
      if (S) {
        if (this.neighbours.E === 4) return 'wallStopFlipped';
        if (this.neighbours.W === 4) return 'wallStop';
        if (anyOOB) return 'doubleWallRotateLeft';
        return 'singleWallFlippedRotateLeft';
      }

      // Any boundary → rotated double wall
      if (anyOOB) return 'doubleWallRotateRight';

      // Normal horizontal wall
      return S_open ? 'singleWallRotateLeft' : 'singleWallRotateRight';
    }

    // Fallback
    return 'singleWall';
  }

  isVertical(): boolean {
    return this.isNeighbourWall.N && this.isNeighbourWall.S;
  }

  /**
   * ========================================================
   * INSIDE CORNERS (all 4 walls + one missing diagonal)
   * ========================================================
   */
  defineInsideCorner(): string {
    const w = this.isNeighbourWall;

    // All 4 cardinal walls → inside corner cases
    const allFour = w.N && w.S && w.E && w.W;

    if (allFour) {
      if (!w.NE) return 'shortCorner'; // inside corner north-east
      if (!w.NW) return 'shortCornerRotateLeft'; // inside corner north-west
      if (!w.SE) return 'shortCornerRotateRight'; // inside corner south-east
      if (!w.SW) return 'shortCornerReverse'; // inside corner south-west
    }

    // Fallback (rare, but matches old code)
    return 'shortCorner';
  }

  /**
   * ========================================================
   * CONNECTORS (T-junctions)
   * ========================================================
   */
  defineConnector(): string {
    const w = this.isNeighbourWall;

    // OPEN SOUTH (walls on N, E, W)
    if (w.N && w.E && w.W && !w.S) {
      if (!w.NE) return 'connectorFlippedReverse';
      if (!w.NW) return 'connectorReverse';
    }

    // OPEN NORTH (walls on S, E, W)
    if (w.S && w.E && w.W && !w.N) {
      if (!w.SE) return 'connector';
      if (!w.SW) return 'connectorFlipped';
    }

    // OPEN WEST (walls on N, S, E)
    if (w.N && w.S && w.E && !w.W) {
      if (!w.NE) return 'connectorRotateLeft';
      if (!w.SE) return 'connectorFlippedRotateRight';
    }

    // OPEN EAST (walls on N, S, W)
    if (w.N && w.S && w.W && !w.E) {
      if (!w.NW) return 'connectorFlippedRotateLeft';
      if (!w.SW) return 'connectorRotateRight';
    }

    // DEFAULT fallback
    return 'connector';
  }

  /**
   * ========================================================
   * OUTSIDE CORNERS (L-shapes)
   * ========================================================
   */
  defineCorner(): string {
    const w = this.isNeighbourWall;
    const n = this.neighbours;

    // ========================================================
    // 1) CORNER: N → E (open to the South & West)
    // ========================================================
    if (w.N && w.E && !w.S && !w.W) {
      if (n.S === undefined || n.S === 3) return 'doubleCorner';
      if (n.NE === 3) return 'shortCorner';
      if (n.NE === 4) return 'sharpDoubleCorner';
      return 'normalCorner';
    }

    // ========================================================
    // 2) CORNER: N → W (open to the South & East)
    // ========================================================
    if (w.N && w.W && !w.S && !w.E) {
      if (n.S === undefined || n.S === 3) return 'doubleCornerRotateLeft';
      if (n.NW === 3) return 'shortCornerRotateLeft';
      if (n.NW === 4) return 'sharpDoubleCornerRotateLeft';
      return 'normalCornerRotateLeft';
    }

    // ========================================================
    // 3) CORNER: S → E (open to the North & West)
    // ========================================================
    if (w.S && w.E && !w.N && !w.W) {
      if (n.N === undefined || n.N === 3) return 'doubleCornerRotateRight';
      if (n.SE === 3) return 'shortCornerRotateRight';
      if (n.SE === 4) return 'sharpDoubleCornerRotateRight';
      return 'normalCornerRotateRight';
    }

    // ========================================================
    // 4) CORNER: S → W (open to the North & East)
    // ========================================================
    if (w.S && w.W && !w.N && !w.E) {
      if (n.N === undefined || n.N === 3) return 'doubleCornerReverse';
      if (n.SW === 3) return 'shortCornerReverse';
      if (n.SW === 4) return 'sharpDoubleCornerReverse';
      return 'normalCornerReverse';
    }

    // ========================================================
    // FALLBACK (should not normally happen)
    // ========================================================
    return 'normalCorner';
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

// ========================================================
// MAZE LAYER RENDERING
// ========================================================
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
