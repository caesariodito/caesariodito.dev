import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const LoadingAnimation: React.FC = () => {
  const [loadingText, setLoadingText] = useState("Loading journal entries");

  useEffect(() => {
    const texts = [
      "Loading journal entries",
      "Connecting thoughts",
      "Gathering reflections",
      "Exploring connections",
      "Mapping knowledge",
    ];

    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % texts.length;
      setLoadingText(texts[index]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="flex flex-col items-center my-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <motion.div
          className="w-16 h-16 rounded-full border-4 border-stone-200 dark:border-stone-700 border-t-amber-400 dark:border-t-amber-600"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Sparkles className="text-amber-500 dark:text-amber-400" size={16} />
        </motion.div>
      </div>
      <motion.p
        className="mt-4 text-sm text-stone-600 dark:text-stone-400"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {loadingText}
      </motion.p>
    </motion.div>
  );
};

export default LoadingAnimation;
