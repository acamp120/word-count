import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

let dictionary: Set<string> | null = null;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // avoid runtime errors if body is missing or not defined
    const text = body?.text;

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Missing or invalid 'text'" }, { status: 400 });
    }

    if (!dictionary) {
      const filePath = path.join(process.cwd(), "public/dictionaries/words_alpha.txt");
      const data = await fs.readFile(filePath, "utf-8");
      dictionary = new Set(data.split("\n").map((w) => w.trim().toLowerCase()));
    }

    const words: string[] = text
      .toLowerCase()
      .replace(/[^\w\s]|_/g, "")
      .split(/\s+/)
      .filter(Boolean);

    const misspelled = words.filter((word) => !dictionary!.has(word));

    return NextResponse.json({ misspelled });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ misspelled: [] }, { status: 500 });
  }
}
