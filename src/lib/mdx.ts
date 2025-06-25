import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Define the project frontmatter type
export interface ProjectFrontmatter {
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  approach: string;
  learnings: {
    technical: string;
    personal: string;
  };
  tags: string[];
  status: "Live" | "Beta" | "Planning";
  thumbnail: string;
  slug: string;
  date: string; // ISO date string format
  featured: boolean; // Whether the project should be featured
  hooks?: string[];
  cta?: {
    text: string;
    link: string;
  };
}

// Define the journal frontmatter type
export interface JournalFrontmatter {
  title: string;
  date: string; // ISO date string format
  category: string;
  excerpt: string;
  mood: string;
  growth: string;
  tags: string[]; // For hashtags
  wordCount: number; // For statistics
  slug: string;
}

const projectsDirectory = path.join(process.cwd(), "content/projects");
const journalsDirectory = path.join(process.cwd(), "content/journals");

// Get all project slugs
export function getProjectSlugs() {
  return fs
    .readdirSync(projectsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

// Get all journal slugs
export function getJournalSlugs() {
  return fs
    .readdirSync(journalsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

// Get all projects with frontmatter
export function getAllProjects(): ProjectFrontmatter[] {
  const slugs = getProjectSlugs();
  const projects = slugs.map((slug) => getProjectBySlug(slug));

  // Sort by date (most recent first), then by status
  return projects.sort((a, b) => {
    // First sort by date (newest first)
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }

    // Fall back to status sorting if dates are missing
    const statusOrder = { Live: 0, Beta: 1, Planning: 2 };
    return statusOrder[a.status] - statusOrder[b.status];
  });
}

// Get all journals with frontmatter
export function getAllJournals(): JournalFrontmatter[] {
  const slugs = getJournalSlugs();
  const journals = slugs.map((slug) => getJournalBySlug(slug));

  // Sort by date (most recent first)
  return journals.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });
}

// Get featured projects
export function getFeaturedProjects(limit?: number): ProjectFrontmatter[] {
  const allProjects = getAllProjects();
  // Get featured projects first, then fall back to most recent
  const featuredProjects = allProjects.filter((project) => project.featured);

  // If we don't have enough featured projects, add the most recent ones
  if (
    featuredProjects.length < (limit || 3) &&
    allProjects.length > featuredProjects.length
  ) {
    const nonFeatured = allProjects.filter((project) => !project.featured);
    featuredProjects.push(
      ...nonFeatured.slice(0, (limit || 3) - featuredProjects.length)
    );
  }

  return limit ? featuredProjects.slice(0, limit) : featuredProjects;
}

// Get a single project by slug
export function getProjectBySlug(slug: string): ProjectFrontmatter {
  const fullPath = path.join(projectsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    ...(data as ProjectFrontmatter),
    slug,
    content,
  } as ProjectFrontmatter;
}

// Get a single journal by slug
export function getJournalBySlug(slug: string): JournalFrontmatter {
  const fullPath = path.join(journalsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    ...(data as JournalFrontmatter),
    slug,
    content,
  } as JournalFrontmatter;
}

// Get a project with full content
export function getProjectWithContent(slug: string) {
  const fullPath = path.join(projectsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    frontmatter: data as ProjectFrontmatter,
    slug,
    content,
  };
}

// Get a journal with full content
export function getJournalWithContent(slug: string) {
  const fullPath = path.join(journalsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    frontmatter: data as JournalFrontmatter,
    slug,
    content,
  };
}

// Calculate journal statistics
export function getJournalStats() {
  const journals = getAllJournals();

  // Calculate unique days journaled (based on unique dates)
  const uniqueDates = new Set(
    journals.map((journal) => journal.date.split("T")[0])
  );

  // Calculate days journaled from Sep 21, 2023 to today
  const startDate = new Date("2023-09-21");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Calculate the difference in days
  const timeDiff = today.getTime() - startDate.getTime();
  const daysSinceStart = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1; // +1 to include today

  const daysJournaled = daysSinceStart;

  // Total entries
  const totalEntries = journals.length;

  // Current streak calculation
  const streak = calculateCurrentStreak(journals);

  // Average words per entry
  const totalWords = journals.reduce(
    (sum, journal) => sum + (journal.wordCount || 0),
    0
  );
  const averageWordsPerEntry =
    totalEntries > 0 ? Math.round(totalWords / totalEntries) : 0;

  return {
    daysJournaled,
    totalEntries,
    currentStreak: streak,
    averageWordsPerEntry,
  };
}

// Helper function to calculate current streak
function calculateCurrentStreak(journals: JournalFrontmatter[]): number {
  if (journals.length === 0) return 0;

  // Sort journals by date (newest first)
  const sortedJournals = [...journals].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Get unique dates (YYYY-MM-DD format)
  const uniqueDates = Array.from(
    new Set(sortedJournals.map((j) => j.date.split("T")[0]))
  ).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  if (uniqueDates.length === 0) return 0;

  // Check if most recent entry is from today or yesterday
  const mostRecent = new Date(uniqueDates[0]);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const isRecentEnough =
    mostRecent.getTime() === today.getTime() ||
    mostRecent.getTime() === yesterday.getTime();

  if (!isRecentEnough) return 0;

  // Count consecutive days
  let streak = 1;
  for (let i = 1; i < uniqueDates.length; i++) {
    const current = new Date(uniqueDates[i - 1]);
    const prev = new Date(uniqueDates[i]);

    // Check if dates are consecutive
    const diffTime = current.getTime() - prev.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (Math.round(diffDays) === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

// Extract all hashtags and wiki links from journal content
export function extractLinksAndTags(content: string) {
  // Extract hashtags (e.g., #javascript, #react)
  const hashtagRegex = /#([a-zA-Z0-9_-]+)/g;
  const hashtags = Array.from(content.matchAll(hashtagRegex), (m) => m[1]);

  // Extract wiki links (e.g., [[Node Name]])
  const wikiLinkRegex = /\[\[([^\]]+)\]\]/g;
  const wikiLinks = Array.from(content.matchAll(wikiLinkRegex), (m) => m[1]);

  return {
    hashtags: Array.from(new Set(hashtags)),
    wikiLinks: Array.from(new Set(wikiLinks)),
  };
}
