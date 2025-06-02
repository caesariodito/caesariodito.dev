import { NextResponse } from "next/server";
import { getAllProjects, getFeaturedProjects } from "@/lib/mdx";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured") === "true";
    const limit = searchParams.get("limit")
      ? parseInt(searchParams.get("limit") as string)
      : undefined;

    const projects = featured ? getFeaturedProjects(limit) : getAllProjects();

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to load projects" },
      { status: 500 }
    );
  }
}
