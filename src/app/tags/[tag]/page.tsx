import { getAllJournals } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";
import { Calendar, ArrowLeft, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface TagPageProps {
  params: {
    tag: string;
  };
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  return {
    title: `#${params.tag} | Growth Journal`,
    description: `Journal entries tagged with #${params.tag}`,
  };
}

export default function TagPage({ params }: TagPageProps) {
  const { tag } = params;
  const allJournals = getAllJournals();

  // Filter journals that have this tag
  const journalsWithTag = allJournals.filter(
    (journal) => journal.tags && journal.tags.includes(tag)
  );

  return (
    <main className="pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12">
          <Link href="/journal">
            <Button
              variant="ghost"
              size="sm"
              className="mb-4 -ml-2 text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400"
            >
              <ArrowLeft size={16} className="mr-1" /> Back to Journal
            </Button>
          </Link>

          <h1 className="text-3xl font-medium text-stone-800 dark:text-stone-100 flex items-center mb-4">
            <Hash className="mr-2 text-amber-500" /> {tag}
          </h1>

          <p className="text-xl text-stone-600 dark:text-stone-300 leading-relaxed">
            {journalsWithTag.length}{" "}
            {journalsWithTag.length === 1 ? "entry" : "entries"} tagged with #
            {tag}
          </p>
        </div>

        {/* Journal Entries with this tag */}
        <section className="space-y-8">
          {journalsWithTag.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-stone-600 dark:text-stone-400">
                No journal entries found with this tag.
              </p>
            </div>
          ) : (
            journalsWithTag.map((entry, index) => (
              <Card
                key={index}
                className="p-6 bg-white/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{entry.mood}</span>
                    <div>
                      <Link href={`/journals/${entry.slug}`} className="block">
                        <h3 className="text-lg font-medium text-stone-800 dark:text-stone-200 hover:text-amber-600 dark:hover:text-amber-400">
                          {entry.title}
                        </h3>
                      </Link>
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
                  <Link href={`/journals/${entry.slug}`} className="block">
                    <p className="text-stone-600 dark:text-stone-300 leading-relaxed hover:text-stone-800 dark:hover:text-stone-100">
                      {entry.excerpt}
                    </p>
                  </Link>
                </div>

                {/* Other tags */}
                {entry.tags && entry.tags.length > 1 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {entry.tags
                      .filter((t) => t !== tag)
                      .map((otherTag, tagIndex) => (
                        <Link
                          href={`/tags/${otherTag}`}
                          key={tagIndex}
                          className="inline-flex items-center px-2 py-1 bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-full text-xs hover:bg-amber-100 dark:hover:bg-amber-900/30"
                        >
                          <Hash size={10} className="mr-1" />
                          {otherTag}
                        </Link>
                      ))}
                  </div>
                )}
              </Card>
            ))
          )}
        </section>

        {/* Related Tags */}
        <section className="mt-16 pt-8 border-t border-stone-200 dark:border-stone-700">
          <h2 className="text-xl font-medium text-stone-800 dark:text-stone-200 mb-4">
            Related Tags
          </h2>

          <div className="flex flex-wrap gap-2">
            {Array.from(
              new Set(
                journalsWithTag.flatMap((journal) =>
                  journal.tags.filter((t) => t !== tag)
                )
              )
            ).map((relatedTag, index) => (
              <Link href={`/tags/${relatedTag}`} key={index}>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full flex items-center gap-1"
                >
                  <Hash size={12} />
                  {relatedTag}
                </Button>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
