// app/components/GridView.tsx (or wherever)

import { Ghost, PacMan } from '../../core/types';

export function GridView({
  map,
  pac,
  ghosts = [],
}: {
  map: number[][];
  pac?: PacMan;
  ghosts?: Ghost[];
}) {
  const rows = map.length;
  const cols = map[0].length;

  const cellLabel = (x: number, y: number) => {
    if (pac && pac.pos.x === x && pac.pos.y === y) return '@';
    const g = ghosts.find((g) => g.pos.x === x && g.pos.y === y);
    if (g) return g.sprite.toUpperCase();
    return '';
  };

  return (
    <div style={{ display: 'inline-block' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 18px)`,
          gap: 2,
          border: '1px solid #ccc',
          padding: 6,
          background: '#f6f7f9',
        }}
      >
        {Array.from({ length: rows * cols }).map((_, i) => {
          const y = Math.floor(i / cols);
          const x = i % cols;
          const isWall = map[y][x] === 1;
          const label = cellLabel(x, y);
          return (
            <div
              key={i}
              title={`(${x},${y})`}
              style={{
                width: 18,
                height: 18,
                lineHeight: '18px',
                textAlign: 'center',
                fontSize: 12,
                fontFamily: 'monospace',
                borderRadius: 3,
                background: isWall ? '#1e3a8a' : '#ffffff',
                color: label
                  ? label === '@'
                    ? '#16a34a'
                    : '#dc2626'
                  : '#111827',
                boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.08)',
                userSelect: 'none',
              }}
            >
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
