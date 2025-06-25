import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get response
  const response = NextResponse.next();

  // Add Content Security Policy header
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://platform.linkedin.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://*.linkedin.com;
    font-src 'self';
    connect-src 'self';
    frame-src 'self' https://*.linkedin.com https://www.linkedin.com;
    frame-ancestors 'self';
    form-action 'self';
    base-uri 'self';
    object-src 'none';
  `;

  // Clean up the CSP header by removing newlines and extra spaces
  const formattedCspHeader = cspHeader.replace(/\s{2,}/g, " ").trim();

  // Set the header
  response.headers.set("Content-Security-Policy", formattedCspHeader);

  return response;
}

// Only run middleware on pages, not on static files
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
