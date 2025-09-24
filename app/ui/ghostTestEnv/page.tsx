'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ghostsTick, LEVEL_MAP } from '../../core/ghost';
import { Direction, GameState, GhostMode, GhostType } from '../../core/types';
import { GridView } from './GridView';

const INITIAL_STATE: GameState = {
    pacman: { pos: { x: 26, y: 6 }, sprite: 'pacman', dir: Direction.E, frame: 0, spawnPoint: { x: 26, y: 6 } },
    ghosts: [
        { pos: { x: 14, y: 11 }, sprite: 'B', dir: Direction.N, frame: 0, type: GhostType.BLINKY, mode: GhostMode.SCATTER, spawnPoint: { x: 14, y: 11 } },
        { pos: { x: 13, y: 11 }, sprite: 'P', dir: Direction.N, frame: 0, type: GhostType.PINKY, mode: GhostMode.SCATTER, spawnPoint: { x: 13, y: 11 } },
        { pos: { x: 14, y: 11 }, sprite: 'I', dir: Direction.N, frame: 0, type: GhostType.INKY, mode: GhostMode.SCATTER, spawnPoint: { x: 14, y: 11 } },
        { pos: { x: 13, y: 11 }, sprite: 'C', dir: Direction.N, frame: 0, type: GhostType.CLYDE, mode: GhostMode.SCATTER, spawnPoint: { x: 13, y: 11 } }
    ],
    pellets: [],
    score: 0,
    lives: 3
}

export default function HomePage() {
    const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);

    function tick() {
        setGameState(prev => {
            return { ...prev, ghosts: ghostsTick(prev) }; // new state object
        });
    }

    useEffect(() => {
        console.log(gameState.ghosts[0]);
    }, [gameState.ghosts])

    function testFunction() {
    }

    return (
        <main style={{ padding: 16 }}>
            <Link href="/game"><button>Game</button></Link>
            <h1>Map Preview</h1>
            <GridView map={LEVEL_MAP} pac={gameState.pacman} ghosts={gameState.ghosts} />
            <br></br>
            <br></br>
            <button onClick={() => tick()}>Next Tick</button>
            <br></br>
            <button onClick={() => testFunction()}>Test Function</button>
        </main>
    );
}