"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { formatDate } from "@/lib/utils";
import { JournalFrontmatter } from "@/lib/mdx";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, Calendar, Tag, Hash } from "lucide-react";

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
        <div className="w-24 h-24 rounded-full border-4 border-stone-200 dark:border-stone-700 border-t-amber-400 dark:border-t-amber-600 animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles className="text-amber-500 dark:text-amber-400 animate-pulse" />
        </div>
      </div>
      <p className="mt-6 text-stone-600 dark:text-stone-300 animate-pulse">
        Loading reflections...
      </p>
    </div>
  );

  return (
    <main className="pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <section className="py-16 text-center">
          <h1 className="text-4xl lg:text-5xl font-light text-stone-800 dark:text-stone-100 mb-6">
            Growth Journal
          </h1>
          <p className="text-xl text-stone-600 dark:text-stone-300 leading-relaxed max-w-3xl mx-auto">
            Daily reflections on the intersection of code, craft, and character.
            Each entry is a small commit to continuous improvement.
          </p>
        </section>

        {/* Stats Dashboard */}
        <section className="py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 bg-white/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 text-center">
              <div className="text-2xl font-light text-amber-600 dark:text-amber-400">
                {stats.daysJournaled}
              </div>
              <div className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                Days Journaled
              </div>
            </Card>

            <Card className="p-4 bg-white/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 text-center">
              <div className="text-2xl font-light text-amber-600 dark:text-amber-400">
                {stats.totalEntries}
              </div>
              <div className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                Total Entries
              </div>
            </Card>

            <Card className="p-4 bg-white/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 text-center">
              <div className="text-2xl font-light text-amber-600 dark:text-amber-400">
                {stats.currentStreak}
              </div>
              <div className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                Current Streak
              </div>
            </Card>

            <Card className="p-4 bg-white/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 text-center">
              <div className="text-2xl font-light text-amber-600 dark:text-amber-400">
                {stats.averageWordsPerEntry}
              </div>
              <div className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                Avg Words
              </div>
            </Card>
          </div>
        </section>

        {/* Knowledge Graph & Search */}
        <section className="py-12">
          <Card className="p-8 bg-white/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700">
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-medium text-stone-800 dark:text-stone-200">
                Explore My Knowledge Graph
              </h2>
              <p className="text-stone-600 dark:text-stone-300 max-w-2xl mx-auto">
                Discover connections between ideas through hashtags and
                wiki-style links. Navigate my personal knowledge garden to see
                how concepts evolve over time.
              </p>

              <div className="flex justify-center">
                <Button
                  onClick={() => router.push("/journal-explorer")}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full flex items-center gap-2"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
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
                  </svg>
                  View Knowledge Graph
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
                <Link href="/tags/mindfulness">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full flex items-center gap-1"
                  >
                    <Tag size={12} />
                    mindfulness
                  </Button>
                </Link>
                <Link href="/tags/work-life-balance">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full flex items-center gap-1"
                  >
                    <Tag size={12} />
                    work-life-balance
                  </Button>
                </Link>
                <Link href="/tags/productivity">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full flex items-center gap-1"
                  >
                    <Tag size={12} />
                    productivity
                  </Button>
                </Link>
                <Link href="/tags/coding">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full flex items-center gap-1"
                  >
                    <Tag size={12} />
                    coding
                  </Button>
                </Link>
                <Link href="/tags/focus">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full flex items-center gap-1"
                  >
                    <Tag size={12} />
                    focus
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </section>

        {/* Journal Entries */}
        <section className="py-12 space-y-8">
          <h2 className="text-2xl font-medium text-stone-800 dark:text-stone-200 mb-6">
            Recent Entries
          </h2>

          {isLoading ? (
            <LoadingAnimation />
          ) : (
            journalEntries.map((entry, index) => (
              <Card
                key={index}
                className="p-6 bg-white/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => handleEntryClick(entry.slug)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{entry.mood}</span>
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

                  <div className="bg-gradient-to-r from-amber-50 to-stone-50 dark:from-amber-900/10 dark:to-stone-800 p-4 rounded-lg border-l-4 border-amber-400">
                    <h4 className="text-sm font-medium text-stone-800 dark:text-stone-200 mb-2">
                      Growth Moment
                    </h4>
                    <p className="text-stone-600 dark:text-stone-300 text-sm">
                      {entry.growth}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                {entry.tags && entry.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {entry.tags.map((tag, tagIndex) => (
                      <Link
                        href={`/tags/${tag}`}
                        key={tagIndex}
                        className="inline-flex items-center px-2 py-1 bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-full text-xs hover:bg-amber-100 dark:hover:bg-amber-900/30"
                      >
                        <Hash size={10} className="mr-1" />
                        {tag}
                      </Link>
                    ))}
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-stone-200 dark:border-stone-700">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-stone-600 hover:text-amber-600 dark:text-stone-400 dark:hover:text-amber-400 text-sm"
                  >
                    Read Full Entry →
                  </Button>
                </div>
              </Card>
            ))
          )}
        </section>

        {/* Journal Philosophy */}
        <section className="py-12">
          <Card className="p-8 bg-gradient-to-br from-amber-50 to-stone-50 dark:from-amber-900/10 dark:to-stone-800 border-amber-200 dark:border-stone-700">
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-medium text-stone-800 dark:text-stone-200">
                Why I Journal
              </h2>
              <div className="max-w-3xl mx-auto space-y-4 text-stone-600 dark:text-stone-300 leading-relaxed">
                <p>
                  Writing forces clarity. When I journal about a challenging bug
                  or a difficult conversation, I often discover solutions or
                  perspectives I hadn't considered. It's like pair programming
                  with my future self.
                </p>
                <p>
                  Each entry is timestamped and versioned, like commits in a
                  personal growth repository. Looking back, I can see patterns
                  in my thinking, track progress on goals, and celebrate small
                  wins that might otherwise be forgotten.
                </p>
              </div>
              <blockquote className="text-lg text-stone-700 dark:text-stone-300 italic">
                "The unexamined life is not worth living. The unexamined code is
                not worth committing."
              </blockquote>
            </div>
          </Card>
        </section>

        {/* Newsletter Signup */}
        <section className="py-12">
          <Card className="p-8 bg-white/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700">
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-medium text-stone-800 dark:text-stone-200">
                Tiny Refactors
              </h2>
              <p className="text-stone-600 dark:text-stone-300 max-w-2xl mx-auto">
                Weekly reflections on incremental improvement, mindful
                development practices, and the intersection of technical craft
                with personal growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2 rounded-full border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <Button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full whitespace-nowrap">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                One email per week. Unsubscribe anytime. No spam, just
                thoughtful reflection.
              </p>
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
};

export default Journal;
