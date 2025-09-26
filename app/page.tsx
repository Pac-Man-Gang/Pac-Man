import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <Link href="/game">
        <button>Game</button>
      </Link>
      <br></br>
      <Link href={'ui/ghostTestEnv'}>
        <button>Ghost Test Enviroment</button>
      </Link>
      <br></br>
      <p>This is the home page</p>
    </main>
  );
}
