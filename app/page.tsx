import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <Link href="/game">
        <button>Game</button>
      </Link>
      <p>This is the home page</p>
    </main>
  );
}