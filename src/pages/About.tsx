"use client";

import { Card } from "@/components/ui/card";

const About = () => {
  const timeline = [
    {
      year: "2018",
      title: "The Beginning",
      description:
        "Started my journey in computer science, drawn to the logical beauty of code.",
      reflection: "Every problem had a solution waiting to be discovered.",
    },
    {
      year: "2020",
      title: "First Burnout",
      description:
        "Learned the hard way that grinding 16-hour days wasn't sustainable.",
      reflection: "This was my first lesson in the importance of balance.",
    },
    {
      year: "2021",
      title: "Discovery of Mindfulness",
      description:
        "Started journaling and meditation practices. Everything changed.",
      reflection: "Code became meditation. Debugging became self-reflection.",
    },
    {
      year: "2023",
      title: "The 1% Philosophy",
      description:
        "Embraced atomic habits and daily improvement over dramatic changes.",
      reflection: "Small commits, big transformations.",
    },
    {
      year: "2024",
      title: "Present Moment",
      description:
        "Building software with intention, growing through reflection.",
      reflection: "Every day is a chance to merge wisdom with code.",
    },
  ];

  return (
    <main className="pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <section className="py-16 text-center">
          <h1 className="text-4xl lg:text-5xl font-light text-stone-800 dark:text-stone-100 mb-6">
            The Journey
          </h1>
          <p className="text-xl text-stone-600 dark:text-stone-300 leading-relaxed max-w-3xl mx-auto">
            A story of technical growth intertwined with personal discovery,
            where engineering discipline meets mindful philosophy.
          </p>
        </section>

        {/* Personal Philosophy */}
        <section className="py-12">
          <Card className="p-8 bg-gradient-to-br from-amber-50 to-stone-50 dark:from-amber-900/10 dark:to-stone-800 border-amber-200 dark:border-stone-700">
            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-stone-800 dark:text-stone-200">
                Beyond the Code
              </h2>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                I believe that the best software comes from developers who
                understand themselves. My daily practice includes morning
                journaling, where I reflect on yesterday's learnings and set
                intentions for today's work. This isn't just self-help—it's a
                systematic approach to continuous improvement that applies to
                both personal growth and code quality.
              </p>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                Every commit I make is intentional. Every feature I build serves
                a purpose. Every bug I fix teaches me something new—not just
                about the codebase, but about patience, problem-solving, and the
                importance of approaching challenges with a calm mind.
              </p>
            </div>
          </Card>
        </section>

        {/* Timeline */}
        <section className="py-12">
          <h2 className="text-3xl font-light text-stone-800 dark:text-stone-100 mb-12 text-center">
            Evolution Timeline
          </h2>
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="relative">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0 w-20 text-right">
                    <span className="text-sm font-mono text-amber-600 dark:text-amber-400">
                      {item.year}
                    </span>
                  </div>
                  <div className="flex-shrink-0 w-3 h-3 bg-amber-400 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <Card className="p-6 bg-white/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700">
                      <h3 className="text-lg font-medium text-stone-800 dark:text-stone-200 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-stone-600 dark:text-stone-300 mb-3">
                        {item.description}
                      </p>
                      <p className="text-sm text-amber-700 dark:text-amber-400 italic">
                        {item.reflection}
                      </p>
                    </Card>
                  </div>
                </div>
                {index < timeline.length - 1 && (
                  <div className="absolute left-28 top-8 w-0.5 h-16 bg-stone-200 dark:bg-stone-700"></div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Current Focus */}
        <section className="py-12">
          <Card className="p-8 bg-white/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700">
            <h2 className="text-2xl font-medium text-stone-800 dark:text-stone-200 mb-6">
              Current Focus
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-stone-800 dark:text-stone-200 mb-3">
                  Technical Growth
                </h3>
                <ul className="space-y-2 text-stone-600 dark:text-stone-300">
                  <li>• Exploring functional programming paradigms</li>
                  <li>• Building accessible, performant web applications</li>
                  <li>• Contributing to open source projects mindfully</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-stone-800 dark:text-stone-200 mb-3">
                  Personal Development
                </h3>
                <ul className="space-y-2 text-stone-600 dark:text-stone-300">
                  <li>• Daily journaling and reflection practice</li>
                  <li>• Teaching and mentoring other developers</li>
                  <li>• Balancing productivity with mindful rest</li>
                </ul>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
};

export default About;
