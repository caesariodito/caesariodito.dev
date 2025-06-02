"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Code,
  Lightbulb,
  RefreshCw,
  Sparkles,
  Calendar,
} from "lucide-react";
import { useState, useRef, MouseEvent, useEffect } from "react";
import Link from "next/link";
import { ProjectFrontmatter } from "@/lib/mdx";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [projects, setProjects] = useState<ProjectFrontmatter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Fetch projects data
  useEffect(() => {
    setIsLoading(true);
    // In a client component, we need to fetch the data from an API endpoint
    fetch("/api/projects?featured=true&limit=3")
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

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>, index: number) => {
    if (!cardRefs.current[index]) return;

    const card = cardRefs.current[index];
    const rect = card.getBoundingClientRect();

    // Calculate relative position within the card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Use requestAnimationFrame for smoother animation
    requestAnimationFrame(() => {
      setMousePosition({ x, y });
    });
  };

  const handleCardClick = (slug: string) => {
    router.push(`/projects/${slug}`);
  };

  // Loading animation component
  const LoadingAnimation = () => {
    const [loadingText, setLoadingText] = useState("Building mindful projects");

    useEffect(() => {
      const texts = [
        "Building mindful projects",
        "Crafting code with soul",
        "Reflecting on growth",
        "Connecting dots",
        "Finding inspiration",
      ];

      let index = 0;
      const interval = setInterval(() => {
        index = (index + 1) % texts.length;
        setLoadingText(texts[index]);
      }, 2000);

      return () => clearInterval(interval);
    }, []);

    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="relative">
          {/* Rotating circle */}
          <div className="w-32 h-32 rounded-full border-4 border-stone-200 dark:border-stone-700 border-t-amber-400 dark:border-t-amber-600 animate-spin"></div>

          {/* Floating icons */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-24 h-24">
              <div className="absolute top-0 left-0 animate-float-slow text-amber-500 dark:text-amber-400">
                <Code size={20} />
              </div>
              <div className="absolute top-1/3 right-0 animate-float-medium text-green-500 dark:text-green-400">
                <Lightbulb size={20} />
              </div>
              <div className="absolute bottom-0 left-1/4 animate-float-fast text-blue-500 dark:text-blue-400">
                <Sparkles size={20} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-lg text-stone-600 dark:text-stone-300 animate-pulse">
            {loadingText}
          </p>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-2">
            Gathering insights and reflections...
          </p>
        </div>
      </div>
    );
  };

  return (
    <main className="pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <section className="py-16 text-center">
          <h1 className="text-4xl lg:text-5xl font-light text-stone-800 dark:text-stone-100 mb-6">
            Mindful Builds
          </h1>
          <p className="text-xl text-stone-600 dark:text-stone-300 leading-relaxed max-w-3xl mx-auto">
            Each project is a conversation between technical craft and personal
            growth, built with intention and reflection.
          </p>
        </section>

        {/* Projects Grid or Loading Animation */}
        <section className="space-y-16">
          {isLoading ? (
            <LoadingAnimation />
          ) : (
            projects.map((project, index) => (
              <Card
                key={index}
                ref={(el) => {
                  cardRefs.current[index] = el;
                  return null;
                }}
                className="p-8 bg-white/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-300 relative overflow-hidden cursor-pointer"
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onClick={() => handleCardClick(project.slug)}
              >
                {/* Cursor-following Thumbnail */}
                {hoveredProject === index && (
                  <div
                    className="absolute z-20 pointer-events-none transition-all duration-200 ease-out"
                    style={{
                      width: "200px",
                      height: "150px",
                      left: `${mousePosition.x}px`,
                      top: `${mousePosition.y}px`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div className="w-full h-full rounded-lg overflow-hidden shadow-2xl border-2 border-amber-400 dark:border-amber-600">
                      <img
                        src={project.thumbnail}
                        alt={`${project.title} thumbnail`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Project Info */}
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-2xl font-medium text-stone-800 dark:text-stone-200 border-b-2 border-amber-400 dark:border-amber-600 inline-block pb-1">
                          {project.title}
                        </h2>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              project.status === "Live"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                                : project.status === "Beta"
                                ? "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
                                : "bg-stone-100 text-stone-700 dark:bg-stone-700 dark:text-stone-300"
                            }`}
                          >
                            {project.status}
                          </span>
                          {project.featured && (
                            <span className="text-amber-500 dark:text-amber-400">
                              <Sparkles size={16} />
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-lg text-amber-600 dark:text-amber-400 mb-4">
                        {project.subtitle}
                      </p>
                      <div className="flex items-center text-stone-500 dark:text-stone-400 text-sm mb-4">
                        <Calendar size={14} className="mr-1" />
                        {project.date ? formatDate(project.date) : "No date"}
                      </div>
                      <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Problem & Approach */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-stone-800 dark:text-stone-200 mb-2">
                          The Problem
                        </h4>
                        <p className="text-stone-600 dark:text-stone-300 text-sm">
                          {project.problem}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-stone-800 dark:text-stone-200 mb-2">
                          My Approach
                        </h4>
                        <p className="text-stone-600 dark:text-stone-300 text-sm">
                          {project.approach}
                        </p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Learnings Section */}
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-amber-50 to-stone-50 dark:from-amber-900/10 dark:to-stone-800 p-6 rounded-2xl">
                      <h4 className="font-medium text-stone-800 dark:text-stone-200 mb-4">
                        What I Learned
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs font-medium text-amber-700 dark:text-amber-400 uppercase tracking-wide mb-1">
                            Technical
                          </p>
                          <p className="text-stone-600 dark:text-stone-300 text-sm">
                            {project.learnings.technical}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-amber-700 dark:text-amber-400 uppercase tracking-wide mb-1">
                            Personal
                          </p>
                          <p className="text-stone-600 dark:text-stone-300 text-sm">
                            {project.learnings.personal}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* "Click me!" indicator */}
                <div className="absolute bottom-3 right-4">
                  <span className="text-xs italic text-stone-400 dark:text-stone-500 flex items-center">
                    Hover on and Click me!{" "}
                    <ArrowRight className="ml-1 w-3 h-3" />
                  </span>
                </div>
              </Card>
            ))
          )}
        </section>

        {/* View All Projects Button */}
        <div className="mt-8 text-center">
          <Link href="/project-gallery">
            <Button
              variant="outline"
              className="border-amber-300 dark:border-amber-600 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20"
            >
              View All Projects <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Call to Action */}
        <section className="py-16 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-light text-stone-800 dark:text-stone-100">
              Interested in collaborating?
            </h2>
            <p className="text-stone-600 dark:text-stone-300">
              I'm always open to projects that blend technical excellence with
              meaningful impact.
            </p>
            <Button
              variant="outline"
              className="border-amber-300 dark:border-amber-600 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 px-8 py-3 rounded-full"
            >
              Let's Connect
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Projects;
