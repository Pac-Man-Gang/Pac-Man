import { Ghost, PacMan } from "@/app/core/types";
import GhostSprite from "../components/GhostSprite";
import PacmanSprite from "../components/PacmanSprite";

type GhostLayerProps = {
    pacman: PacMan,
    ghosts: Ghost[]
}

export default function EntityLayer({ pacman, ghosts }: GhostLayerProps) {
    return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
            <PacmanSprite pacman={pacman} />
            {ghosts.map(ghost => (
                <GhostSprite key={ghost.type} ghost={ghost} />
            ))}
        </div >
    );
}