"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer } from "@/components/ui/motion";

const Tools = () => {
  const toolCategories = [
    {
      category: "Frontend Craft",
      description: "Building beautiful, accessible user experiences",
      tools: [
        {
          name: "React",
          purpose:
            "Component-based thinking mirrors how I approach life problems",
          reflection:
            "Breaking complex challenges into smaller, manageable pieces",
          philosophy: "State management teaches patience with change",
        },
        {
          name: "TypeScript",
          purpose: "Clarity in intention, safety in execution",
          reflection: "Types force me to think deeply about data relationships",
          philosophy:
            "Structure enables creativity, constraints spark innovation",
        },
        {
          name: "Tailwind CSS",
          purpose: "Utility-first approach to styling and consistency",
          reflection: "Small, composable classes mirror atomic habits",
          philosophy: "Systematic design systems create coherent experiences",
        },
      ],
    },
    {
      category: "Backend Foundation",
      description: "Reliable, scalable systems that serve people",
      tools: [
        {
          name: "Node.js",
          purpose: "Event-driven architecture for responsive applications",
          reflection: "Asynchronous thinking applies to work-life balance",
          philosophy: "Non-blocking operations remind me to stay present",
        },
        {
          name: "PostgreSQL",
          purpose: "Relational thinking and data integrity",
          reflection:
            "Database design teaches me about relationships and constraints",
          philosophy: "ACID properties mirror personal values of reliability",
        },
        {
          name: "Docker",
          purpose: "Consistent environments and reproducible builds",
          reflection: "Containerization parallels setting healthy boundaries",
          philosophy: "Isolation enables both security and clarity",
        },
      ],
    },
    {
      category: "Development Flow",
      description: "Tools that enhance focus and mindful coding",
      tools: [
        {
          name: "VS Code",
          purpose: "Customizable workspace that adapts to my thinking style",
          reflection: "Extensions mirror how I build supportive habits",
          philosophy: "The right environment amplifies natural capabilities",
        },
        {
          name: "Git",
          purpose: "Version control as a philosophy of iterative improvement",
          reflection: "Commits are like journal entries for code",
          philosophy:
            "History teaches, branches explore, merges integrate wisdom",
        },
        {
          name: "Linear",
          purpose: "Issue tracking that feels thoughtful, not overwhelming",
          reflection: "Organized workflows reduce mental clutter",
          philosophy:
            "Good tools disappear, leaving only the work that matters",
        },
      ],
    },
    {
      category: "Mindful Productivity",
      description: "Tools that support reflection and intentional growth",
      tools: [
        {
          name: "Obsidian",
          purpose: "Connected thinking and knowledge management",
          reflection:
            "Links between ideas mirror how learning actually happens",
          philosophy: "External mind-mapping enables internal clarity",
        },
        {
          name: "Day One",
          purpose: "Daily journaling and reflection practice",
          reflection: "Writing clarifies thinking, documents growth",
          philosophy: "The unexamined code is not worth committing",
        },
        {
          name: "RescueTime",
          purpose: "Mindful awareness of time and attention patterns",
          reflection: "Data reveals unconscious habits and flow states",
          philosophy: "What gets measured gets reflected upon",
        },
      ],
    },
  ];

  return (
    <main className="pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-6">
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
            Thoughtful Tools
          </motion.h1>
          <motion.p
            className="text-xl text-stone-600 dark:text-stone-300 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Every tool in my stack serves a purpose beyond functionality—each
            teaches me something about craft, reflection, or intentional growth.
          </motion.p>
        </motion.section>

        {/* Tool Categories */}
        <section className="space-y-16">
          {toolCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              className="space-y-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: categoryIndex * 0.1 }}
            >
              <div className="text-center">
                <motion.h2
                  className="text-3xl font-light text-stone-800 dark:text-stone-100 mb-4"
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + categoryIndex * 0.1,
                  }}
                >
                  {category.category}
                </motion.h2>
                <motion.p
                  className="text-stone-600 dark:text-stone-300 text-lg"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + categoryIndex * 0.1,
                  }}
                >
                  {category.description}
                </motion.p>
              </div>

              <StaggerContainer
                className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6"
                staggerDelay={0.1}
              >
                {category.tools.map((tool, toolIndex) => (
                  <FadeIn
                    key={toolIndex}
                    delay={0.1 * toolIndex}
                    direction="up"
                  >
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="p-6 bg-white/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-300 h-full">
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-xl font-medium text-stone-800 dark:text-stone-200 mb-2">
                              {tool.name}
                            </h3>
                            <p className="text-amber-600 dark:text-amber-400 text-sm font-medium mb-3">
                              {tool.purpose}
                            </p>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <h4 className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                                Personal Reflection
                              </h4>
                              <p className="text-stone-600 dark:text-stone-400 text-sm">
                                {tool.reflection}
                              </p>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                                Philosophy
                              </h4>
                              <p className="text-stone-600 dark:text-stone-400 text-sm italic">
                                {tool.philosophy}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  </FadeIn>
                ))}
              </StaggerContainer>
            </motion.div>
          ))}
        </section>

        {/* Tool Philosophy */}
        <motion.section
          className="py-16"
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
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  On Choosing Tools
                </motion.h2>
                <motion.div
                  className="max-w-3xl mx-auto space-y-4 text-stone-600 dark:text-stone-300 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <p>
                    I don't chase the latest frameworks or tools just because
                    they're new. Instead, I choose technologies that align with
                    my values: simplicity over complexity, sustainability over
                    speed, and tools that make me think better rather than just
                    work faster.
                  </p>
                  <p>
                    Each tool in my stack has earned its place not just through
                    technical merit, but by enhancing my ability to create
                    thoughtfully, reflect meaningfully, and grow continuously.
                  </p>
                </motion.div>
                <motion.blockquote
                  className="text-lg text-stone-700 dark:text-stone-300 italic"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  "The tools we choose shape not just our code, but our thinking
                  patterns."
                </motion.blockquote>
              </div>
            </Card>
          </motion.div>
        </motion.section>

        {/* Learning Stack */}
        <motion.section
          className="py-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-8">
            <motion.h2
              className="text-2xl font-light text-stone-800 dark:text-stone-100 mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Currently Exploring
            </motion.h2>
            <motion.p
              className="text-stone-600 dark:text-stone-300"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Technologies I'm mindfully incorporating into my practice
            </motion.p>
          </div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="p-6 bg-white/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 h-full">
                <h3 className="font-medium text-stone-800 dark:text-stone-200 mb-2">
                  Rust
                </h3>
                <p className="text-stone-600 dark:text-stone-300 text-sm">
                  Learning systems programming with a language that teaches
                  memory safety and performance mindfulness.
                </p>
              </Card>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="p-6 bg-white/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 h-full">
                <h3 className="font-medium text-stone-800 dark:text-stone-200 mb-2">
                  Svelte
                </h3>
                <p className="text-stone-600 dark:text-stone-300 text-sm">
                  Exploring reactive frameworks that prioritize simplicity and
                  compile-time optimizations.
                </p>
              </Card>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="p-6 bg-white/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 h-full">
                <h3 className="font-medium text-stone-800 dark:text-stone-200 mb-2">
                  Deno
                </h3>
                <p className="text-stone-600 dark:text-stone-300 text-sm">
                  Investigating modern runtime environments that embrace web
                  standards and security by default.
                </p>
              </Card>
            </motion.div>
          </motion.div>
        </motion.section>
      </div>
    </main>
  );
};

export default Tools;
