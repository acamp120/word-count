import Link from "next/link";

export default function Footer() {
  return (
    <footer className="min-w-xs max-w-3xl p-4 mx-auto">
      <p className="float-left">By Aaron J. Campanella</p>
      <nav className="float-right">
        <Link href="https://x.com/ajcdev/" className="mr-4 font-bold">X</Link>
        <Link href="https://github.com/acamp120/" className="font-bold">GitHub</Link>
      </nav>
    </footer>
  );
}