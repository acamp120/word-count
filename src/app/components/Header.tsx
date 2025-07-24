import Link from "next/link";

export default function Header() {
  return (
    <header className="min-w-xs max-w-3xl p-4 mx-auto">
      <nav>
        <Link href="/" className="mr-4">Home</Link>
        <Link href="/about">About</Link>
      </nav>
    </header>
  );
}