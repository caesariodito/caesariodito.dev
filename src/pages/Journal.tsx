"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { formatDate } from "@/lib/utils";
import { JournalFrontmatter } from "@/lib/mdx";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, Calendar, Tag, Hash } from "lucide-react";
import { motion } from "framer-motion";
import { FadeIn, AnimatedButton } from "@/components/ui/motion";

interface JournalStats {
  daysJournaled: number;
  totalEntries: number;
  currentStreak: number;
  averageWordsPerEntry: number;
}

const Journal = () => {
  const [journalEntries, setJournalEntries] = useState<JournalFrontmatter[]>(
    []
  );
  const [stats, setStats] = useState<JournalStats>({
    daysJournaled: 0,
    totalEntries: 0,
    currentStreak: 0,
    averageWordsPerEntry: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Fetch journal entries and stats
  useEffect(() => {
    setIsLoading(true);
    fetch("/api/journals?stats=true&limit=3")
      .then((res) => res.json())
      .then((data) => {
        setJournalEntries(data.journals);
        setStats(data.stats);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error loading journals:", err);
        setIsLoading(false);
      });
  }, []);

  const handleEntryClick = (slug: string) => {
    router.push(`/journals/${slug}`);
  };

  // Loading animation component
  const LoadingAnimation = () => (
    <div className="min-h-[40vh] flex flex-col items-center justify-center">
      <div className="relative">
        <motion.div
          className="w-24 h-24 rounded-full border-4 border-stone-200 dark:border-stone-700 border-t-amber-400 dark:border-t-amber-600"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        ></motion.div>
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="text-amber-500 dark:text-amber-400" />
        </motion.div>
      </div>
      <motion.p
        className="mt-6 text-stone-600 dark:text-stone-300"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        Loading reflections...
      </motion.p>
    </div>
  );

  return (
    <main className="pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-6">
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
            Growth Journal
          </motion.h1>
          <motion.p
            className="text-xl text-stone-600 dark:text-stone-300 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Daily reflections on the intersection of code, craft, and character.
            Each entry is a small commit to continuous improvement.
          </motion.p>
        </motion.section>

        {/* Stats Dashboard */}
        <motion.section
          className="py-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: stats.daysJournaled, label: "Days Journaled" },
              { value: stats.totalEntries, label: "Total Entries" },
              { value: stats.currentStreak, label: "Current Streak" },
              { value: stats.averageWordsPerEntry, label: "Avg Words" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, scale: 1.03 }}
              >
                <Card className="p-4 bg-white/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 text-center">
                  <motion.div
                    className="text-2xl font-light text-amber-600 dark:text-amber-400"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.9 + index * 0.1,
                      duration: 0.5,
                      type: "spring",
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                    {stat.label}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Knowledge Graph & Search */}
        <motion.section
          className="py-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="p-8 bg-white/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700">
              <div className="text-center space-y-6">
                <motion.h2
                  className="text-2xl font-medium text-stone-800 dark:text-stone-200"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  Explore My Knowledge Graph
                </motion.h2>
                <motion.p
                  className="text-stone-600 dark:text-stone-300 max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  Discover connections between ideas through hashtags and
                  wiki-style links. Navigate my personal knowledge garden to see
                  how concepts evolve over time.
                </motion.p>

                <motion.div
                  className="flex justify-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <AnimatedButton>
                    <Button
                      onClick={() => router.push("/journal-explorer")}
                      className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full flex items-center gap-2"
                    >
                      <motion.svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        animate={{
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      >
                        <circle cx="4" cy="4" r="2.5" fill="currentColor" />
                        <circle cx="12" cy="12" r="2.5" fill="currentColor" />
                        <circle cx="20" cy="4" r="2.5" fill="currentColor" />
                        <circle cx="4" cy="20" r="2.5" fill="currentColor" />
                        <circle cx="20" cy="20" r="2.5" fill="currentColor" />
                        <line
                          x1="4"
                          y1="4"
                          x2="12"
                          y2="12"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <line
                          x1="12"
                          y1="12"
                          x2="20"
                          y2="4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <line
                          x1="4"
                          y1="20"
                          x2="12"
                          y2="12"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <line
                          x1="12"
                          y1="12"
                          x2="20"
                          y2="20"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </motion.svg>
                      View Knowledge Graph
                    </Button>
                  </AnimatedButton>
                </motion.div>

                <motion.div
                  className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {["blog", "thoughts", "journey"].map((tag, index) => (
                    <motion.div
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link href={`/tags/${tag}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full flex items-center gap-1"
                        >
                          <Tag size={12} />
                          {tag}
                        </Button>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </motion.section>

        {/* Journal Entries */}
        <section className="py-12 space-y-8">
          <motion.h2
            className="text-2xl font-medium text-stone-800 dark:text-stone-200 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Recent Entries
          </motion.h2>

          {isLoading ? (
            <LoadingAnimation />
          ) : (
            journalEntries.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <motion.div
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card
                    className="p-6 bg-white/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onClick={() => handleEntryClick(entry.slug)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <motion.span
                          className="text-2xl"
                          whileHover={{ scale: 1.3, rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          {entry.mood}
                        </motion.span>
                        <div>
                          <h3 className="text-lg font-medium text-stone-800 dark:text-stone-200">
                            {entry.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-stone-600 dark:text-stone-400">
                            <span className="flex items-center">
                              <Calendar size={14} className="mr-1" />
                              {formatDate(entry.date)}
                            </span>
                            <span>•</span>
                            <span className="text-amber-600 dark:text-amber-400">
                              {entry.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                        {entry.excerpt}
                      </p>

                      <motion.div
                        className="bg-gradient-to-r from-amber-50 to-stone-50 dark:from-amber-900/10 dark:to-stone-800 p-4 rounded-lg border-l-4 border-amber-400"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <h4 className="text-sm font-medium text-stone-800 dark:text-stone-200 mb-2">
                          Growth Moment
                        </h4>
                        <p className="text-stone-600 dark:text-stone-300 text-sm">
                          {entry.growth}
                        </p>
                      </motion.div>
                    </div>

                    {/* Tags */}
                    {entry.tags && entry.tags.length > 0 && (
                      <motion.div
                        className="mt-4 flex flex-wrap gap-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        {entry.tags.map((tag, tagIndex) => (
                          <motion.div
                            key={tagIndex}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Link
                              href={`/tags/${tag}`}
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center px-2 py-1 bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-full text-xs hover:bg-amber-100 dark:hover:bg-amber-900/30"
                            >
                              <Hash size={10} className="mr-1" />
                              {tag}
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}

                    <motion.div
                      className="mt-4 pt-4 border-t border-stone-200 dark:border-stone-700"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-stone-600 hover:text-amber-600 dark:text-stone-400 dark:hover:text-amber-400 text-sm"
                      >
                        Read Full Entry →
                      </Button>
                    </motion.div>
                  </Card>
                </motion.div>
              </motion.div>
            ))
          )}
        </section>

        {/* Journal Philosophy */}
        <motion.section
          className="py-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            whileHover={{
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-8 bg-gradient-to-br from-amber-50 to-stone-50 dark:from-amber-900/10 dark:to-stone-800 border-amber-200 dark:border-stone-700">
              <div className="text-center space-y-6">
                <motion.h2
                  className="text-2xl font-medium text-stone-800 dark:text-stone-200"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  Why I Journal
                </motion.h2>
                <motion.div
                  className="max-w-3xl mx-auto space-y-4 text-stone-600 dark:text-stone-300 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <p>
                    Writing forces clarity. When I journal about a challenging
                    bug or a difficult conversation, I often discover solutions
                    or perspectives I hadn't considered. It's like pair
                    programming with my future self.
                  </p>
                  <p>
                    Each entry is timestamped and versioned, like commits in a
                    personal growth repository. Looking back, I can see patterns
                    in my thinking, track progress on goals, and celebrate small
                    wins that might otherwise be forgotten.
                  </p>
                </motion.div>
                <motion.blockquote
                  className="text-lg text-stone-700 dark:text-stone-300 italic"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  "The unexamined life is not worth living. The unexamined code
                  is not worth committing."
                </motion.blockquote>
              </div>
            </Card>
          </motion.div>
        </motion.section>

        {/* Newsletter Signup */}
        <motion.section
          className="py-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="p-8 bg-white/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700">
              <div className="text-center space-y-6">
                <motion.h2
                  className="text-2xl font-medium text-stone-800 dark:text-stone-200"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  Tiny Refactors
                </motion.h2>
                <motion.p
                  className="text-stone-600 dark:text-stone-300 max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  Weekly reflections on incremental improvement, mindful
                  development practices, and the intersection of technical craft
                  with personal growth.
                </motion.p>
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <motion.input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-2 rounded-full border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    whileFocus={{
                      scale: 1.02,
                      boxShadow: "0 0 0 2px rgba(251, 191, 36, 0.4)",
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  <AnimatedButton>
                    <Button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full whitespace-nowrap">
                      Subscribe
                    </Button>
                  </AnimatedButton>
                </motion.div>
                <motion.p
                  className="text-xs text-stone-500 dark:text-stone-400"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  One email per week. Unsubscribe anytime. No spam, just
                  thoughtful reflection.
                </motion.p>
              </div>
            </Card>
          </motion.div>
        </motion.section>
      </div>
    </main>
  );
};

export default Journal;
