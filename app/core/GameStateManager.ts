import { initalGhosts, nextGhostStates } from '@/app/core/ghost';
import { getGhostSprite } from '../(ui)/components/GhostSprite';
import { calcPixelPos, PopupBean } from '../(ui)/game/page';
import { initialPacman, nextPacManState } from './pacman';
import { Direction, GameState, GhostMode } from './types';

export const INITIAL_GAMESTATE: GameState = {
  pacman: initialPacman(13, 23),
  ghosts: initalGhosts(),
  score: 0,
  lives: 3,
};

const gameStates: GameState[] = [INITIAL_GAMESTATE];
let score = 0;

export function nextGameState(playerDir: Direction): GameState {
  const prevGameState = previousGameState();

  const ghosts = nextGhostStates(prevGameState);
  const pacman =
    playerDir === undefined
      ? prevGameState.pacman
      : nextPacManState(prevGameState.pacman, playerDir);

  const nextGameState = { ghosts, pacman, score, lives: 0 };

  const eatenGhost = nextGameState.ghosts.find(
    (ghost) =>
      ghost.mode === GhostMode.EATEN &&
      prevGameState.ghosts.find((g) => g.type === ghost.type)!.mode !==
        GhostMode.EATEN
  );
  if (eatenGhost) {
    const ghostSpritePos = calcPixelPos(
      getGhostSprite(eatenGhost.type).getBoundingClientRect()
    );
    window.dispatchEvent(
      new CustomEvent<PopupBean>('newPopup', {
        detail: {
          x: ghostSpritePos.x + 30,
          y: ghostSpritePos.y - 30,
          text: '200',
        },
      })
    );
    addScore(200);
  }

  gameStates.push(nextGameState);
  return nextGameState;
}

export function previousGameState(): GameState {
  return gameStates.at(-1)!;
}

export function addScore(amount: number) {
  score += amount;
}
