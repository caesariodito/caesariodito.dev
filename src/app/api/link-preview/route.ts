import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface LinkPreviewData {
  title: string;
  description: string;
  image: string | null;
  siteName: string | null;
  favicon: string | null;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");

    if (!url) {
      return NextResponse.json(
        { error: "URL parameter is required" },
        { status: 400 }
      );
    }

    // Fetch the HTML content of the URL
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch URL content" },
        { status: 500 }
      );
    }

    const html = await response.text();

    // Extract metadata using regex
    const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : "";

    const descriptionMatch = html.match(
      /<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["'][^>]*>/i
    );
    const description = descriptionMatch ? descriptionMatch[1] : "";

    // Extract Open Graph image
    const ogImageMatch = html.match(
      /<meta[^>]*property=["']og:image["'][^>]*content=["'](.*?)["'][^>]*>/i
    );
    const image = ogImageMatch ? ogImageMatch[1] : null;

    // Extract site name
    const ogSiteNameMatch = html.match(
      /<meta[^>]*property=["']og:site_name["'][^>]*content=["'](.*?)["'][^>]*>/i
    );
    const siteName = ogSiteNameMatch ? ogSiteNameMatch[1] : null;

    // Extract favicon
    const faviconMatch = html.match(
      /<link[^>]*rel=["'](icon|shortcut icon)["'][^>]*href=["'](.*?)["'][^>]*>/i
    );
    let favicon = faviconMatch ? faviconMatch[2] : null;

    // Handle relative favicon URLs
    if (favicon && !favicon.startsWith("http")) {
      const urlObj = new URL(url);
      favicon = favicon.startsWith("/")
        ? `${urlObj.protocol}//${urlObj.host}${favicon}`
        : `${urlObj.protocol}//${urlObj.host}/${favicon}`;
    }

    const previewData: LinkPreviewData = {
      title,
      description,
      image,
      siteName,
      favicon,
    };

    return NextResponse.json(previewData);
  } catch (error) {
    console.error("Error fetching link preview:", error);
    return NextResponse.json(
      { error: "Failed to generate link preview" },
      { status: 500 }
    );
  }
}
