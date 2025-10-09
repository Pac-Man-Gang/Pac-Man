import { Direction, Ghost, PacMan } from "@/app/core/types";
import GhostSprite from "../components/GhostSprite";
import PacmanSprite from "../components/PacmanSprite";

type GhostLayerProps = {
    pacman: PacMan,
    ghosts: Ghost[],
    tickCallback: () => void,
    uiPlayerDir?: Direction
}

export default function EntityLayer({ pacman, ghosts, tickCallback, uiPlayerDir }: GhostLayerProps) {
    return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
            <PacmanSprite pacman={pacman} uiPlayerDir={uiPlayerDir} />
            {ghosts.map(ghost => (
                <GhostSprite key={ghost.type} ghost={ghost} tickCallback={tickCallback} />
            ))}
        </div >
    );
}