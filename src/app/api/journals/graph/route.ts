import { NextResponse } from "next/server";
import { getAllJournals } from "@/lib/mdx";

// Force dynamic rendering for this route
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const journals = getAllJournals();
    console.log(`Found ${journals.length} journal entries for graph data`);

    // Extract wiki links from content (future enhancement)
    // This would require parsing content for [[wiki-links]]
    const wikiLinks: { source: string; target: string }[] = [];

    // Return graph data
    return NextResponse.json({
      nodes: journals.map((journal) => ({
        id: journal.slug,
        type: "journal",
        label: journal.title,
        date: journal.date,
        mood: journal.mood,
        category: journal.category,
        wordCount: journal.wordCount,
        tags: journal.tags,
      })),
      // Include extracted wikiLinks
      wikiLinks,
    });
  } catch (error) {
    console.error("Error fetching graph data:", error);
    return NextResponse.json(
      { error: "Failed to load graph data" },
      { status: 500 }
    );
  }
}
