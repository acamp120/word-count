interface StatsProps {
  wordCount: number;
  charCount: number;
  longestWord: string;
  avgWordLength: string | number;
}

export default function Stats({ wordCount, charCount, longestWord, avgWordLength }: StatsProps) {
  return (
    <div className="w-full border rounded border-green-400 bg-green-300 p-3">
      <p className="text-base mb-2">Word count: <span className="font-bold">{wordCount}</span></p>
      <p className="text-base mb-2">Character count: <span className="font-bold">{charCount}</span></p>
      <p className="text-base mb-2">Longest word: <span className="font-bold">{longestWord}</span></p>
      <p className="text-base mb-0">Average word length: <span className="font-bold">{avgWordLength}</span></p>
    </div>
  );
}