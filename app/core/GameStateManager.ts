import {
  initialGhosts,
  nextGhostState,
  nextGhostStates,
} from '@/app/core/ghost';
import { getGhostSprite } from '../(ui)/components/GhostSprite';
import { getPacmanSprite } from '../(ui)/components/PacmanSprite';
import { calcPixelPos, PopupBean, ScoreBean } from '../(ui)/game/page';
import { initialPacman, nextPacManState } from './pacman';
import {
  Direction,
  GameState,
  GhostMode,
  GhostState,
  GhostType,
} from './types';

export const INITIAL_GAMESTATE: GameState = {
  pacman: initialPacman(13, 23),
  ghosts: initialGhosts(),
  score: 0,
  lives: 3,
};

const gameStates: GameState[] = [INITIAL_GAMESTATE];
let score = 0;
let invincible = false;
export const INVINCIBLE_MS = 1500;

export function spritesOverlapping(sprite1: Element, sprite2: Element) {
  const rect1 = sprite1.getBoundingClientRect();
  const rect2 = sprite2.getBoundingClientRect();

  const shrinkHitbox = 3;

  return !(
    rect1.right - shrinkHitbox < rect2.left + shrinkHitbox ||
    rect1.left + shrinkHitbox > rect2.right - shrinkHitbox ||
    rect1.bottom - shrinkHitbox < rect2.top + shrinkHitbox ||
    rect1.top + shrinkHitbox > rect2.bottom - shrinkHitbox
  );
}

export function updateGhost(type: GhostType) {
  const prevGameState = previousGameState();
  const prevGhostState = prevGameState.ghosts.find((g) => g.type === type)!;
  const newGhostState = nextGhostState(prevGameState, type);

  const ghosts: GhostState[] = [];
  prevGameState.ghosts.forEach((ghost) =>
    ghosts.push(ghost.type === type ? newGhostState : ghost)
  );
  const nextGameState = {
    ghosts,
    pacman: prevGameState.pacman,
    score,
    lives: prevGameState.lives,
  };

  if (
    newGhostState.mode === GhostMode.EATEN &&
    prevGameState.ghosts.find((g) => g.type === type)!.mode ===
      GhostMode.FRIGHTENED
  ) {
    const ghostSpritePos = calcPixelPos(
      getGhostSprite(type).getBoundingClientRect()
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
  } else if (
    prevGhostState.mode !== GhostMode.FRIGHTENED &&
    prevGhostState.mode !== GhostMode.EATEN &&
    spritesOverlapping(getPacmanSprite(), getGhostSprite(type)) &&
    !invincible
  ) {
    nextGameState.lives -= 1;
    if (nextGameState.lives <= 0) {
      window.dispatchEvent(new CustomEvent('gameOver'));
      return prevGameState.ghosts.find((g) => g.type === type)!;
    }
    invincible = true;
    setTimeout(() => (invincible = false), INVINCIBLE_MS);
    window.dispatchEvent(new CustomEvent('pacHit'));
  }

  gameStates.push(nextGameState);
  return newGhostState;
}

export function updatePacman(dir: Direction) {
  const prevGameState = previousGameState();

  const newPacmanState = nextPacManState(prevGameState.pacman, dir);
  gameStates.push({
    ghosts: prevGameState.ghosts,
    pacman: newPacmanState,
    score,
    lives: prevGameState.lives,
  });
  return newPacmanState;
}

export function nextGameState(playerDir: Direction): GameState {
  const prevGameState = previousGameState();

  const ghosts = nextGhostStates(prevGameState);
  const pacman =
    playerDir === undefined
      ? prevGameState.pacman
      : nextPacManState(prevGameState.pacman, playerDir);

  const nextGameState = { ghosts, pacman, score, lives: prevGameState.lives };

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
  } else {
    const overlappingGhost = nextGameState.ghosts
      .filter(
        (g) => g.mode !== GhostMode.FRIGHTENED && g.mode !== GhostMode.EATEN
      )
      .find((g) =>
        spritesOverlapping(getPacmanSprite(), getGhostSprite(g.type))
      );
    if (overlappingGhost && !invincible) {
      nextGameState.lives -= 1;
      window.dispatchEvent(new CustomEvent('pacHit'));
      if (nextGameState.lives <= 0) {
        window.dispatchEvent(new CustomEvent('gameOver'));
        return prevGameState;
      }
      invincible = true;
      setTimeout(() => (invincible = false), INVINCIBLE_MS);
    }
  }
  gameStates.push(nextGameState);
  return nextGameState;
}

export function previousGameState(): GameState {
  return gameStates.at(-1)!;
}

export function addScore(amount: number) {
  score += amount;
  window.dispatchEvent(
    new CustomEvent<ScoreBean>('addScore', {
      detail: { score },
    })
  );
}
