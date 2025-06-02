"use client";

import { Card } from "@/components/ui/card";

const Philosophy = () => {
  const principles = [
    {
      title: "Balance over Hustle",
      icon: "⚖️",
      description: "Sustainable growth comes from harmony, not burnout.",
      details:
        "The industry often glorifies the 'grind,' but I've learned that sustainable progress comes from working in harmony with your natural rhythms. I prioritize deep work sessions followed by restorative breaks, meaningful weekends, and saying no to opportunities that don't align with my values.",
    },
    {
      title: "Reflection over Reactivity",
      icon: "🪞",
      description: "Pause, process, then proceed with purpose.",
      details:
        "In both code and life, my first instinct isn't always my best response. Daily journaling helps me process challenges, celebrate wins, and approach problems with curiosity rather than frustration. This practice has made me a better debugger and a more thoughtful team member.",
    },
    {
      title: "Progress over Perfection",
      icon: "🌱",
      description: "1% better daily compounds into extraordinary growth.",
      details:
        "Perfect code doesn't exist, but better code does. I focus on atomic improvements—cleaner functions, better naming, more thoughtful architecture. Small, consistent improvements in both my technical skills and personal habits create lasting transformation.",
    },
    {
      title: "Connection over Competition",
      icon: "🤝",
      description: "We rise by lifting others in our community.",
      details:
        "The tech industry can feel competitive, but I've found more fulfillment in collaboration. Mentoring junior developers, contributing to open source, and sharing knowledge openly has enriched my own learning journey while building meaningful professional relationships.",
    },
  ];

  const codeQuotes = [
    {
      quote: "Every commit is a conversation with your future self",
      context: "On writing meaningful commit messages and maintainable code",
    },
    {
      quote: "Bugs are teachers in disguise",
      context: "Finding growth opportunities in debugging challenges",
    },
    {
      quote: "The best refactor is the one that makes tomorrow's work easier",
      context: "Thinking beyond immediate needs when improving code",
    },
    {
      quote: "Code review is care review",
      context: "Approaching feedback with empathy and growth mindset",
    },
  ];

  return (
    <main className="pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <section className="py-16 text-center">
          <h1 className="text-4xl lg:text-5xl font-light text-stone-800 dark:text-stone-100 mb-6">
            Philosophy
          </h1>
          <p className="text-xl text-stone-600 dark:text-stone-300 leading-relaxed max-w-3xl mx-auto">
            The principles that guide my approach to code, career, and
            continuous growth.
          </p>
        </section>

        {/* Core Principles */}
        <section className="py-12">
          <h2 className="text-3xl font-light text-stone-800 dark:text-stone-100 mb-12 text-center">
            Core Principles
          </h2>
          <div className="space-y-8">
            {principles.map((principle, index) => (
              <Card
                key={index}
                className="p-8 bg-white/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start space-x-6">
                  <div className="text-4xl">{principle.icon}</div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-2xl font-medium text-stone-800 dark:text-stone-200 mb-2">
                        {principle.title}
                      </h3>
                      <p className="text-lg text-amber-600 dark:text-amber-400 mb-4">
                        {principle.description}
                      </p>
                    </div>
                    <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                      {principle.details}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Code Philosophy */}
        <section className="py-12">
          <h2 className="text-3xl font-light text-stone-800 dark:text-stone-100 mb-12 text-center">
            Code Wisdom
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {codeQuotes.map((item, index) => (
              <Card
                key={index}
                className="p-6 bg-gradient-to-br from-amber-50 to-stone-50 dark:from-amber-900/10 dark:to-stone-800 border-amber-200 dark:border-stone-700"
              >
                <div className="space-y-3">
                  <blockquote className="text-lg font-medium text-stone-800 dark:text-stone-200 leading-relaxed">
                    "{item.quote}"
                  </blockquote>
                  <p className="text-sm text-stone-600 dark:text-stone-400 italic">
                    {item.context}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Daily Practice */}
        <section className="py-12">
          <Card className="p-8 bg-white/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700">
            <h2 className="text-2xl font-medium text-stone-800 dark:text-stone-200 mb-6">
              Daily Practice
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-stone-800 dark:text-stone-200 mb-4">
                  Morning Routine
                </h3>
                <ul className="space-y-2 text-stone-600 dark:text-stone-300">
                  <li>• 10 minutes of journaling</li>
                  <li>• Review yesterday's learnings</li>
                  <li>• Set 3 intentions for the day</li>
                  <li>• Plan deep work blocks</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-stone-800 dark:text-stone-200 mb-4">
                  Evening Reflection
                </h3>
                <ul className="space-y-2 text-stone-600 dark:text-stone-300">
                  <li>• What went well today?</li>
                  <li>• What could I improve?</li>
                  <li>• What did I learn?</li>
                  <li>• Gratitude for growth moments</li>
                </ul>
              </div>
            </div>
          </Card>
        </section>

        {/* Closing Thought */}
        <section className="py-16 text-center">
          <Card className="p-8 bg-gradient-to-br from-amber-50 to-stone-50 dark:from-amber-900/10 dark:to-stone-800 border-amber-200 dark:border-stone-700">
            <blockquote className="text-2xl font-light text-stone-800 dark:text-stone-200 leading-relaxed mb-4">
              "The code we write is a reflection of who we are. The person we
              become is shaped by how we write code."
            </blockquote>
            <p className="text-stone-600 dark:text-stone-400">
              — Personal reflection on the symbiotic relationship between craft
              and character
            </p>
          </Card>
        </section>
      </div>
    </main>
  );
};

export default Philosophy;
