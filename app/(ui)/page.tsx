import Link from 'next/link';
import Maze from './maze';

export default function GamePage() {
  return (
    <main>
      <Link href="/">
        <button>Home</button>
      </Link>
      <p>This is the game page</p>
      <Maze></Maze>
    </main>
  );
}
