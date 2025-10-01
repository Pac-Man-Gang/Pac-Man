import DoubleCorner from '../components/DoubleCorner';
import DoubleWall from '../components/DoubleWall';
import EmptyCell from '../components/EmptyCell';
import SingleWall from '../components/SingleWall';
import SingleCorner from '../components/SingleCorner';
import ShortCorner from '../components/ShortCorner';
import Connector from '../components/Connector';
import SharpDoubleCorner from '../components/SharpDoubleCorner';
import DoubleEndWall from '../components/DoubleWallStop';

const maze: number[][] = [
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1,
  ],
  [
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 1,
  ],
  [
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1,
    1, 0, 1,
  ],
  [
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1,
    1, 0, 1,
  ],
  [
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1,
    1, 0, 1,
  ],
  [
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 1,
  ],
  [
    1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 0, 1,
  ],
  [
    1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 0, 1,
  ],
  [
    1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
    0, 0, 1,
  ],
  [
    1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1,
    1, 1, 1,
  ],
  [
    3, 3, 3, 3, 3, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 3, 3,
    3, 3, 3,
  ],
  [
    3, 3, 3, 3, 3, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 3, 3,
    3, 3, 3,
  ],
  [
    3, 3, 3, 3, 3, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 3, 3,
    3, 3, 3,
  ],
  [
    1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 4, 4, 4, 4, 4, 4, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 1, 1,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 4, 4, 4, 4, 4, 4, 1, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0,
  ],
  [
    1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 4, 4, 4, 4, 4, 4, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 1, 1,
  ],
  [
    3, 3, 3, 3, 3, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 3, 3,
    3, 3, 3,
  ],
  [
    3, 3, 3, 3, 3, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 3, 3,
    3, 3, 3,
  ],
  [
    3, 3, 3, 3, 3, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 3, 3,
    3, 3, 3,
  ],
  [
    1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 1, 1,
  ],
  [
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 1,
  ],
  [
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1,
    1, 0, 1,
  ],
  [
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1,
    1, 0, 1,
  ],
  [
    1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
    0, 0, 1,
  ],
  [
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0,
    1, 1, 1,
  ],
  [
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0,
    1, 1, 1,
  ],
  [
    1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
    0, 0, 1,
  ],
  [
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 1,
  ],
  [
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 1,
  ],
  [
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 1,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1,
  ],
];

function defineComponent(row: number, col: number) {
  const cell = maze[row]?.[col];

  // Empty cells
  if (cell !== 1) return <EmptyCell />;

  // Define neighbours
  const N = maze[row - 1]?.[col];
  const S = maze[row + 1]?.[col];
  const W = maze[row]?.[col - 1];
  const E = maze[row]?.[col + 1];
  const NE = maze[row - 1]?.[col + 1];
  const NW = maze[row - 1]?.[col - 1];
  const SE = maze[row + 1]?.[col + 1];
  const SW = maze[row + 1]?.[col - 1];

  // Define if neighbours are also walls
  const isN = N === 1;
  const isS = S === 1;
  const isW = W === 1;
  const isE = E === 1;
  const isNE = NE === 1;
  const isNW = NW === 1;
  const isSE = SE === 1;
  const isSW = SW === 1;

  switch (true) {
    // Corner (N to E)
    case isN && isE && !isS && !isW:
      // Ourside Corner
      if (S === undefined || W === undefined) {
        return <DoubleCorner />;
        // Normal corners
      } else if (S === 0 && W === 0) {
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
      } else if (S === 0 || E === 0) {
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
      } else if (N === 0 || W === 0) {
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
      } else if (N === 0 || E === 0) {
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
          if (E === 0) {
            return <DoubleEndWall rotation={270} />;
          } else if (W === 0) {
            return <DoubleEndWall rotation={270} />;
          } else {
            return <DoubleWall rotation={90} />;
          }

        case S === 4:
          if (E === 0) {
            return <DoubleEndWall mirrored={true} />;
          } else if (W === 0) {
            return <DoubleEndWall />;
          } else {
            return <DoubleWall rotation={270} mirrored={true} />;
          }

        case E === 4:
          if (N === 0) {
            return <DoubleEndWall rotation={90} mirrored={true} />;
          } else if (S === 0) {
            return <DoubleEndWall rotation={270} />;
          } else {
            return <DoubleWall mirrored={true} />;
          }

        case W === 4:
          if (N === 0) {
            return <DoubleEndWall rotation={90} />;
          } else if (S === 0) {
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
      } else if (W === 0) {
        if (E === 3) {
          return <DoubleWall mirrored={true} />;
        } else {
          return <SingleWall />;
        }
        // Right wall
      } else if (E === 0) {
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
      } else if (N === 0) {
        if (S === 3) {
          return <DoubleWall rotation={270} mirrored={true} />;
        } else {
          return <SingleWall rotation={90} />;
        }
        // Bottom wall
      } else if (S === 0) {
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

export default function Maze() {
  return (
    <div
      className="maze"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${maze[0].length}, 20px)`, // 28 columns
        gridTemplateRows: `repeat(${maze.length}, 20px)`, // 36 rows
      }}
    >
      {maze.map((row, rowIndex) =>
        row.map((_, colIndex) => (
          <div key={`${rowIndex}-${colIndex}`}>
            {defineComponent(rowIndex, colIndex)}
          </div>
        ))
      )}
    </div>
  );
}
