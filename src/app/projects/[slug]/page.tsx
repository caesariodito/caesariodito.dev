import { getProjectSlugs, getProjectWithContent } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import MDXComponents from "@/components/MDXComponents";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Generate static params for all project slugs
export async function generateStaticParams() {
  const slugs = getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { frontmatter, content } = getProjectWithContent(slug);

  return (
    <main className="pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Navigation */}
        <div className="mb-8">
          <Link
            href="/projects"
            className="text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to all projects
          </Link>
        </div>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-light text-stone-800 dark:text-stone-100 mb-4">
            {frontmatter.title}
          </h1>
          <p className="text-xl text-amber-600 dark:text-amber-400 mb-6">
            {frontmatter.subtitle}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
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
        <div className="grid lg:grid-cols-10 gap-12">
          {/* Left column - Main content */}
          <div className="lg:col-span-7 space-y-8">
            {/* Featured Image */}
            <div className="rounded-xl overflow-hidden">
              <Image
                src={frontmatter.thumbnail}
                alt={frontmatter.title}
                width={1200}
                height={630}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Hooks section if available */}
            {frontmatter.hooks && frontmatter.hooks.length > 0 && (
              <div className="space-y-4 my-8">
                <h2 className="text-2xl font-light text-stone-800 dark:text-stone-100">
                  Key Insights
                </h2>
                <ul className="space-y-3">
                  {frontmatter.hooks.map((hook, index) => (
                    <li key={index} className="flex items-start">
                      <div className="text-amber-500 dark:text-amber-400 mr-3 mt-1">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                      <p className="text-stone-600 dark:text-stone-300">
                        {hook}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* MDX Content */}
            <article className="prose prose-stone dark:prose-invert max-w-none">
              <MDXRemote source={content} components={MDXComponents} />
            </article>
          </div>

          {/* Right column - What I Learned */}
          <div className="lg:col-span-3">
            <div className="sticky top-24 space-y-8">
              <div className="bg-gradient-to-br from-amber-50 to-stone-50 dark:from-amber-900/10 dark:to-stone-800 p-6 rounded-2xl">
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
                <div className="bg-stone-100 dark:bg-stone-800 p-6 rounded-2xl text-center">
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
        <section className="py-16 mt-12">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-amber-50/80 to-stone-50/80 dark:from-amber-900/10 dark:to-stone-800/30 rounded-2xl p-10 shadow-sm border border-amber-100 dark:border-amber-900/20">
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-light text-stone-800 dark:text-stone-100">
                Interested in collaborating?
              </h2>
              <div className="w-16 h-1 bg-amber-400 dark:bg-amber-600 mx-auto rounded-full"></div>
              <p className="text-stone-600 dark:text-stone-300 max-w-lg mx-auto">
                I'm always open to projects that blend technical excellence with
                meaningful impact. Let's create something mindful together.
              </p>
              <Link href="/contact" className="inline-block mt-4">
                <Button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-full">
                  Let's Connect
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
