"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ProjectFrontmatter } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { ArrowRight, Calendar, Star, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer } from "@/components/ui/motion";

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
        <motion.div
          className="rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        ></motion.div>
      </div>
    );
  }

  return (
    <main className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.header
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="text-4xl lg:text-5xl font-light text-stone-800 dark:text-stone-100 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Project Gallery
          </motion.h1>
          <motion.p
            className="text-xl text-stone-600 dark:text-stone-300 max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Explore all my projects - from conceptual experiments to fully
            realized applications.
          </motion.p>
        </motion.header>

        {/* Filters and Search */}
        <motion.div
          className="mb-12 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400"
              size={18}
            />
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <Input
                type="text"
                placeholder="Search projects..."
                className="pl-10 bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </motion.div>
          </div>

          <motion.div
            className="flex flex-wrap gap-2"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
            initial="hidden"
            animate="show"
          >
            {/* Filter Buttons */}
            {["all", "featured", "Live", "Beta"]
              .concat(allTags.slice(0, 5))
              .map((filter, index) => (
                <motion.div
                  key={filter}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    show: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={activeFilter === filter ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveFilter(filter)}
                    className="rounded-full"
                  >
                    {filter === "featured" && (
                      <Star className="mr-1" size={14} />
                    )}
                    {filter}
                  </Button>
                </motion.div>
              ))}

            {allTags.length > 5 && (
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" size="sm" className="rounded-full">
                  <Filter className="mr-1" size={14} />
                  More
                </Button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          staggerDelay={0.1}
        >
          {filteredProjects.map((project, index) => (
            <FadeIn key={project.slug} direction="up" delay={index * 0.05}>
              <Link
                href={`/projects/${project.slug}`}
                className="block"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <motion.div
                  className="group h-full bg-white dark:bg-stone-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <motion.img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      animate={{
                        scale: hoveredCard === index ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.7 }}
                    />
                    {/* Overlay with status and featured badge */}
                    <div className="absolute top-0 left-0 right-0 p-4 flex justify-between">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                      >
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
                      </motion.div>
                      {project.featured && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.3 + index * 0.1,
                            duration: 0.5,
                          }}
                        >
                          <Badge className="bg-amber-400 dark:bg-amber-600 text-white">
                            <Star className="mr-1" size={12} /> Featured
                          </Badge>
                        </motion.div>
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
                        <motion.span
                          key={tagIndex}
                          className="px-2 py-1 bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-full text-xs"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                      {project.tags.length > 3 && (
                        <motion.span
                          className="px-2 py-1 bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-full text-xs"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          +{project.tags.length - 3}
                        </motion.span>
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
                    <motion.span
                      className="text-amber-500 dark:text-amber-400"
                      animate={{ x: hoveredCard === index ? 5 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight size={18} />
                    </motion.span>
                  </div>
                </motion.div>
              </Link>
            </FadeIn>
          ))}
        </StaggerContainer>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h3
              className="text-xl font-medium text-stone-800 dark:text-stone-200 mb-2"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              No projects found
            </motion.h3>
            <motion.p
              className="text-stone-600 dark:text-stone-300"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Try adjusting your search or filters
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilter(null);
                }}
              >
                Reset filters
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
