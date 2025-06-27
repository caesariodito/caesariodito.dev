"use client";

import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const ImageSlideshow = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(intervalId);
  }, [images]);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full h-full">
      <AnimatePresence>
        <motion.div
          key={`${currentIndex}-${images[currentIndex]}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${images[currentIndex]})` }}
        />
      </AnimatePresence>
    </div>
  );
};

const About = () => {
  const timeline = [
    {
      year: "2025",
      title: "Present Moment — Software Engineer",
      description:
        "Got a job, building software with intention, growing through reflection.",
      reflection: "Every day is a chance to improve and grow.",
      visuals: ["/images/placeholder-all.jpg"],
    },
    {
      year: "2024",
      title: "Graduation and Grinding.",
      description:
        "Bangkit Academy, Mentorship, Advising, and Networking made to where am at now.",
      reflection: "Discipline, small commits, and big transformations.",
      visuals: ["/images/logo.png", "/images/placeholder-all.jpg"],
    },
    {
      year: "2023",
      title: "Revolution and Evolution",
      description:
        "Where journaling starts, philosophy make sense, and AI entered the scene – tried to make use of it.",
      reflection: "This is where I already felt old, but I'm actually not.",
      visuals: ["/images/placeholder-all.jpg"],
    },
    {
      year: "2021",
      title: "Coding is fun, well imo.",
      description:
        "Solving problems is never been easy, but accomplishing it is a great feeling.",
      reflection: "First dopamine hit.",
      visuals: ["/images/logo.png"],
    },
    {
      year: "2020",
      title: "The Beginning",
      description:
        "Started my journey in computer science at Sanata Dharma University, coming from an accountant background.",
      reflection: "Determination > destiny.",
      visuals: ["/images/placeholder-all.jpg"],
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
          className="py-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="space-y-8">
            <h2 className="text-center text-3xl font-light text-stone-800 dark:text-stone-200">
              Beyond the Code
            </h2>
            <blockquote className="border-l-4 border-amber-400 pl-6 text-xl italic text-stone-600 dark:text-stone-300">
              "I see code the way some see poetry — as a craft shaped over time,
              refined with intention, and meant to outlive its moment."
            </blockquote>
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
              Software engineering, for me, is not just about solving problems,
              but about listening closely: to systems, to users, to that quiet
              inner voice asking, "How can this be better?" In every pull
              request, there's a whisper of self-discipline; in every bug, a
              lesson waiting to be learned.
            </p>
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
              Every commit I make is intentional. Every feature I build serves a
              purpose. Every bug I fix teaches me something new—not just about
              the codebase, but about patience, problem-solving, and the
              importance of approaching challenges with a calm mind.
            </p>
          </div>
        </motion.section>

        {/* Timeline */}
        <section className="py-16">
          <motion.h2
            className="text-3xl font-light text-stone-800 dark:text-stone-100 mb-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Evolution Timeline
          </motion.h2>

          {/* Mobile Timeline */}
          <div className="space-y-8 md:hidden">
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
                      <Card className="p-6 bg-white/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 hover:shadow-md transition-all duration-300 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10 z-0">
                          <ImageSlideshow images={item.visuals} />
                        </div>
                        <div className="relative z-10">
                          <h3 className="text-lg font-medium text-stone-800 dark:text-stone-200 mb-2">
                            {item.title}
                          </h3>
                          <p className="text-stone-600 dark:text-stone-300 mb-3">
                            {item.description}
                          </p>
                          <p className="text-sm text-amber-700 dark:text-amber-400 italic">
                            {item.reflection}
                          </p>
                        </div>
                      </Card>
                    </motion.div>
                  </div>
                </div>
                {index < timeline.length - 1 && (
                  <motion.div
                    className="absolute left-28 top-8 w-0.5 bg-stone-200 dark:bg-stone-700"
                    initial={{ height: 0 }}
                    whileInView={{ height: "calc(100% - 1rem)" }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
                  ></motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Desktop Timeline */}
          <div className="hidden md:block relative">
            <motion.div
              className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-stone-200 dark:bg-stone-700"
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              transition={{ duration: timeline.length * 0.8, ease: "linear" }}
            />
            <div className="space-y-16">
              {timeline.map((item, index) => {
                const isLeft = index % 2 !== 0;
                return (
                  <motion.div
                    key={index}
                    className="flex items-center relative"
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.div
                      className={`w-5/12 ${
                        isLeft ? "order-1 pr-6" : "order-3 pl-6"
                      }`}
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="p-6 bg-white/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 shadow-md hover:shadow-xl transition-all duration-300">
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

                    <div className="w-2/12 order-2 flex justify-center">
                      <motion.div
                        className="z-10 h-4 w-4 rounded-full bg-amber-500 border-4 border-stone-50 dark:border-stone-900"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                      />
                    </div>

                    <div
                      className={`w-5/12 ${
                        isLeft ? "order-3 pl-6" : "order-1 pr-6 text-right"
                      } relative h-24 flex items-center ${
                        isLeft ? "" : "justify-end"
                      }`}
                    >
                      <div className="absolute inset-0 opacity-10 z-0">
                        <ImageSlideshow images={item.visuals} />
                      </div>
                      <span className="relative z-10 text-sm font-mono text-amber-600 dark:text-amber-400">
                        {item.year}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default About;
