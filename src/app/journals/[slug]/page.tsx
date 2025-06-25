import { getJournalWithContent, getJournalSlugs } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

interface JournalPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getJournalSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: JournalPageProps): Promise<Metadata> {
  try {
    const { frontmatter } = getJournalWithContent(params.slug);
    return {
      title: `${frontmatter.title} | Growth Journal`,
      description: frontmatter.excerpt,
    };
  } catch (error) {
    return {
      title: "Journal Entry Not Found",
      description: "The requested journal entry could not be found.",
    };
  }
}

// Dynamically import MDXClientWrapper with SSR disabled
const MDXClientWrapper = dynamic(
  () => import("@/components/MDXClientWrapper"),
  {
    ssr: false,
    loading: () => (
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-stone-200 dark:bg-stone-700 rounded w-3/4"></div>
        <div className="h-4 bg-stone-200 dark:bg-stone-700 rounded w-1/2"></div>
        <div className="h-4 bg-stone-200 dark:bg-stone-700 rounded w-5/6"></div>
      </div>
    ),
  }
);

export default function JournalPage({ params }: JournalPageProps) {
  try {
    const { frontmatter, content } = getJournalWithContent(params.slug);

    return (
      <main className="pt-16 md:pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Navigation */}
          <div className="mb-6 md:mb-8">
            <Link
              href="/journal"
              className="text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center py-4 px-1 border-b border-transparent hover:border-amber-400 dark:hover:border-amber-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Journal
            </Link>
          </div>

          {/* Header */}
          <header className="mb-8 md:mb-12">
            <div className="flex items-start space-x-3 mb-3 md:mb-4">
              <span className="text-5xl md:text-6xl">{frontmatter.mood}</span>
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-stone-800 dark:text-stone-100">
                  {frontmatter.title}
                </h1>
                {frontmatter.excerpt && (
                  <p className="text-lg md:text-xl text-amber-600 dark:text-amber-400 mt-1 md:mt-2">
                    {frontmatter.excerpt}
                  </p>
                )}
              </div>
            </div>

            {/* Date and Category */}
            <div className="flex items-center gap-4 mb-4 md:mb-6 text-sm text-stone-500 dark:text-stone-400">
              {frontmatter.date && (
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1.5" />
                  <span>{formatDate(frontmatter.date)}</span>
                </div>
              )}
              {frontmatter.category && (
                <>
                  <span>•</span>
                  <span className="text-amber-600 dark:text-amber-400 font-medium">
                    {frontmatter.category}
                  </span>
                </>
              )}
            </div>

            {/* Tags */}
            {frontmatter.tags && frontmatter.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                {frontmatter.tags.map((tag, tagIndex) => (
                  <Link
                    href={`/tags/${tag}`}
                    key={tagIndex}
                    className="px-3 py-1 bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-full text-xs hover:bg-amber-100 dark:hover:bg-amber-800 transition-colors inline-flex items-center"
                  >
                    <Hash size={12} className="mr-1" />
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </header>

          {/* Growth Moment Highlight (Keeping this unique to journals but styling consistently) */}
          {frontmatter.growth && (
            <div className="bg-gradient-to-r from-amber-50 to-stone-50 dark:from-amber-900/10 dark:to-stone-800 p-4 md:p-6 rounded-xl border-l-4 border-amber-400 mb-8 md:mb-12">
              <h2 className="text-base md:text-lg font-medium text-stone-800 dark:text-stone-200 mb-2">
                Growth Moment
              </h2>
              <p className="text-stone-600 dark:text-stone-300 text-sm md:text-base">
                {frontmatter.growth}
              </p>
            </div>
          )}

          {/* Journal Content area - prose styles might need to be adjusted for new container width */}
          <article className="prose prose-stone dark:prose-invert md:prose-lg lg:prose-xl prose-headings:font-light prose-headings:text-stone-800 dark:prose-headings:text-stone-100 prose-a:text-amber-600 dark:prose-a:text-amber-400 prose-code:bg-stone-100 dark:prose-code:bg-stone-800 prose-code:p-0.5 prose-code:rounded prose-code:text-sm max-w-none mx-auto">
            <MDXClientWrapper
              source={content}
              processContentBeforeRendering={true}
            />
          </article>

          {/* Navigation between entries (keep this unique feature) */}
          <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-stone-200 dark:border-stone-700 flex justify-between">
            <Button variant="outline" size="sm">
              ← Previous Entry
            </Button>
            <Button variant="outline" size="sm">
              Next Entry →
            </Button>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error loading journal entry:", error);
    notFound();
  }
}
