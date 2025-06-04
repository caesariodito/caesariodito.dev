import React from "react";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface EmptyStateProps {
  searchQuery?: string;
  resetFilters: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  searchQuery,
  resetFilters,
}) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-stone-100 dark:bg-stone-800 rounded-full p-6 mb-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.2,
          type: "spring",
          stiffness: 200,
        }}
      >
        <motion.div
          animate={{
            rotate: [0, -10, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <BookOpen className="text-amber-500 dark:text-amber-400 h-12 w-12" />
        </motion.div>
      </motion.div>
      <motion.h3
        className="text-xl font-medium text-stone-800 dark:text-stone-200 mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        No journal entries found
      </motion.h3>
      <motion.p
        className="text-stone-600 dark:text-stone-400 text-center max-w-md mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {searchQuery
          ? `No results found for "${searchQuery}"`
          : "Try adjusting your filters to find what you're looking for."}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button onClick={resetFilters} variant="outline">
          Clear all filters
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default EmptyState;
