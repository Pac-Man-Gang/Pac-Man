import Image from "next/image";

export default function DoubleWallStop({ size = 40, rotation = 0, mirrored = false }) {
    return (
        <Image src="assets/WallStop.svg" alt="Double Wall Stop" width={size} height={size} style={{ transform: `${mirrored ? "scaleX(-1)" : ""} rotate(${rotation}deg)` }} />
    );
}