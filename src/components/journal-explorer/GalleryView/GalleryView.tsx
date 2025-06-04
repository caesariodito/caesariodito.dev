import React from "react";
import { JournalFrontmatter } from "@/lib/mdx";
import InfiniteScroll from "react-infinite-scroll-component";
import JournalCard from "./JournalCard";
import MasonryGrid from "./MasonryGrid";
import LoadingAnimation from "../common/LoadingAnimation";
import EmptyState from "../common/EmptyState";

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
    <InfiniteScroll
      dataLength={journalEntries.length}
      next={loadMoreEntries}
      hasMore={hasMore}
      loader={isLoading ? <LoadingAnimation /> : null}
      endMessage={
        <p className="text-center text-stone-500 dark:text-stone-400 my-8">
          You've seen all journal entries
        </p>
      }
    >
      <MasonryGrid>
        {journalEntries.map((entry, index) => (
          <div key={`${entry.slug}-${index}`} className="grid-item">
            <JournalCard
              entry={entry}
              onClick={() => handleEntryClick(entry.slug)}
              handleTagClick={handleTagClick}
            />
          </div>
        ))}
      </MasonryGrid>
    </InfiniteScroll>
  );
};

export default GalleryView;
