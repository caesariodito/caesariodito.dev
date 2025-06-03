import { NextResponse } from "next/server";
import { getAllJournals, getJournalStats } from "@/lib/mdx";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit")
      ? parseInt(searchParams.get("limit") as string)
      : undefined;
    const includeStats = searchParams.get("stats") === "true";

    const journals = getAllJournals();
    const limitedJournals = limit ? journals.slice(0, limit) : journals;

    if (includeStats) {
      const stats = getJournalStats();
      return NextResponse.json({
        journals: limitedJournals,
        stats,
      });
    }

    return NextResponse.json(limitedJournals);
  } catch (error) {
    console.error("Error fetching journals:", error);
    return NextResponse.json(
      { error: "Failed to load journals" },
      { status: 500 }
    );
  }
}
