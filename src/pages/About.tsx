"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const About = () => {
  const timeline = [
    {
      year: "2025",
      title: "Present Moment — Software Engineer",
      description:
        "Got a job, building software with intention, growing through reflection.",
      reflection: "Every day is a chance to improve and grow.",
    },
    {
      year: "2024",
      title: "Graduation and Grinding.",
      description:
        "Bangkit Academy, Mentorship, Advising, and Networking made to where am at now.",
      reflection: "Discipline, small commits, and big transformations.",
    },
    {
      year: "2023",
      title: "Revolution and Evolution",
      description:
        "Where journaling starts, philosophy make sense, and AI entered the scene – tried to make use of it.",
      reflection: "This is where I already felt old, but I'm actually not.",
    },
    {
      year: "2021",
      title: "Coding is fun, well imo.",
      description:
        "Solving problems is never been easy, but accomplishing it is a great feeling.",
      reflection: "First dopamine hit.",
    },
    {
      year: "2020",
      title: "The Beginning",
      description:
        "Started my journey in computer science at Sanata Dharma University, coming from an accountant background.",
      reflection: "Determination > destiny.",
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
            The Journey
          </motion.h1>
          <motion.p
            className="text-xl text-stone-600 dark:text-stone-300 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            A story of technical growth intertwined with personal discovery,
            where engineering discipline meets mindful philosophy.
          </motion.p>
        </motion.section>

        {/* Personal Philosophy */}
        <motion.section
          className="py-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <Card className="p-8 bg-gradient-to-br from-amber-50 to-stone-50 dark:from-amber-900/10 dark:to-stone-800 border-amber-200 dark:border-stone-700 hover:shadow-lg transition-all duration-300">
            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-stone-800 dark:text-stone-200">
                Beyond the Code
              </h2>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                I see code the way some see poetry — as a craft shaped over
                time, refined with intention, and meant to outlive its moment.
                Software engineering, for me, is not just about solving
                problems, but about listening closely: to systems, to users, to
                that quiet inner voice asking, “How can this be better?” In
                every pull request, there's a whisper of self-discipline; in
                every bug, a lesson waiting to be learned.
              </p>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                Every commit I make is intentional. Every feature I build serves
                a purpose. Every bug I fix teaches me something new—not just
                about the codebase, but about patience, problem-solving, and the
                importance of approaching challenges with a calm mind.
              </p>
            </div>
          </Card>
        </motion.section>

        {/* Timeline */}
        <section className="py-12">
          <motion.h2
            className="text-3xl font-light text-stone-800 dark:text-stone-100 mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Evolution Timeline
          </motion.h2>
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
              >
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0 w-20 text-right">
                    <span className="text-sm font-mono text-amber-600 dark:text-amber-400">
                      {item.year}
                    </span>
                  </div>
                  <motion.div
                    className="flex-shrink-0 w-3 h-3 bg-amber-400 rounded-full mt-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.2, duration: 0.3 }}
                  ></motion.div>
                  <div className="flex-1">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="p-6 bg-white/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 hover:shadow-md transition-all duration-300">
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
                    </motion.div>
                  </div>
                </div>
                {index < timeline.length - 1 && (
                  <motion.div
                    className="absolute left-28 top-8 w-0.5 bg-stone-200 dark:bg-stone-700"
                    initial={{ height: 0 }}
                    whileInView={{ height: "4rem" }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
                  ></motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Current Focus */}
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
            <Card className="p-8 bg-white/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-300">
              <h2 className="text-2xl font-medium text-stone-800 dark:text-stone-200 mb-6">
                Current Focus
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <h3 className="text-lg font-medium text-stone-800 dark:text-stone-200 mb-3">
                    Technical Growth
                  </h3>
                  <ul className="space-y-2 text-stone-600 dark:text-stone-300">
                    <motion.li
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                    >
                      • Exploring functional programming paradigms
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                    >
                      • Building accessible, performant web applications
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6, duration: 0.3 }}
                    >
                      • Contributing to open source projects mindfully
                    </motion.li>
                  </ul>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <h3 className="text-lg font-medium text-stone-800 dark:text-stone-200 mb-3">
                    Personal Development
                  </h3>
                  <ul className="space-y-2 text-stone-600 dark:text-stone-300">
                    <motion.li
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6, duration: 0.3 }}
                    >
                      • Daily journaling and reflection practice
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7, duration: 0.3 }}
                    >
                      • Teaching and mentoring other developers
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8, duration: 0.3 }}
                    >
                      • Balancing productivity with mindful rest
                    </motion.li>
                  </ul>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </motion.section>
      </div>
    </main>
  );
};

export default About;
