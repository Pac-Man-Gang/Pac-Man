'use client';

import { MazeTile } from '@/app/(ui)/tiles/MazeTile'; // adjust path if needed
import React from 'react';

// Import the TILE_SPRITES map directly
import { TILE_SPRITES } from '@/app/(ui)/tiles/MazeTile'; // adjust path

// ---- Group tile keys by category for visual organization ----
const CATEGORIES: Record<string, string[]> = {
  'Empty / Specials': ['emptyCell'],
  'Single Walls': Object.keys(TILE_SPRITES).filter((k) =>
    k.startsWith('singleWall')
  ),
  'Double Walls': Object.keys(TILE_SPRITES).filter((k) =>
    k.startsWith('doubleWall')
  ),
  'Wall Stops': Object.keys(TILE_SPRITES).filter((k) =>
    k.startsWith('wallStop')
  ),
  'Connectors (T-Junctions + Crossroads)': Object.keys(TILE_SPRITES).filter(
    (k) => k.startsWith('connector')
  ),
  'Corners – Short (Inside)': Object.keys(TILE_SPRITES).filter((k) =>
    k.startsWith('shortCorner')
  ),
  'Corners – Double (Outer)': Object.keys(TILE_SPRITES).filter((k) =>
    k.startsWith('doubleCorner')
  ),
  'Corners – Sharp (Ghost House)': Object.keys(TILE_SPRITES).filter((k) =>
    k.startsWith('sharpDoubleCorner')
  ),
  'Corners – Normal (Default)': Object.keys(TILE_SPRITES).filter((k) =>
    k.startsWith('normalCorner')
  ),
};

export default function TileDebugPage() {
  return (
    <main
      style={{
        padding: '30px',
        fontFamily: 'sans-serif',
        background: '#fff',
        minHeight: '100vh',
        color: '#111',
      }}
    >
      <h1 style={{ marginBottom: '20px' }}>🧩 Maze Tile Debug Viewer</h1>
      <p style={{ marginBottom: '25px', opacity: 0.8 }}>
        Displays all tile sprites, rotations, and flip variants. Use this to
        verify visual correctness and maze logic output.
      </p>

      {Object.entries(CATEGORIES).map(([category, tiles]) => (
        <section key={category} style={{ marginBottom: '40px' }}>
          <h2 style={{ marginBottom: '15px' }}>{category}</h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
              gap: '18px',
            }}
          >
            {tiles.map((key) => (
              <div
                key={key}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  margin: '12px',
                }}
              >
                {/* TILE NAME (above the box) */}
                <div
                  style={{
                    marginBottom: '6px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#222',
                    textAlign: 'center',
                    maxWidth: '120px',
                    wordBreak: 'break-word',
                  }}
                >
                  {key}
                </div>

                {/* BLACK TILE BOX */}
                <div
                  style={{
                    background: '#000',
                    padding: '12px',
                    borderRadius: '8px',
                    width: '100px',
                    height: '100px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  }}
                >
                  <MazeTile tile={key} size={60} />
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
