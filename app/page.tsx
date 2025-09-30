import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <Link href="/ui">
        <button>Game</button>
      </Link>
      <br></br>
      <Link href={'/ghostTestEnv'}>
        <button>Ghost Test Enviroment</button>
      </Link>
      <br></br>
      <p>This is the home page</p>
    </main>
  );
}
