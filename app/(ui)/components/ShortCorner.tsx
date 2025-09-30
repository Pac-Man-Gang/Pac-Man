export default function ShortCorner({size = 50, rotation = 0, mirrored = false}) {

    const src = mirrored ? "/assets/ShortCorner.svg" : "/assets/RightShortCorner.svg";

    return (
        <img src={src} alt=""  width={size} height={size} style={{ transform: `rotate(${rotation}deg)`}}/>
    );
}