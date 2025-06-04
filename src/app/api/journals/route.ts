import { NextResponse } from "next/server";
import { getAllJournals, getJournalStats } from "@/lib/mdx";

// Force dynamic rendering for this route
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Pagination
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const skip = (page - 1) * limit;

    // Filtering
    const query = searchParams.get("q")?.toLowerCase();
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");

    // Sorting
    const sortBy = searchParams.get("sortBy") || "date";
    const sortDirection = searchParams.get("sortDirection") || "desc";

    // Stats flag
    const includeStats = searchParams.get("stats") === "true";

    // Get all journals and apply filters
    let journals = getAllJournals();

    // Ensure unique entries by slug
    const uniqueSlugs = new Set();
    journals = journals.filter((journal) => {
      if (uniqueSlugs.has(journal.slug)) {
        return false;
      }
      uniqueSlugs.add(journal.slug);
      return true;
    });

    // Apply filters
    if (query) {
      journals = journals.filter(
        (journal) =>
          journal.title.toLowerCase().includes(query) ||
          journal.excerpt.toLowerCase().includes(query)
      );
    }

    if (category) {
      journals = journals.filter(
        (journal) => journal.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (tag) {
      journals = journals.filter((journal) =>
        journal.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
      );
    }

    // Apply sorting
    journals.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "wordCount":
          comparison = (a.wordCount || 0) - (b.wordCount || 0);
          break;
        case "date":
        default:
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });

    // Apply pagination
    const paginatedJournals = journals.slice(skip, skip + limit);

    if (includeStats) {
      const stats = getJournalStats();
      return NextResponse.json({
        journals: paginatedJournals,
        stats,
        total: journals.length,
        page,
        limit,
      });
    }

    return NextResponse.json(paginatedJournals);
  } catch (error) {
    console.error("Error fetching journals:", error);
    return NextResponse.json(
      { error: "Failed to load journals" },
      { status: 500 }
    );
  }
}
