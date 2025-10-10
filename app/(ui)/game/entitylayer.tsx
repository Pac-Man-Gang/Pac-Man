import { Direction, GhostState, PacManState } from "@/app/core/types";
import GhostSprite from "../components/GhostSprite";
import PacmanSprite from "../components/PacmanSprite";

type GhostLayerProps = {
    pacman: PacManState,
    ghosts: GhostState[],
    uiPlayerDir?: Direction
}

export default function EntityLayer({ pacman, ghosts, uiPlayerDir }: GhostLayerProps) {
    return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
            <PacmanSprite pacman={pacman} uiPlayerDir={uiPlayerDir} />
            {ghosts.map(ghost => (
                <GhostSprite key={ghost.type} ghost={ghost} />
            ))}
        </div >
    );
}