import React from "react";
import { Card } from "@/components/ui/card";
import { JournalFrontmatter } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { Calendar, Hash } from "lucide-react";

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
    <Card
      className="bg-white/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-300 cursor-pointer h-full"
      onClick={onClick}
    >
      <div className="p-5 h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{entry.mood}</span>
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
                    <span className="text-amber-600 dark:text-amber-400">
                      {entry.category}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Word count indicator */}
        <div className="mb-3 flex items-center">
          <div className="h-1 bg-stone-100 dark:bg-stone-700 rounded-full w-full">
            <div
              className="h-1 bg-amber-400 dark:bg-amber-600 rounded-full"
              style={{
                width: `${Math.min(100, (entry.wordCount / 500) * 100)}%`,
              }}
            />
          </div>
          <span className="text-xs text-stone-500 dark:text-stone-400 ml-2">
            {entry.wordCount} words
          </span>
        </div>

        <p className="text-stone-600 dark:text-stone-300 text-sm line-clamp-3 mb-3 flex-grow">
          {entry.excerpt}
        </p>

        {/* Growth moment preview */}
        {entry.growth && (
          <div className="bg-gradient-to-r from-amber-50 to-stone-50 dark:from-amber-900/10 dark:to-stone-800 p-3 rounded-lg border-l-2 border-amber-400 mb-3">
            <p className="text-stone-600 dark:text-stone-300 text-xs line-clamp-2">
              {entry.growth}
            </p>
          </div>
        )}

        {/* Tags */}
        {entry.tags && entry.tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1">
            {entry.tags.slice(0, 3).map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="inline-flex items-center px-1.5 py-0.5 bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-full text-xs hover:bg-amber-100 dark:hover:bg-amber-900/30"
                onClick={(e) => handleTagClick(tag, e)}
              >
                <Hash size={8} className="mr-0.5" />
                {tag}
              </span>
            ))}
            {entry.tags.length > 3 && (
              <span className="inline-flex items-center px-1.5 py-0.5 bg-stone-100 dark:bg-stone-700 text-stone-500 dark:text-stone-400 rounded-full text-xs">
                +{entry.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default JournalCard;
