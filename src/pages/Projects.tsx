
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "MindfulMerge",
      subtitle: "Habit Tracking with Reflection",
      description: "A habit tracking app that goes beyond streaks, incorporating daily reflection and growth mindset principles.",
      problem: "Most habit trackers focus on consistency without encouraging meaningful reflection on progress and setbacks.",
      approach: "Built a React Native app with thoughtful UX that prompts users to reflect on their daily habits and learn from both successes and failures.",
      learnings: {
        technical: "Learned offline-first architecture and smooth animations",
        personal: "Discovered the power of building tools for my own growth"
      },
      tags: ["React Native", "SQLite", "Code/Soul", "Structure/Flow"],
      status: "Live"
    },
    {
      title: "Zen Code Reviews",
      subtitle: "Compassionate Developer Feedback",
      description: "A browser extension that helps developers give and receive more thoughtful, constructive code reviews.",
      problem: "Code reviews often become sources of stress rather than learning opportunities due to harsh or unclear feedback.",
      approach: "Created a Chrome extension with AI-powered suggestions for more empathetic, specific feedback and templates for common review scenarios.",
      learnings: {
        technical: "Deep dive into browser extension APIs and natural language processing",
        personal: "Learned that changing how we communicate changes how we think"
      },
      tags: ["Chrome Extension", "NLP", "Back/Front", "Code/Soul"],
      status: "Beta"
    },
    {
      title: "Journal.dev",
      subtitle: "Developer-Focused Reflection Tool",
      description: "A minimalist journaling platform designed specifically for developers to track technical and personal growth.",
      problem: "Generic journaling apps don't understand the unique challenges and growth patterns of software development.",
      approach: "Built a clean, markdown-based journaling platform with features like commit linking, bug reflection templates, and learning goal tracking.",
      learnings: {
        technical: "Explored real-time collaboration and markdown parsing optimization",
        personal: "Writing code for reflection made me more reflective about my code"
      },
      tags: ["Next.js", "Supabase", "Structure/Flow", "Code/Soul"],
      status: "Planning"
    }
  ];

  return (
    <main className="pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <section className="py-16 text-center">
          <h1 className="text-4xl lg:text-5xl font-light text-stone-800 dark:text-stone-100 mb-6">
            Mindful Builds
          </h1>
          <p className="text-xl text-stone-600 dark:text-stone-300 leading-relaxed max-w-3xl mx-auto">
            Each project is a conversation between technical craft and personal growth, 
            built with intention and reflection.
          </p>
        </section>

        {/* Projects Grid */}
        <section className="space-y-16">
          {projects.map((project, index) => (
            <Card key={index} className="p-8 bg-white/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-300">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Project Info */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-2xl font-medium text-stone-800 dark:text-stone-200">
                        {project.title}
                      </h2>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === 'Live' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                          : project.status === 'Beta'
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400'
                          : 'bg-stone-100 text-stone-700 dark:bg-stone-700 dark:text-stone-300'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-lg text-amber-600 dark:text-amber-400 mb-4">
                      {project.subtitle}
                    </p>
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

                {/* Learnings */}
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

                  <Button className="w-full bg-stone-800 hover:bg-stone-900 dark:bg-stone-200 dark:hover:bg-stone-100 dark:text-stone-800 text-white transition-all duration-300">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </section>

        {/* Call to Action */}
        <section className="py-16 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-light text-stone-800 dark:text-stone-100">
              Interested in collaborating?
            </h2>
            <p className="text-stone-600 dark:text-stone-300">
              I'm always open to projects that blend technical excellence with meaningful impact.
            </p>
            <Button variant="outline" className="border-amber-300 dark:border-amber-600 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 px-8 py-3 rounded-full">
              Let's Connect
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Projects;
