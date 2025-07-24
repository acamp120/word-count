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

  // mock spellcheck api
  const [misspelled, setMisspelled] = useState<string[]>([]);

  async function checkSpelling() {
    const res = await fetch("/api/spellcheck/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text })
    });

    const data = await res.json();
    setMisspelled(data.misspelled);
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
        className="w-full mb-4 px-4 py-2 bg-green-500 text-white rounded"
        onClick={checkSpelling}
      >
        Check Spelling
      </button>
      <button
        className="w-full mb-4 px-4 py-2 bg-red-500 text-white rounded"
        onClick={() => setText("")}
      >
        Reset
      </button>

      {misspelled.length > 0 && (
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