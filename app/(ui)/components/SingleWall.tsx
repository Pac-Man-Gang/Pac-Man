export default function DoubleWall({size = 50, rotation = 0, mirrored = false}) {

    const src = mirrored ? "/assets/RightSingleWall.svg" : "/assets/SingleWall.svg"

    return (
        <img src={src} alt="" width={size} height={size} style={{ transform: `rotate(${rotation}deg)`}}/>
    );
}