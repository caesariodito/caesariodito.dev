import { NextResponse } from "next/server";
import { getAllJournals, extractLinksAndTags } from "@/lib/mdx";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.toLowerCase() || "";

    if (!query || query.length < 2) {
      return NextResponse.json({ results: [] });
    }

    const allJournals = getAllJournals();

    // Search in titles, content, tags, and extract links/tags
    const results = allJournals
      .filter((journal) => {
        const titleMatch = journal.title.toLowerCase().includes(query);
        const excerptMatch = journal.excerpt.toLowerCase().includes(query);
        const categoryMatch = journal.category.toLowerCase().includes(query);
        const tagMatch = journal.tags.some((tag) =>
          tag.toLowerCase().includes(query)
        );

        return titleMatch || excerptMatch || categoryMatch || tagMatch;
      })
      .map((journal) => ({
        title: journal.title,
        excerpt: journal.excerpt,
        slug: journal.slug,
        date: journal.date,
        category: journal.category,
        mood: journal.mood,
        tags: journal.tags,
      }));

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Error searching journals:", error);
    return NextResponse.json(
      { error: "Failed to search journals" },
      { status: 500 }
    );
  }
}
