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
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

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
        <motion.section
          className="py-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl lg:text-5xl font-light text-stone-800 dark:text-stone-100 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Mindful Builds
          </motion.h1>
          <motion.p
            className="text-xl text-stone-600 dark:text-stone-300 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Each project is a conversation between technical craft and personal
            growth, built with intention and reflection.
          </motion.p>
        </motion.section>

        {/* Projects Grid or Loading Animation */}
        <section className="space-y-16">
          {isLoading ? (
            <LoadingAnimation />
          ) : (
            projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
              >
                <Card
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
                    <motion.div
                      className="absolute z-20 pointer-events-none"
                      style={{
                        width: "200px",
                        height: "150px",
                        left: `${mousePosition.x}px`,
                        top: `${mousePosition.y}px`,
                        transform: "translate(-50%, -50%)",
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        x: 0,
                        y: 0,
                        rotate: [-2, 0, 2, 0],
                        transition: {
                          opacity: { duration: 0.3 },
                          scale: { duration: 0.3 },
                          rotate: {
                            repeat: Infinity,
                            duration: 5,
                            ease: "easeInOut",
                          },
                        },
                      }}
                      transition={{
                        type: "spring",
                        damping: 25,
                        stiffness: 300,
                        mass: 0.5,
                      }}
                      drag
                      dragConstraints={{
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                      }}
                      dragElastic={0.1}
                    >
                      <motion.div
                        className="w-full h-full rounded-lg overflow-hidden shadow-2xl border-2 border-amber-400 dark:border-amber-600"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.img
                          src={project.thumbnail}
                          alt={`${project.title} thumbnail`}
                          className="w-full h-full object-cover"
                          initial={{ scale: 1 }}
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.8 }}
                        />
                      </motion.div>
                    </motion.div>
                  )}

                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Project Info */}
                    <div className="lg:col-span-2 space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <motion.h2
                            className="text-2xl font-medium text-stone-800 dark:text-stone-200 border-b-2 border-amber-400 dark:border-amber-600 inline-block pb-1"
                            initial={{ width: "60%" }}
                            whileInView={{ width: "auto" }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.5,
                              delay: 0.3 + index * 0.2,
                            }}
                          >
                            {project.title}
                          </motion.h2>
                          <div className="flex items-center gap-2">
                            <motion.span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                project.status === "Live"
                                  ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                                  : project.status === "Beta"
                                  ? "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
                                  : "bg-stone-100 text-stone-700 dark:bg-stone-700 dark:text-stone-300"
                              }`}
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 0.3,
                                delay: 0.4 + index * 0.2,
                              }}
                            >
                              {project.status}
                            </motion.span>
                            {project.featured && (
                              <motion.span
                                className="text-amber-500 dark:text-amber-400"
                                initial={{ rotate: -180, opacity: 0 }}
                                whileInView={{ rotate: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                  duration: 0.5,
                                  delay: 0.5 + index * 0.2,
                                }}
                              >
                                <Sparkles size={16} />
                              </motion.span>
                            )}
                          </div>
                        </div>
                        <motion.p
                          className="text-lg text-amber-600 dark:text-amber-400 mb-4"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.5,
                            delay: 0.3 + index * 0.2,
                          }}
                        >
                          {project.subtitle}
                        </motion.p>
                        <motion.div
                          className="flex items-center text-stone-500 dark:text-stone-400 text-sm mb-4"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.5,
                            delay: 0.4 + index * 0.2,
                          }}
                        >
                          <Calendar size={14} className="mr-1" />
                          {project.date ? formatDate(project.date) : "No date"}
                        </motion.div>
                        <motion.p
                          className="text-stone-600 dark:text-stone-300 leading-relaxed"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.5,
                            delay: 0.5 + index * 0.2,
                          }}
                        >
                          {project.description}
                        </motion.p>
                      </div>

                      {/* Problem & Approach */}
                      <div className="space-y-4">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.5,
                            delay: 0.6 + index * 0.2,
                          }}
                        >
                          <h4 className="font-medium text-stone-800 dark:text-stone-200 mb-2">
                            The Problem
                          </h4>
                          <p className="text-stone-600 dark:text-stone-300 text-sm">
                            {project.problem}
                          </p>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.5,
                            delay: 0.7 + index * 0.2,
                          }}
                        >
                          <h4 className="font-medium text-stone-800 dark:text-stone-200 mb-2">
                            My Approach
                          </h4>
                          <p className="text-stone-600 dark:text-stone-300 text-sm">
                            {project.approach}
                          </p>
                        </motion.div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIndex) => (
                          <motion.span
                            key={tagIndex}
                            className="px-3 py-1 bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-full text-xs"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.3,
                              delay: 0.8 + tagIndex * 0.1 + index * 0.2,
                            }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Learnings Section */}
                    <motion.div
                      className="space-y-6"
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.7 + index * 0.2 }}
                    >
                      <div className="bg-gradient-to-br from-amber-50 to-stone-50 dark:from-amber-900/10 dark:to-stone-800 p-6 rounded-2xl">
                        <h4 className="font-medium text-stone-800 dark:text-stone-200 mb-4">
                          What I Learned
                        </h4>
                        <div className="space-y-3">
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.4,
                              delay: 0.8 + index * 0.2,
                            }}
                          >
                            <p className="text-xs font-medium text-amber-700 dark:text-amber-400 uppercase tracking-wide mb-1">
                              Technical
                            </p>
                            <p className="text-stone-600 dark:text-stone-300 text-sm">
                              {project.learnings.technical}
                            </p>
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.4,
                              delay: 0.9 + index * 0.2,
                            }}
                          >
                            <p className="text-xs font-medium text-amber-700 dark:text-amber-400 uppercase tracking-wide mb-1">
                              Personal
                            </p>
                            <p className="text-stone-600 dark:text-stone-300 text-sm">
                              {project.learnings.personal}
                            </p>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* "Click me!" indicator */}
                  <motion.div
                    className="absolute bottom-3 right-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 0.3,
                      delay: 1 + index * 0.2,
                      x: {
                        repeat: Infinity,
                        duration: 1.5,
                      },
                    }}
                  >
                    <span className="text-xs italic text-stone-400 dark:text-stone-500 flex items-center">
                      Hover on and Click me!{" "}
                      <ArrowRight className="ml-1 w-3 h-3" />
                    </span>
                  </motion.div>
                </Card>
              </motion.div>
            ))
          )}
        </section>

        {/* View All Projects Button */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link href="/project-gallery">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                className="border-amber-300 dark:border-amber-600 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20"
              >
                View All Projects <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        {/* Call to Action */}
        <motion.section
          className="py-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="max-w-2xl mx-auto space-y-6">
            <motion.h2
              className="text-2xl font-light text-stone-800 dark:text-stone-100"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Interested in collaborating?
            </motion.h2>
            <motion.p
              className="text-stone-600 dark:text-stone-300"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              I'm always open to projects that blend technical excellence with
              meaningful impact.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="outline"
                className="border-amber-300 dark:border-amber-600 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 px-8 py-3 rounded-full"
              >
                Let's Connect
              </Button>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </main>
  );
};

export default Projects;
