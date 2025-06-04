"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ProjectFrontmatter } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { ArrowRight, Calendar, Star, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProjectGallery() {
  const [projects, setProjects] = useState<ProjectFrontmatter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Fetch all projects
  useEffect(() => {
    setIsLoading(true);
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error loading projects:", err);
        setIsLoading(false);
      });
  }, []);

  // Filter projects based on search query and active filter
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      searchQuery === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesFilter =
      !activeFilter ||
      activeFilter === "all" ||
      (activeFilter === "featured" && project.featured) ||
      project.status.toLowerCase() === activeFilter.toLowerCase() ||
      project.tags.includes(activeFilter);

    return matchesSearch && matchesFilter;
  });

  // Extract all unique tags for filtering
  const allTags = Array.from(
    new Set(projects.flatMap((project) => project.tags))
  );

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <main className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-light text-stone-800 dark:text-stone-100 mb-4">
            Project Gallery
          </h1>
          <p className="text-xl text-stone-600 dark:text-stone-300 max-w-3xl">
            Explore all my projects - from conceptual experiments to fully
            realized applications.
          </p>
        </header>

        {/* Filters and Search */}
        <div className="mb-12 space-y-6">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400"
              size={18}
            />
            <Input
              type="text"
              placeholder="Search projects..."
              className="pl-10 bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={
                activeFilter === "all" || !activeFilter ? "default" : "outline"
              }
              size="sm"
              onClick={() => setActiveFilter("all")}
              className="rounded-full"
            >
              All
            </Button>
            <Button
              variant={activeFilter === "featured" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("featured")}
              className="rounded-full"
            >
              <Star className="mr-1" size={14} />
              Featured
            </Button>
            <Button
              variant={activeFilter === "Live" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("Live")}
              className="rounded-full"
            >
              Live
            </Button>
            <Button
              variant={activeFilter === "Beta" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("Beta")}
              className="rounded-full"
            >
              Beta
            </Button>
            {allTags.slice(0, 5).map((tag) => (
              <Button
                key={tag}
                variant={activeFilter === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(tag)}
                className="rounded-full"
              >
                {tag}
              </Button>
            ))}
            {allTags.length > 5 && (
              <Button variant="outline" size="sm" className="rounded-full">
                <Filter className="mr-1" size={14} />
                More
              </Button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Link
              href={`/projects/${project.slug}`}
              key={project.slug}
              className="block"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="group h-full bg-white dark:bg-stone-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      hoveredCard === index ? "scale-110" : "scale-100"
                    }`}
                  />
                  {/* Overlay with status and featured badge */}
                  <div className="absolute top-0 left-0 right-0 p-4 flex justify-between">
                    <Badge
                      className={`${
                        project.status === "Live"
                          ? "bg-green-500"
                          : project.status === "Beta"
                          ? "bg-amber-500"
                          : "bg-stone-500"
                      } text-white`}
                    >
                      {project.status}
                    </Badge>
                    {project.featured && (
                      <Badge className="bg-amber-400 dark:bg-amber-600 text-white">
                        <Star className="mr-1" size={12} /> Featured
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Date */}
                  <div className="flex items-center text-stone-500 dark:text-stone-400 text-sm mb-2">
                    <Calendar size={14} className="mr-1" />
                    {project.date ? formatDate(project.date) : "No date"}
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-medium text-stone-800 dark:text-stone-200 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {project.title}
                  </h2>

                  {/* Description */}
                  <p className="text-stone-600 dark:text-stone-300 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2 py-1 bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-full text-xs">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* What I Learned - Preview */}
                  <div className="mt-auto">
                    <h3 className="text-sm font-medium text-amber-600 dark:text-amber-400 mb-1">
                      What I Learned
                    </h3>
                    <p className="text-stone-600 dark:text-stone-300 text-xs line-clamp-2">
                      {project.learnings.technical}
                    </p>
                  </div>
                </div>

                {/* Footer with arrow */}
                <div className="px-6 py-4 border-t border-stone-100 dark:border-stone-700 flex justify-end">
                  <span className="text-amber-500 dark:text-amber-400 group-hover:translate-x-1 transition-transform">
                    <ArrowRight size={18} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-stone-800 dark:text-stone-200 mb-2">
              No projects found
            </h3>
            <p className="text-stone-600 dark:text-stone-300">
              Try adjusting your search or filters
            </p>
            <Button
              className="mt-4"
              onClick={() => {
                setSearchQuery("");
                setActiveFilter(null);
              }}
            >
              Reset filters
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
