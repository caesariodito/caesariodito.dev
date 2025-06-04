import { NextResponse } from "next/server";
import { getAllJournals } from "@/lib/mdx";

export async function GET() {
  try {
    const journals = getAllJournals();

    // Extract unique categories
    const categories = Array.from(
      new Set(journals.map((journal) => journal.category))
    );

    // Extract unique tags
    const tagsSet = new Set<string>();
    journals.forEach((journal) => {
      journal.tags.forEach((tag) => tagsSet.add(tag));
    });
    const tags = Array.from(tagsSet);

    return NextResponse.json({
      categories,
      tags,
    });
  } catch (error) {
    console.error("Error fetching journal metadata:", error);
    return NextResponse.json(
      { error: "Failed to load journal metadata" },
      { status: 500 }
    );
  }
}
