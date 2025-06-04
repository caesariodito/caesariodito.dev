import React from "react";
import { Card } from "@/components/ui/card";
import { JournalFrontmatter } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { Calendar, Hash } from "lucide-react";
import { motion } from "framer-motion";

interface JournalCardProps {
  entry: JournalFrontmatter;
  onClick: () => void;
  handleTagClick: (tag: string, e: React.MouseEvent) => void;
}

const JournalCard: React.FC<JournalCardProps> = ({
  entry,
  onClick,
  handleTagClick,
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="h-[290px]"
    >
      <Card
        className="bg-white/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-300 cursor-pointer h-full"
        onClick={onClick}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-3">
              <motion.span
                className="text-2xl"
                whileHover={{ scale: 1.3, rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                {entry.mood}
              </motion.span>
              <div>
                <h3 className="text-lg font-medium text-stone-800 dark:text-stone-200 line-clamp-2">
                  {entry.title}
                </h3>
                <div className="flex items-center space-x-2 text-xs text-stone-600 dark:text-stone-400">
                  <span className="flex items-center">
                    <Calendar size={12} className="mr-1" />
                    {formatDate(entry.date)}
                  </span>
                  {entry.category && (
                    <>
                      <span>•</span>
                      <motion.span
                        className="text-amber-600 dark:text-amber-400"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {entry.category}
                      </motion.span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Word count indicator */}
          <div className="mb-2 flex items-center">
            <div className="h-1 bg-stone-100 dark:bg-stone-700 rounded-full w-full overflow-hidden">
              <motion.div
                className="h-1 bg-amber-400 dark:bg-amber-600 rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min(100, (entry.wordCount / 500) * 100)}%`,
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <motion.span
              className="text-xs text-stone-500 dark:text-stone-400 ml-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              {entry.wordCount} words
            </motion.span>
          </div>

          <p className="text-stone-600 dark:text-stone-300 text-sm line-clamp-3 mb-2 flex-grow">
            {entry.excerpt}
          </p>

          {/* Growth moment preview */}
          {entry.growth && (
            <motion.div
              className="bg-gradient-to-r from-amber-50 to-stone-50 dark:from-amber-900/10 dark:to-stone-800 p-2 rounded-lg border-l-2 border-amber-400 mb-2"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-stone-600 dark:text-stone-300 text-xs line-clamp-2">
                {entry.growth}
              </p>
            </motion.div>
          )}

          {/* Tags */}
          {entry.tags && entry.tags.length > 0 && (
            <motion.div
              className="mt-2 flex flex-wrap gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {entry.tags.slice(0, 3).map((tag, tagIndex) => (
                <motion.span
                  key={tagIndex}
                  className="inline-flex items-center px-1.5 py-0.5 bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-full text-xs hover:bg-amber-100 dark:hover:bg-amber-900/30"
                  onClick={(e) => handleTagClick(tag, e)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.2,
                    opacity: { delay: 0.3 + tagIndex * 0.1, duration: 0.3 },
                  }}
                >
                  <Hash size={8} className="mr-0.5" />
                  {tag}
                </motion.span>
              ))}
              {entry.tags.length > 3 && (
                <motion.span
                  className="inline-flex items-center px-1.5 py-0.5 bg-stone-100 dark:bg-stone-700 text-stone-500 dark:text-stone-400 rounded-full text-xs"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.2,
                    opacity: { delay: 0.6, duration: 0.3 },
                  }}
                >
                  +{entry.tags.length - 3}
                </motion.span>
              )}
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default JournalCard;
