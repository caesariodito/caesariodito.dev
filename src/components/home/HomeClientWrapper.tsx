"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn, StaggerContainer } from "@/components/ui/motion";
import { useState, useEffect } from "react";

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
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const titleWords = ["clarity", "&", "intention"];
  const codeSnippets = [
    "{ growth: '1%', mindset: 'zen', code: 'clean' }",
    "// Finding clarity in complexity",
    "const newPerspective = (oldProblem) => {...}",
    "db.thoughts.find({ tags: 'inspiration' })",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % codeSnippets.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [codeSnippets.length]);

  const particles = Array.from({ length: 30 });

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
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.2,
                        delayChildren: 0.3,
                      },
                    },
                  }}
                >
                  {titleWords.map((word, index) => (
                    <motion.span
                      key={index}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      className="inline-block mr-4"
                    >
                      {word}
                    </motion.span>
                  ))}
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
            <div className="w-full h-96 bg-gradient-to-br from-amber-100 to-stone-200 dark:from-amber-900/20 dark:to-stone-800 rounded-3xl relative overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-200/20 to-stone-300/20 dark:from-transparent dark:via-amber-800/10 dark:to-stone-700/20"></div>

              {/* Particle Animation */}
              {particles.map((_, i) => {
                const size = Math.random() * 2 + 1;
                const top = `${Math.random() * 100}%`;
                const left = `${Math.random() * 100}%`;
                const duration = Math.random() * 5 + 3;
                const delay = Math.random() * 3;
                return (
                  <motion.div
                    key={i}
                    className="absolute bg-amber-200/80 dark:bg-amber-400/30 rounded-full"
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                      top,
                      left,
                    }}
                    animate={{
                      x: [0, Math.random() * 30 - 15, 0],
                      y: [0, Math.random() * 30 - 15, 0],
                      scale: [1, Math.random() * 0.5 + 0.5, 1],
                    }}
                    transition={{
                      duration,
                      delay,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut",
                    }}
                  />
                );
              })}

              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTextIndex}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="text-stone-600 dark:text-stone-300 text-sm font-mono"
                  >
                    {codeSnippets[currentTextIndex]}
                  </motion.div>
                </AnimatePresence>
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

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          staggerDelay={0.15}
        >
          {principles.map((principle, index) => (
            <FadeIn key={index}>
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <Card className="h-full p-8 bg-white/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-300 flex flex-col">
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
                    <div className="flex-1 space-y-4 flex flex-col">
                      <div className="flex-grow">
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

      {/* Call to Action */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="bg-gradient-to-r from-amber-50 to-orange-100 dark:from-stone-800 dark:to-stone-900/70 p-12 rounded-3xl text-center shadow-lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
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
              <Link href="/about">
                <Button
                  variant="outline"
                  className="border-stone-300 dark:border-stone-600 px-8 py-6 rounded-full text-lg hover:bg-stone-50 dark:hover:bg-stone-800 transition-all duration-300"
                >
                  Get In Touch
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default HomeClientWrapper;
