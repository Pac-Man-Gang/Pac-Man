"use client";
import { ghostsTick } from "@/app/core/ghost";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPacman, keyToDirection, movePacman } from "../../core/pacman";
import { Direction, GameState, GhostMode, GhostType } from "../../core/types";
import EntityLayer from "./entitylayer";
import Maze from "./maze";
const INITIAL_STATE: GameState = {
  pacman: createPacman(5, 5),
  ghosts: [
    {
      pos: { x: 14, y: 11 },
      sprite: "blinky",
      dir: Direction.N,
      frame: 0,
      type: GhostType.BLINKY,
      mode: GhostMode.SCATTER,
      spawnPoint: { x: 14, y: 11 },
    },
    {
      pos: { x: 14, y: 11 },
      sprite: "pinky",
      dir: Direction.N,
      frame: 0,
      type: GhostType.PINKY,
      mode: GhostMode.SCATTER,
      spawnPoint: { x: 14, y: 11 },
    },
    {
      pos: { x: 14, y: 11 },
      sprite: "inky",
      dir: Direction.N,
      frame: 0,
      type: GhostType.INKY,
      mode: GhostMode.SCATTER,
      spawnPoint: { x: 14, y: 11 },
    },
    {
      pos: { x: 14, y: 11 },
      sprite: "clyde",
      dir: Direction.N,
      frame: 0,
      type: GhostType.CLYDE,
      mode: GhostMode.SCATTER,
      spawnPoint: { x: 14, y: 11 },
    },
  ],
  pellets: [],
  score: 0,
  lives: 3,
};
const TICK_MS = 250;
export default function GamePage() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [playerDir, setPlayerDir] = useState<Direction | undefined>(undefined);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const dir = keyToDirection[e.key];
      if (dir !== undefined) setPlayerDir(dir);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      console.log("TICK");
      setGameState((prev) => ({
        ...prev,
        ghosts: ghostsTick(prev),
        pacman:
          playerDir === undefined
            ? prev.pacman
            : movePacman(prev.pacman, playerDir),
      }));
    }, TICK_MS);
    return () => clearInterval(id);
  }, [playerDir]);
  return (
    <main>
      {" "}
      <Link href="/">
        {" "}
        <button>Home</button>{" "}
      </Link>{" "}
      <p>This is the game page</p>{" "}
      <p>
        {" "}
        Position: ({gameState.pacman.pos.x}, {gameState.pacman.pos.y}) <br />{" "}
        Direction: {gameState.pacman.dir} <br /> Frame: {gameState.pacman.frame}{" "}
      </p>{" "}
      <div style={{ position: "absolute" }}>
        {" "}
        <Maze></Maze>{" "}
        <EntityLayer
          pacman={gameState.pacman}
          ghosts={gameState.ghosts}
        ></EntityLayer>{" "}
      </div>{" "}
    </main>
  );
}
