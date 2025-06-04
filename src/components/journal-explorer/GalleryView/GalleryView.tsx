import React from "react";
import { JournalFrontmatter } from "@/lib/mdx";
import InfiniteScroll from "react-infinite-scroll-component";
import JournalCard from "./JournalCard";
import MasonryGrid from "./MasonryGrid";
import LoadingAnimation from "../common/LoadingAnimation";
import EmptyState from "../common/EmptyState";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryViewProps {
  journalEntries: JournalFrontmatter[];
  isLoading: boolean;
  hasMore: boolean;
  loadMoreEntries: () => void;
  handleEntryClick: (slug: string) => void;
  handleTagClick: (tag: string, e: React.MouseEvent) => void;
  searchQuery?: string;
  resetFilters: () => void;
}

const GalleryView: React.FC<GalleryViewProps> = ({
  journalEntries,
  isLoading,
  hasMore,
  loadMoreEntries,
  handleEntryClick,
  handleTagClick,
  searchQuery,
  resetFilters,
}) => {
  if (isLoading && journalEntries.length === 0) {
    return <LoadingAnimation />;
  }

  if (journalEntries.length === 0) {
    return <EmptyState searchQuery={searchQuery} resetFilters={resetFilters} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <InfiniteScroll
        dataLength={journalEntries.length}
        next={loadMoreEntries}
        hasMore={hasMore}
        loader={isLoading ? <LoadingAnimation /> : null}
        endMessage={
          <motion.p
            className="text-center text-stone-500 dark:text-stone-400 my-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            You've seen all journal entries
          </motion.p>
        }
      >
        <AnimatePresence>
          <MasonryGrid>
            {journalEntries.map((entry, index) => (
              <motion.div
                key={`${entry.slug}-${index}`}
                className="grid-item"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: Math.min(index * 0.05, 0.8), // Cap the maximum delay
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                layout // Enable smooth layout transitions
                layoutId={entry.slug} // Unique ID for FLIP animations
              >
                <JournalCard
                  entry={entry}
                  onClick={() => handleEntryClick(entry.slug)}
                  handleTagClick={handleTagClick}
                />
              </motion.div>
            ))}
          </MasonryGrid>
        </AnimatePresence>
      </InfiniteScroll>
    </motion.div>
  );
};

export default GalleryView;
