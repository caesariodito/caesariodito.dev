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

  // Sort by status: Live first, then Beta, then Planning
  return projects.sort((a, b) => {
    const statusOrder = { Live: 0, Beta: 1, Planning: 2 };
    return statusOrder[a.status] - statusOrder[b.status];
  });
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
