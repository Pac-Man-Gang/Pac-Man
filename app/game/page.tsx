import Link from "next/link";

export default function GamePage() {
    return (
      <main>
        <Link href="/">
            <button>Home</button>
        </Link>
        <p>This is the game page</p>
      </main>  
    );
}