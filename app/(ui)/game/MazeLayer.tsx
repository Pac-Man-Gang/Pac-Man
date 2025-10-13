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
  [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 4, 4, 4, 4, 4, 4, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
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
      return <SuperPelletSprite row={row} col={col} />
    } else {
      return <SmallPelletSprite row={row} col={col} />
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

import { memo, useEffect, useMemo } from 'react';

const MazeLayer = memo(function MazeLayer() {
  // compute once inside Maze, not on every GamePage render
  const cells = useMemo(
    () =>
      LEVEL_MAP.flatMap((row, r) =>
        row.map((_, c) => <div key={`${r}-${c}`}>{defineComponent(r, c)}</div>)
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
