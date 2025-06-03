import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format an ISO date string to a more readable format
 * @param dateString ISO date string
 * @returns Formatted date string (e.g., "January 1, 2023")
 */
export function formatDate(dateString: string): string {
  if (!dateString) return "No date";

  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

/**
 * Process content to convert hashtags and wiki links to clickable elements
 * @param content The text content to process
 * @returns Processed content with clickable links
 */
export function processContent(content: string): string {
  // Process hashtags (#tag) -> <HashtagLink tag="tagname" />
  let processed = content.replace(
    /#([a-zA-Z0-9_-]+)/g,
    (match, tagName) => `<HashtagLink tag="${tagName}" />`
  );

  // Process wiki links ([[Page Name]]) -> <WikiLink pageName="Page Name" href="/journal/page-name" />
  processed = processed.replace(/\[\[([^\]]+)\]\]/g, (match, pageName) => {
    const slug = pageName.toLowerCase().replace(/\s+/g, "-");
    // Assuming wiki links point to other journal entries for now, as per original replacement
    // The original also used a specific class, which is now handled by the WikiLink component itself.
    return `<WikiLink pageName="${pageName.replace(
      /'/g,
      "\\'"
    )}" href="/journals/${slug}" />`;
  });

  return processed;
}

/**
 * Count words in a string
 * @param text The text to count words in
 * @returns The number of words
 */
export function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}
