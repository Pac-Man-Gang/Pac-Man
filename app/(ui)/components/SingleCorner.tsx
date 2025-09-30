export default function SingleCorner({ size = 50, rotation = 0 }) {
  return (
    <img
      src="/assets/NormalCorner.svg"
      alt=""
      width={size}
      height={size}
      style={{ transform: `rotate(${rotation}deg)` }}
    />
  );
}
