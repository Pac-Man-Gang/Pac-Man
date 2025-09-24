export default function DoubleWall({size = 30, rotation = 0}) {
    return (
        <img src="/assets/DoubleWall.svg" alt="" width={size} height={size} style={{ transform: `rotate(${rotation}deg)`}}/>
    );
}