import Image from "next/image";

export default function SmallPellet({ size = 40 }) {
    return <Image src="/assets/SmallPellet.svg" alt="Small Pellet" width={size} height={size} />;
}