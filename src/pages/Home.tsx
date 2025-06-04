"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Home = () => {
  return (
    <main className="pt-20 pb-16">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-8"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-light text-stone-800 dark:text-stone-100 leading-tight">
                Building with
                <motion.span
                  className="block text-amber-600 dark:text-amber-400 font-medium"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  intention
                </motion.span>
              </h1>
              <motion.p
                className="text-xl text-stone-600 dark:text-stone-300 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                Fullstack engineer who believes in the power of mindful growth,
                daily reflection, and the 1% better principle.
              </motion.p>
            </div>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <Link href="/about">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full transition-all duration-300 hover:scale-105">
                  My Story
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/projects">
                <Button
                  variant="outline"
                  className="border-stone-300 dark:border-stone-600 px-6 py-3 rounded-full hover:bg-stone-50 dark:hover:bg-stone-800 transition-all duration-300"
                >
                  View Projects
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <div className="w-full h-96 bg-gradient-to-br from-amber-100 to-stone-200 dark:from-amber-900/20 dark:to-stone-800 rounded-3xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-200/20 to-stone-300/20 dark:from-transparent dark:via-amber-800/10 dark:to-stone-700/20"></div>
              <motion.div
                className="absolute top-8 right-8 w-3 h-3 bg-amber-400 rounded-full animate-pulse"
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(251, 191, 36, 0.4)",
                    "0 0 20px rgba(251, 191, 36, 0.7)",
                    "0 0 0px rgba(251, 191, 36, 0.4)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              ></motion.div>
              <motion.div
                className="absolute bottom-12 left-8 w-2 h-2 bg-stone-400 rounded-full"
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(120, 113, 108, 0.4)",
                    "0 0 15px rgba(120, 113, 108, 0.7)",
                    "0 0 0px rgba(120, 113, 108, 0.4)",
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              ></motion.div>
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
              >
                <div className="text-stone-600 dark:text-stone-300 text-sm font-mono">
                  {"{ growth: '1%', mindset: 'zen' }"}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Preview */}
      <motion.section
        className="max-w-6xl mx-auto px-6 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="text-center space-y-8">
          <motion.h2
            className="text-3xl font-light text-stone-800 dark:text-stone-100"
            variants={fadeIn}
          >
            Core Principles
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div variants={fadeIn}>
              <Card className="p-6 bg-white/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <div className="space-y-3">
                  <div className="text-2xl">🧘</div>
                  <h3 className="text-lg font-medium text-stone-800 dark:text-stone-200">
                    Balance over Hustle
                  </h3>
                  <p className="text-stone-600 dark:text-stone-400 text-sm">
                    Sustainable growth through mindful practices and intentional
                    choices.
                  </p>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn}>
              <Card className="p-6 bg-white/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <div className="space-y-3">
                  <div className="text-2xl">📝</div>
                  <h3 className="text-lg font-medium text-stone-800 dark:text-stone-200">
                    Reflection over Reactivity
                  </h3>
                  <p className="text-stone-600 dark:text-stone-400 text-sm">
                    Daily journaling and self-awareness as tools for continuous
                    improvement.
                  </p>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn}>
              <Card className="p-6 bg-white/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <div className="space-y-3">
                  <div className="text-2xl">🌱</div>
                  <h3 className="text-lg font-medium text-stone-800 dark:text-stone-200">
                    Progress over Perfection
                  </h3>
                  <p className="text-stone-600 dark:text-stone-400 text-sm">
                    Every commit is a conversation, every line of code a step
                    forward.
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="max-w-4xl mx-auto px-6 py-16 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <div className="space-y-6">
          <motion.h2
            className="text-2xl font-light text-stone-800 dark:text-stone-100"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            "Build intentionally. Grow quietly. Reflect constantly."
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Link href="/journal">
              <Button
                variant="outline"
                className="border-amber-300 dark:border-amber-600 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 px-8 py-3 rounded-full hover:scale-105 transition-transform duration-300"
              >
                Read My Journal
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
};

export default Home;
