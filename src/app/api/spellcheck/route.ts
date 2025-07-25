import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// start as null, then hold the full dictionary set after initial file load
let dictionary: Set<string> | null = null;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // avoid runtime errors if body is missing or not defined
    const text = body?.text;

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Missing or invalid 'text'" }, { status: 400 });
    }

    if (text.length > 10000) {
      return NextResponse.json({ error: "Text too long. Max 10,000 characters." }, { status: 400 });
    }

    if (text.trim().length === 0) {
      return NextResponse.json({ error: "Text must not be empty." }, { status: 400 });
    }

    // load dictionary from text file on first request only
    if (!dictionary) {
      const filePath = path.join(process.cwd(), "public/dictionaries/words_alpha.txt");
      const data = await fs.readFile(filePath, "utf-8");
      dictionary = new Set(data.split("\n").map((w) => w.trim().toLowerCase()));
    }

    const words: string[] = text
      .toLowerCase()                // check with case insensitivity
      .replace(/[^\w\s]|_/g, "")    // remove punctuation and symbols
      .split(/\s+/)                 // split on any whitespace
      .filter(Boolean);             // remove empty strings

    // find words that do not exist in the dictionary
    const misspelled = words.filter((word) => !dictionary!.has(word));

    return NextResponse.json({ misspelled });
  } catch (err) {
    console.error("API error: ", err);
    return NextResponse.json({ error: "Internal server error", misspelled: [] }, { status: 500 });
  }
}
