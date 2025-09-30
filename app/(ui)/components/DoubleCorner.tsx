export default function DoubleCorner({ size = 50, rotation = 0 }) {
  return (
    <img
      src="/assets/DoubleCorner.svg"
      alt=""
      width={size}
      height={size}
      style={{ transform: `rotate(${rotation}deg)` }}
    />
  );
}
