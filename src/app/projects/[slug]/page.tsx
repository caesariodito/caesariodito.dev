import { getProjectSlugs, getProjectWithContent } from "@/lib/mdx";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Calendar, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import BackToTopButton from "@/components/BackToTopButton";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";

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

// Generate static params for all project slugs
export async function generateStaticParams() {
  const slugs = getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    const { frontmatter, content } = getProjectWithContent(slug);

    return (
      <main className="pt-16 md:pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Navigation */}
          <div className="mb-6 md:mb-8">
            <Link
              href="/projects"
              className="text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center py-4 px-1 border-b border-transparent hover:border-amber-400 dark:hover:border-amber-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to all projects
            </Link>
          </div>

          {/* Header */}
          <header className="mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-stone-800 dark:text-stone-100 mb-3 md:mb-4">
              {frontmatter.title}
            </h1>
            <p className="text-lg md:text-xl text-amber-600 dark:text-amber-400 mb-4 md:mb-6">
              {frontmatter.subtitle}
            </p>

            {/* Date and Featured */}
            <div className="flex items-center gap-4 mb-4">
              {frontmatter.date && (
                <div className="flex items-center text-stone-500 dark:text-stone-400">
                  <Calendar size={16} className="mr-1" />
                  <span>{formatDate(frontmatter.date)}</span>
                </div>
              )}
              {frontmatter.featured && (
                <div className="flex items-center text-amber-500 dark:text-amber-400">
                  <Star size={16} className="mr-1" />
                  <span>Featured Project</span>
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
              {frontmatter.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  frontmatter.status === "Live"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                    : frontmatter.status === "Beta"
                    ? "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
                    : "bg-stone-100 text-stone-700 dark:bg-stone-700 dark:text-stone-300"
                }`}
              >
                {frontmatter.status}
              </span>
            </div>
          </header>

          {/* Main content */}
          <div className="grid lg:grid-cols-12 gap-8 md:gap-12">
            {/* Left column - Main content */}
            <div className="lg:col-span-8 order-1 space-y-6 md:space-y-8">
              {/* Featured Image */}
              <div className="rounded-xl overflow-hidden">
                <Image
                  src={frontmatter.thumbnail}
                  alt={frontmatter.title}
                  width={1200}
                  height={630}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>

              {/* Hooks section if available */}
              {frontmatter.hooks && frontmatter.hooks.length > 0 && (
                <div className="space-y-4 my-6 md:my-8">
                  <h2 className="text-xl md:text-2xl font-light text-stone-800 dark:text-stone-100">
                    Key Insights
                  </h2>
                  <ul className="space-y-3">
                    {frontmatter.hooks.map((hook, index) => (
                      <li key={index} className="flex items-start">
                        <div className="text-amber-500 dark:text-amber-400 mr-3 mt-1 flex-shrink-0">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                        <p className="text-stone-600 dark:text-stone-300 text-sm md:text-base">
                          {hook}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* MDX Content */}
              <article className="prose prose-sm md:prose dark:prose-invert max-w-none overflow-hidden break-words">
                <MDXClientWrapper source={content} />
              </article>
            </div>

            {/* Right column - What I Learned */}
            <div className="lg:col-span-4 order-2">
              <div className="lg:sticky lg:top-24 space-y-6 md:space-y-8">
                <div className="bg-gradient-to-br from-amber-50 to-stone-50 dark:from-amber-900/10 dark:to-stone-800 p-4 md:p-6 rounded-2xl">
                  <h3 className="font-medium text-stone-800 dark:text-stone-200 mb-4">
                    What I Learned
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-medium text-amber-700 dark:text-amber-400 uppercase tracking-wide mb-1">
                        Technical
                      </p>
                      <p className="text-stone-600 dark:text-stone-300 text-sm">
                        {frontmatter.learnings.technical}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-amber-700 dark:text-amber-400 uppercase tracking-wide mb-1">
                        Personal
                      </p>
                      <p className="text-stone-600 dark:text-stone-300 text-sm">
                        {frontmatter.learnings.personal}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                {frontmatter.cta && (
                  <div className="bg-stone-100 dark:bg-stone-800 p-4 md:p-6 rounded-2xl text-center">
                    <h3 className="font-medium text-stone-800 dark:text-stone-200 mb-4">
                      Ready to explore?
                    </h3>
                    <Link href={frontmatter.cta.link}>
                      <Button className="bg-amber-500 hover:bg-amber-600 text-white w-full">
                        {frontmatter.cta.text}
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <section className="py-12 md:py-16 mt-8 md:mt-12">
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-amber-50/80 to-stone-50/80 dark:from-amber-900/10 dark:to-stone-800/30 rounded-2xl p-6 md:p-10 shadow-sm border border-amber-100 dark:border-amber-900/20">
              <div className="text-center space-y-4 md:space-y-6">
                <h2 className="text-xl md:text-2xl font-light text-stone-800 dark:text-stone-100">
                  Interested in collaborating?
                </h2>
                <div className="w-12 md:w-16 h-1 bg-amber-400 dark:bg-amber-600 mx-auto rounded-full"></div>
                <p className="text-stone-600 dark:text-stone-300 max-w-lg mx-auto text-sm md:text-base">
                  I'm always open to projects that blend technical excellence
                  with meaningful impact. Let's create something mindful
                  together.
                </p>
                <Link href="/contact" className="inline-block mt-2 md:mt-4">
                  <Button className="bg-amber-500 hover:bg-amber-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-full">
                    Let's Connect
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Back to Top Button */}
          <BackToTopButton />
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error loading project:", error);
    notFound();
  }
}
