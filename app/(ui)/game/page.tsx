"use client";
import { ghostsTick, initalGhosts } from "@/app/core/ghost";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { createPacman, keyToDirection, movePacman } from "../../core/pacman";
import { Direction, GameState } from "../../core/types";
import EntityLayer from "./entitylayer";
import Maze from "./maze";

const INITIAL_STATE: GameState = {
  pacman: createPacman(5, 5),
  ghosts: initalGhosts(),
  pellets: [],
  score: 0,
  lives: 3,
};

export default function GamePage() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [playerDir, setPlayerDir] = useState<Direction | undefined>(undefined);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const dir = keyToDirection[e.key];
      if (dir !== undefined) setPlayerDir(dir);
    };
    window.addEventListener("keydown", handleKey);
    tick();

    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  function tick() {
    setGameState((prev) => ({
      ...prev,
      ghosts: ghostsTick(prev),
      pacman:
        playerDir === undefined
          ? prev.pacman
          : movePacman(prev.pacman, playerDir),
    }));
  }
  const tickCallback = useCallback(() => tick(), [playerDir]);
  return (
    <main>
      <Link href="/">
        <button>Home</button>
      </Link>
      <p>This is the game page</p>
      <p>
        Position: ({gameState.pacman.pos.x}, {gameState.pacman.pos.y}) <br />
        Direction: {gameState.pacman.dir} <br />
      </p>
      <div style={{ position: "absolute" }}>
        <Maze></Maze>
        <EntityLayer
          pacman={gameState.pacman}
          ghosts={gameState.ghosts}
          tickCallback={tickCallback}
          uiPlayerDir={playerDir}
        ></EntityLayer>
      </div>
    </main>
  );
}