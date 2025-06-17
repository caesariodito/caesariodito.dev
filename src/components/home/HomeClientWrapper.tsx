"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer } from "@/components/ui/motion";

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

interface Principle {
  title: string;
  icon: string;
  description: string;
  details: string;
}

interface HomeClientWrapperProps {
  principles: Principle[];
}

const HomeClientWrapper = ({ principles }: HomeClientWrapperProps) => {
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
                Coding with
                <motion.span
                  className="block text-amber-600 dark:text-amber-400 font-medium"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  clarity & intention
                </motion.span>
              </h1>
              <motion.p
                className="text-xl text-stone-600 dark:text-stone-300 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                A fullstack engineer who believes in mindful development—where
                journaling meets debugging, and reflection improves both code
                and life.
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
                  {"{ growth: '1%', mindset: 'zen', code: 'clean' }"}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy - Core Principles Section */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-3xl font-light text-stone-800 dark:text-stone-100 mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            My Core Principles
          </motion.h2>
          <motion.p
            className="text-xl text-stone-600 dark:text-stone-300 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            The philosophy that guides my approach to both code and life—where
            inner clarity meets technical excellence.
          </motion.p>
        </motion.div>

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
                        <p className="text-stone-600 dark:text-stone-300">
                          {principle.description}
                        </p>
                      </div>
                      <div className="pt-4 text-stone-500 dark:text-stone-400 leading-relaxed">
                        {principle.details}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </FadeIn>
          ))}
        </StaggerContainer>
      </section>

      {/* Skills & Expertise */}
      <section className="max-w-6xl mx-auto px-6 py-16 bg-white/50 dark:bg-stone-800/30 rounded-3xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-3xl font-light text-stone-800 dark:text-stone-100 mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Skills & Expertise
          </motion.h2>
          <motion.p
            className="text-xl text-stone-600 dark:text-stone-300 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            A balanced fullstack engineer who believes in choosing the right
            tool for the job.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <StaggerContainer className="space-y-6" staggerDelay={0.1}>
            <FadeIn>
              <h3 className="text-xl font-medium mb-4 text-stone-800 dark:text-stone-200">
                Frontend Expertise
              </h3>
            </FadeIn>
            <FadeIn direction="up">
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-1/3 text-stone-600 dark:text-stone-300">
                    React & Next.js
                  </div>
                  <div className="w-2/3 h-2 bg-stone-200 dark:bg-stone-600 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-amber-500 dark:bg-amber-400"
                      initial={{ width: 0 }}
                      whileInView={{ width: "90%" }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, duration: 0.8 }}
                    ></motion.div>
                  </div>
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="up">
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-1/3 text-stone-600 dark:text-stone-300">
                    TypeScript
                  </div>
                  <div className="w-2/3 h-2 bg-stone-200 dark:bg-stone-600 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-amber-500 dark:bg-amber-400"
                      initial={{ width: 0 }}
                      whileInView={{ width: "85%" }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                    ></motion.div>
                  </div>
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="up">
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-1/3 text-stone-600 dark:text-stone-300">
                    TailwindCSS
                  </div>
                  <div className="w-2/3 h-2 bg-stone-200 dark:bg-stone-600 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-amber-500 dark:bg-amber-400"
                      initial={{ width: 0 }}
                      whileInView={{ width: "95%" }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                    ></motion.div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </StaggerContainer>

          <StaggerContainer className="space-y-6" staggerDelay={0.15}>
            <FadeIn>
              <h3 className="text-xl font-medium mb-4 text-stone-800 dark:text-stone-200">
                Backend Proficiency
              </h3>
            </FadeIn>
            <FadeIn direction="up">
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-1/3 text-stone-600 dark:text-stone-300">
                    Node.js
                  </div>
                  <div className="w-2/3 h-2 bg-stone-200 dark:bg-stone-600 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-amber-500 dark:bg-amber-400"
                      initial={{ width: 0 }}
                      whileInView={{ width: "85%" }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                    ></motion.div>
                  </div>
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="up">
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-1/3 text-stone-600 dark:text-stone-300">
                    GraphQL/REST
                  </div>
                  <div className="w-2/3 h-2 bg-stone-200 dark:bg-stone-600 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-amber-500 dark:bg-amber-400"
                      initial={{ width: 0 }}
                      whileInView={{ width: "80%" }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                    ></motion.div>
                  </div>
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="up">
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-1/3 text-stone-600 dark:text-stone-300">
                    Databases
                  </div>
                  <div className="w-2/3 h-2 bg-stone-200 dark:bg-stone-600 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-amber-500 dark:bg-amber-400"
                      initial={{ width: 0 }}
                      whileInView={{ width: "78%" }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    ></motion.div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </StaggerContainer>

          <StaggerContainer className="space-y-6" staggerDelay={0.2}>
            <FadeIn>
              <h3 className="text-xl font-medium mb-4 text-stone-800 dark:text-stone-200">
                Other Skills
              </h3>
            </FadeIn>
            <FadeIn direction="up">
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-1/3 text-stone-600 dark:text-stone-300">
                    UX/UI Design
                  </div>
                  <div className="w-2/3 h-2 bg-stone-200 dark:bg-stone-600 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-amber-500 dark:bg-amber-400"
                      initial={{ width: 0 }}
                      whileInView={{ width: "70%" }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                    ></motion.div>
                  </div>
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="up">
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-1/3 text-stone-600 dark:text-stone-300">
                    Testing
                  </div>
                  <div className="w-2/3 h-2 bg-stone-200 dark:bg-stone-600 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-amber-500 dark:bg-amber-400"
                      initial={{ width: 0 }}
                      whileInView={{ width: "75%" }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    ></motion.div>
                  </div>
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="up">
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-1/3 text-stone-600 dark:text-stone-300">
                    DevOps
                  </div>
                  <div className="w-2/3 h-2 bg-stone-200 dark:bg-stone-600 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-amber-500 dark:bg-amber-400"
                      initial={{ width: 0 }}
                      whileInView={{ width: "65%" }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                    ></motion.div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </StaggerContainer>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <h2 className="text-3xl font-light text-stone-800 dark:text-stone-100 mb-6">
            Interested in working together?
          </h2>
          <p className="text-xl text-stone-600 dark:text-stone-300 mb-8 max-w-3xl mx-auto">
            I'm currently open to new opportunities where I can apply my
            technical skills and mindful approach to create meaningful digital
            experiences.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/projects">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-6 rounded-full text-lg transition-all duration-300 hover:scale-105">
                Explore My Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default HomeClientWrapper;
