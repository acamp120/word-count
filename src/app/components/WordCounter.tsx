"use client";

import { useState } from "react";
import TextInput from "./TextInput";
import Stats from "./Stats";

export default function WordCounter() {
  const [text, setText] = useState("");
  const cleanText = text.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").trim();
  const words = cleanText === "" ? [] : cleanText.split(" ");
  const wordCount = words.length;
  const charCount = text.length;
  const longestWord = words.reduce((longest, word) => (word.length > longest.length ? word : longest), "");
  const avgWordLength = wordCount === 0 ? 0 : (words.join("").length / wordCount).toFixed(2);

  // spellcheck api
  const [misspelled, setMisspelled] = useState<string[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [checkCompleted, setCheckCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function checkSpelling() {
    setIsChecking(true);
    setError(null);

    try {
      if (cleanText.length > 0) {
        const res = await fetch("/api/spellcheck/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ text })
        });

        if (!res.ok) {
          throw new Error("Server returned an error");
        }

        const data = await res.json();

        if (data.misspelled.length === 0) {
          setMisspelled([]);
        } else {
          setMisspelled(data.misspelled);
        }

        setCheckCompleted(true);
      } else {
        setMisspelled([]);
      }
    } catch (err) {
      console.error("Spell check failed:", err);
      setError("Spell check failed. Please try again.");
    } finally {
      setIsChecking(false);
    }
  }

  function clearText() {
    setCheckCompleted(false);
    setError(null);

    if (cleanText.length > 0) {
      setText("");
      setMisspelled([]);
    }
  }

  return (
    <section className="min-w-xs max-w-3xl p-4 mx-auto">
      <h1 className="text-2xl mb-3">Word & Character Counter</h1>
      <p className="text-lg mb-3">Start typing in the text area below. Stats will update live.</p>
      <p className="text-lg mb-3">You can even check your spelling via a local dictionary API!</p>
      <TextInput
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
      />
      <button
        className="w-full mb-4 px-4 py-2 bg-green-500 text-white hover:cursor-pointer disabled:bg-gray-300 disabled:text-black disabled:cursor-not-allowed rounded"
        onClick={checkSpelling}
        disabled={cleanText.length === 0 || isChecking}
      >
        {isChecking ? "Checking..." : "Check Spelling"}
      </button>
      <button
        className="w-full mb-4 px-4 py-2 bg-red-500 text-white disabled:bg-gray-300 hover:cursor-pointer disabled:text-black disabled:cursor-not-allowed rounded"
        onClick={clearText}
        disabled={cleanText.length === 0}
      >
        Reset
      </button>

      {error && (
        <div className="mt-4 mb-4 p-4 border rounded border-red-600 bg-red-100 text-red-800">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
        </div>
      )}

      {checkCompleted && misspelled.length === 0 && (
        <div className="mt-4 mb-4 p-4 border rounded border-green-400 bg-green-200">
          <h2 className="text-lg font-bold text-center">No Spelling Errors Found!</h2>
        </div>
      )}

      {checkCompleted && misspelled.length > 0 && (
        <div className="mt-4 mb-4 p-4 border rounded border-red-400 bg-red-200">
          <h2 className="text-lg font-bold mb-2">Possible Misspellings:</h2>
          <ul className="list-disc list-inside">
            {misspelled.map((word, idx) => (
              <li key={idx}>{word}</li>
            ))}
          </ul>
        </div>
      )}

      <Stats
        wordCount={wordCount}
        charCount={charCount}
        longestWord={longestWord || "N/A"}
        avgWordLength={avgWordLength}
      />
    </section>
  );
}