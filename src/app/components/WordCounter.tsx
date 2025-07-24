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

  return (
    <section className="min-w-xs max-w-3xl p-4 mx-auto">
      <h1 className="text-2xl mb-3">Word & Character Counter</h1>
      <p className="text-lg mb-3">Start typing in the text area below. Stats will update live.</p>
      <TextInput
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
      />
      <button
        className="w-full mb-4 px-4 py-2 bg-red-500 text-white rounded"
        onClick={() => setText("")}
      >
        Reset
      </button>
      <Stats
        wordCount={wordCount}
        charCount={charCount}
        longestWord={longestWord || "N/A"}
        avgWordLength={avgWordLength}
      />
    </section>
  );
}