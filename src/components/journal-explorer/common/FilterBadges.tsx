import React from "react";
import { X } from "lucide-react";

interface FilterBadgesProps {
  searchQuery: string;
  selectedCategory: string | null;
  selectedTag: string | null;
  clearSearch: () => void;
  clearCategory: () => void;
  clearTag: () => void;
  resetFilters: () => void;
}

const FilterBadges: React.FC<FilterBadgesProps> = ({
  searchQuery,
  selectedCategory,
  selectedTag,
  clearSearch,
  clearCategory,
  clearTag,
  resetFilters,
}) => {
  if (!searchQuery && !selectedCategory && !selectedTag) return null;

  return (
    <div className="mb-4 flex items-center flex-wrap gap-2">
      <span className="text-sm text-stone-500 dark:text-stone-400">
        Active filters:
      </span>
      {searchQuery && (
        <button
          onClick={clearSearch}
          className="inline-flex items-center px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded-full text-xs"
        >
          Search: {searchQuery}
          <X size={12} className="ml-1" />
        </button>
      )}
      {selectedCategory && (
        <button
          onClick={clearCategory}
          className="inline-flex items-center px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded-full text-xs"
        >
          Category: {selectedCategory}
          <X size={12} className="ml-1" />
        </button>
      )}
      {selectedTag && (
        <button
          onClick={clearTag}
          className="inline-flex items-center px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded-full text-xs"
        >
          Tag: {selectedTag}
          <X size={12} className="ml-1" />
        </button>
      )}
      {(searchQuery || selectedCategory || selectedTag) && (
        <button
          onClick={resetFilters}
          className="text-xs text-stone-500 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400"
        >
          Clear all
        </button>
      )}
    </div>
  );
};

export default FilterBadges;
