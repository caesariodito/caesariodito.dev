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

const projectsDirectory = path.join(process.cwd(), "content/projects");

// Get all project slugs
export function getProjectSlugs() {
  return fs
    .readdirSync(projectsDirectory)
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
