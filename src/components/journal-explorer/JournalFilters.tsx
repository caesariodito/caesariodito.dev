import React, { RefObject } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Loader2, X } from "lucide-react";

interface JournalFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
  sortBy: "date" | "title" | "wordCount";
  sortDirection: "asc" | "desc";
  applySort: (sortValue: string) => void;
  categories: string[];
  tags: string[];
  isSearching: boolean;
  handleSearchClick: () => void;
  searchInputRef: RefObject<HTMLInputElement>;
  clearSearch: () => void;
}

const JournalFilters: React.FC<JournalFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedTag,
  setSelectedTag,
  sortBy,
  sortDirection,
  applySort,
  categories,
  tags,
  isSearching,
  handleSearchClick,
  searchInputRef,
  clearSearch,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-4 w-full">
      {/* Search Input */}
      <div className="relative w-full md:w-64 mt-2 md:mt-0">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400"
          size={16}
        />
        <Input
          ref={searchInputRef}
          placeholder="Search journals..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
          className="pl-9 pr-8"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 sm:gap-2 w-full md:w-auto mt-3 md:mt-0">
        <Select
          value={selectedCategory || "all"}
          onValueChange={(value) => {
            setSelectedCategory(value === "all" ? null : value);
          }}
        >
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedTag || "all"}
          onValueChange={(value) => {
            setSelectedTag(value === "all" ? null : value);
          }}
        >
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="Tag" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tags</SelectItem>
            {tags.map((tag) => (
              <SelectItem key={tag} value={tag}>
                {tag}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={`${sortBy}-${sortDirection}`}
          onValueChange={(value) => {
            applySort(value);
          }}
        >
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-desc">Newest First</SelectItem>
            <SelectItem value="date-asc">Oldest First</SelectItem>
            <SelectItem value="title-asc">Title A-Z</SelectItem>
            <SelectItem value="title-desc">Title Z-A</SelectItem>
            <SelectItem value="wordCount-desc">Longest First</SelectItem>
            <SelectItem value="wordCount-asc">Shortest First</SelectItem>
          </SelectContent>
        </Select>

        <Button
          onClick={handleSearchClick}
          className="bg-amber-500 hover:bg-amber-600 text-white dark:bg-amber-600 dark:hover:bg-amber-700"
          disabled={isSearching}
        >
          {isSearching ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Search"
          )}
        </Button>
      </div>
    </div>
  );
};

export default JournalFilters;
