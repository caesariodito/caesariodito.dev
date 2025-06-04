"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer } from "@/components/ui/motion";

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
            Philosophy
          </motion.h1>
          <motion.p
            className="text-xl text-stone-600 dark:text-stone-300 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            The principles that guide my approach to code, career, and
            continuous growth.
          </motion.p>
        </motion.section>

        {/* Core Principles */}
        <section className="py-12">
          <motion.h2
            className="text-3xl font-light text-stone-800 dark:text-stone-100 mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Core Principles
          </motion.h2>
          <StaggerContainer className="space-y-8" staggerDelay={0.15}>
            {principles.map((principle, index) => (
              <FadeIn key={index} direction="left">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="p-8 bg-white/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start space-x-6">
                      <motion.div
                        className="text-4xl"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.3 + index * 0.1,
                          duration: 0.4,
                          type: "spring",
                        }}
                      >
                        {principle.icon}
                      </motion.div>
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
                </motion.div>
              </FadeIn>
            ))}
          </StaggerContainer>
        </section>

        {/* Code Philosophy */}
        <section className="py-12">
          <motion.h2
            className="text-3xl font-light text-stone-800 dark:text-stone-100 mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Code Wisdom
          </motion.h2>
          <motion.div
            className="grid md:grid-cols-2 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {codeQuotes.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <Card className="p-6 bg-gradient-to-br from-amber-50 to-stone-50 dark:from-amber-900/10 dark:to-stone-800 border-amber-200 dark:border-stone-700 h-full">
                  <div className="space-y-3">
                    <blockquote className="text-lg font-medium text-stone-800 dark:text-stone-200 leading-relaxed">
                      "{item.quote}"
                    </blockquote>
                    <p className="text-sm text-stone-600 dark:text-stone-400 italic">
                      {item.context}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Daily Practice */}
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
              <h2 className="text-2xl font-medium text-stone-800 dark:text-stone-200 mb-6">
                Daily Practice
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <h3 className="text-lg font-medium text-stone-800 dark:text-stone-200 mb-4">
                    Morning Routine
                  </h3>
                  <ul className="space-y-2 text-stone-600 dark:text-stone-300">
                    <motion.li
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                    >
                      • 10 minutes of journaling
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                    >
                      • Review yesterday's learnings
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6, duration: 0.3 }}
                    >
                      • Set 3 intentions for the day
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7, duration: 0.3 }}
                    >
                      • Plan deep work blocks
                    </motion.li>
                  </ul>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <h3 className="text-lg font-medium text-stone-800 dark:text-stone-200 mb-4">
                    Evening Reflection
                  </h3>
                  <ul className="space-y-2 text-stone-600 dark:text-stone-300">
                    <motion.li
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6, duration: 0.3 }}
                    >
                      • What went well today?
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7, duration: 0.3 }}
                    >
                      • What could I improve?
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8, duration: 0.3 }}
                    >
                      • What did I learn?
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.9, duration: 0.3 }}
                    >
                      • Gratitude for growth moments
                    </motion.li>
                  </ul>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </motion.section>

        {/* Closing Thought */}
        <motion.section
          className="py-16 text-center"
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
              <motion.blockquote
                className="text-2xl font-light text-stone-800 dark:text-stone-200 leading-relaxed mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                "The code we write is a reflection of who we are. The person we
                become is shaped by how we write code."
              </motion.blockquote>
              <motion.p
                className="text-stone-600 dark:text-stone-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                — Personal reflection on the symbiotic relationship between
                craft and character
              </motion.p>
            </Card>
          </motion.div>
        </motion.section>
      </div>
    </main>
  );
};

export default Philosophy;
