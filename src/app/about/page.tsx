import Link from "next/link";

export default function AboutPage() {
  return (
    <section className="min-w-xs max-w-3xl p-4 mx-auto">
      <h1 className="text-2xl font-bold mb-3">About This App</h1>
      <p className="mb-3">
        This is a simple Word & Character Counter built with Next.js and Tailwind CSS.
      </p>
      <p className="mb-3">
        Its feature set is growing as I learn Next.js and React concepts.
      </p>

      <h2 className="text-xl font-bold mb-3">Current Features</h2>
      <ul className="list-disc list-inside mb-6">
        <li>Live updates for word count, character count, longest word, and average word length.</li>
        <li>Spell check API integration using <Link href="https://github.com/dwyl/english-words" target="_blank" className="underline text-blue-600" rel="noopener noreferrer">dwyl's English Words</Link> dictionary.</li>
        <li>Reset button to clear the input and reset stats.</li>
        <li>Client-side routing with Next.js <code className="bg-gray-300 px-1">&lt;Link&gt;</code> components for smooth navigation.</li>
        <li>Responsive design powered by Tailwind CSS utility classes.</li>
      </ul>

      <h2 className="text-xl font-bold mb-3">Concepts Utilized</h2>
      <ul className="list-disc list-inside mb-6">
        <li>React hooks (<code className="bg-gray-300 px-1">useState</code>) for local state management and UI reactivity.</li>
        <li>Next.js App Router with file-based routing and layouts.</li>
        <li>Client vs Server Components in Next.js — managing when code runs on client or server.</li>
        <li>API routes for backend logic, including file reading and asynchronous fetch requests.</li>
        <li>Conditional rendering and disabling buttons based on input state.</li>
        <li>TypeScript for type safety and interface declarations.</li>
        <li>Handling asynchronous data fetching with <code className="bg-gray-300 px-1">fetch</code> and JSON parsing.</li>
        <li>Basic text processing with regular expressions for cleaning input text.</li>
        <li>Tailwind CSS for utility-first styling and responsive layout.</li>
      </ul>
    </section>
  );
}
