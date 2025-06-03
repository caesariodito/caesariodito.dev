"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JournalFrontmatter } from "@/lib/mdx";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import {
  Calendar,
  Hash,
  Tag,
  Grid,
  Network,
  Search,
  Filter,
  Sparkles,
  BookOpen,
  X,
  Loader2,
} from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDebounce } from "../hooks/useDebounce";

const JournalExplorer = () => {
  // State for journal entries and pagination
  const [journalEntries, setJournalEntries] = useState<JournalFrontmatter[]>(
    []
  );
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [totalResults, setTotalResults] = useState<number | null>(null);

  // State for filtering and sorting
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"date" | "title" | "wordCount">("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  // Add a filter change counter to force refresh
  const [filterChangeCounter, setFilterChangeCounter] = useState(0);

  // State for view mode
  const [viewMode, setViewMode] = useState<"gallery" | "graph">("gallery");

  // Unique categories and tags for filters
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const router = useRouter();
  const masonryRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Load preferences from local storage on mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem("journalExplorerPreferences");
    if (savedPreferences) {
      try {
        const preferences = JSON.parse(savedPreferences);
        setViewMode(preferences.viewMode || "gallery");
        setSortBy(preferences.sortBy || "date");
        setSortDirection(preferences.sortDirection || "desc");
      } catch (error) {
        console.error("Error parsing preferences:", error);
      }
    }
  }, []);

  // Save preferences when they change
  useEffect(() => {
    const preferences = {
      viewMode,
      sortBy,
      sortDirection,
    };
    localStorage.setItem(
      "journalExplorerPreferences",
      JSON.stringify(preferences)
    );
  }, [viewMode, sortBy, sortDirection]);

  // Initial data fetch
  useEffect(() => {
    fetchJournals();
    fetchCategoriesAndTags();
  }, []);

  // Apply debounced search
  useEffect(() => {
    // Don't auto-search on initial load
    if (debouncedSearchQuery === "" && searchQuery === "") {
      return;
    }

    // Only trigger search when debounce completes
    if (debouncedSearchQuery !== searchQuery) {
      return;
    }

    setFilterChangeCounter((prev) => prev + 1);
  }, [debouncedSearchQuery]);

  // Watch for changes in category, tag, and sort settings
  useEffect(() => {
    // Skip the very first render
    if (filterChangeCounter === 0) {
      return;
    }

    // Don't fetch on component mount if no entries yet
    if (
      journalEntries.length === 0 &&
      !isLoading &&
      filterChangeCounter === 1
    ) {
      return;
    }

    fetchJournals(true);
  }, [filterChangeCounter]);

  // Get grid columns based on screen size
  const getGridColumns = () => {
    if (typeof window === "undefined")
      return "repeat(auto-fill, minmax(300px, 1fr))";

    const width = window.innerWidth;
    if (width < 640) return "repeat(auto-fill, minmax(280px, 1fr))";
    if (width < 768) return "repeat(auto-fill, minmax(280px, 1fr))";
    if (width < 1024) return "repeat(auto-fill, minmax(300px, 1fr))";
    if (width < 1280) return "repeat(auto-fill, minmax(320px, 1fr))";
    return "repeat(auto-fill, minmax(350px, 1fr))";
  };

  // Update grid on resize
  useEffect(() => {
    const handleResize = () => {
      if (masonryRef.current) {
        masonryRef.current.style.gridTemplateColumns = getGridColumns();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate and set the height of each card
  useEffect(() => {
    if (journalEntries.length > 0) {
      setTimeout(() => {
        const handleResize = () => {
          if (masonryRef.current) {
            masonryRef.current.style.gridTemplateColumns = getGridColumns();
          }
        };
        handleResize();
      }, 200);
    }
  }, [journalEntries]);

  // Fetch journals with pagination and filters
  const fetchJournals = async (reset = false) => {
    if (reset) {
      setPage(1);
      setJournalEntries([]);
      setHasMore(true);
    }

    const currentPage = reset ? 1 : page;
    setIsLoading(true);
    if (reset) {
      setIsSearching(true);
    }

    try {
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: "12",
        sortBy,
        sortDirection,
      });

      if (searchQuery) queryParams.append("q", searchQuery);
      if (selectedCategory) queryParams.append("category", selectedCategory);
      if (selectedTag) queryParams.append("tag", selectedTag);

      const response = await fetch(`/api/journals?${queryParams.toString()}`);
      const data = await response.json();

      // Always set loading to false before processing the data
      setIsLoading(false);
      setIsSearching(false);

      // Set total results if available in response
      if (data.total !== undefined) {
        setTotalResults(data.total);
      } else if (Array.isArray(data)) {
        // Estimate total if not provided
        setTotalResults(data.length < 12 ? data.length : null);
      } else if (data.journals) {
        setTotalResults(
          data.journals.length < 12 ? data.journals.length : null
        );
      }

      if (Array.isArray(data)) {
        if (data.length === 0) {
          setHasMore(false);
        } else {
          // Filter out duplicates based on slug
          const uniqueEntries = reset
            ? data
            : data.filter(
                (entry) =>
                  !journalEntries.some(
                    (existing) => existing.slug === entry.slug
                  )
              );

          setJournalEntries(
            reset ? data : [...journalEntries, ...uniqueEntries]
          );
          setPage((prev) => (reset ? 2 : prev + 1));
          setHasMore(uniqueEntries.length > 0);
        }
      } else if (data.journals) {
        // Handle response format with journals property
        if (data.journals.length === 0) {
          setHasMore(false);
        } else {
          // Filter out duplicates based on slug
          const uniqueEntries = reset
            ? data.journals
            : data.journals.filter(
                (entry) =>
                  !journalEntries.some(
                    (existing) => existing.slug === entry.slug
                  )
              );

          setJournalEntries(
            reset ? data.journals : [...journalEntries, ...uniqueEntries]
          );
          setPage((prev) => (reset ? 2 : prev + 1));
          setHasMore(uniqueEntries.length > 0);
        }
      }
    } catch (error) {
      console.error("Error fetching journals:", error);
      setIsLoading(false);
      setIsSearching(false);
    }
  };

  // Fetch unique categories and tags for filters
  const fetchCategoriesAndTags = async () => {
    try {
      const response = await fetch("/api/journals/metadata");
      const data = await response.json();
      setCategories(data.categories || []);
      setTags(data.tags || []);
    } catch (error) {
      console.error("Error fetching metadata:", error);
      // Fallback to extracting from current entries if API fails
      const uniqueCategories = Array.from(
        new Set(journalEntries.map((entry) => entry.category))
      );
      const uniqueTags = Array.from(
        new Set(journalEntries.flatMap((entry) => entry.tags || []))
      );
      setCategories(uniqueCategories);
      setTags(uniqueTags);
    }
  };

  // Load more entries when scrolling
  const loadMoreEntries = () => {
    if (!isLoading) {
      fetchJournals();
    }
  };

  // Handle entry click
  const handleEntryClick = (slug: string) => {
    router.push(`/journals/${slug}`);
  };

  // Handle tag click
  const handleTagClick = (tag: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedTag(tag);
    setSearchQuery(""); // Clear search when selecting a tag
    setFilterChangeCounter((prev) => prev + 1);
  };

  // Apply category filter
  const applyCategory = (value: string | null) => {
    setSelectedCategory(value);
    setFilterChangeCounter((prev) => prev + 1);
  };

  // Apply tag filter
  const applyTag = (value: string | null) => {
    setSelectedTag(value);
    setFilterChangeCounter((prev) => prev + 1);
  };

  // Apply sort
  const applySort = (sortValue: string) => {
    const [newSortBy, newSortDirection] = sortValue.split("-") as [
      "date" | "title" | "wordCount",
      "asc" | "desc"
    ];
    setSortBy(newSortBy);
    setSortDirection(newSortDirection);
    setFilterChangeCounter((prev) => prev + 1);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    setFilterChangeCounter((prev) => prev + 1);
  };

  // Handle search button click
  const handleSearchClick = () => {
    setFilterChangeCounter((prev) => prev + 1);
    // Focus the search input after clicking the button
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Reset all filters and search
  const resetFilters = () => {
    // First update all filter states
    setSearchQuery("");
    setSelectedCategory(null);
    setSelectedTag(null);
    setSortBy("date");
    setSortDirection("desc");

    // Then force a complete reset of the data
    setJournalEntries([]);
    setPage(1);
    setHasMore(true);
    setTotalResults(null);

    // Trigger filter change to update results
    setFilterChangeCounter((prev) => prev + 1);

    // Immediately fetch journals with reset parameters
    setIsLoading(true);
    fetch("/api/journals?page=1&limit=12&sortBy=date&sortDirection=desc")
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);

        if (Array.isArray(data)) {
          setJournalEntries(data);
          setPage(2);
          setHasMore(data.length === 12);
        } else if (data.journals) {
          setJournalEntries(data.journals);
          setPage(2);
          setHasMore(data.journals.length === 12);
        }
      })
      .catch((error) => {
        console.error("Error resetting journals:", error);
        setIsLoading(false);
      });
  };

  // Loading animation component
  const LoadingAnimation = () => (
    <div className="flex justify-center my-12">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-stone-200 dark:border-stone-700 border-t-amber-400 dark:border-t-amber-600 animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles
            className="text-amber-500 dark:text-amber-400 animate-pulse"
            size={16}
          />
        </div>
      </div>
    </div>
  );

  // Empty state component
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="bg-stone-100 dark:bg-stone-800 rounded-full p-6 mb-4">
        <BookOpen className="text-amber-500 dark:text-amber-400 h-12 w-12" />
      </div>
      <h3 className="text-xl font-medium text-stone-800 dark:text-stone-200 mb-2">
        No journal entries found
      </h3>
      <p className="text-stone-600 dark:text-stone-400 text-center max-w-md mb-6">
        {searchQuery
          ? `No results found for "${searchQuery}"`
          : "Try adjusting your filters to find what you're looking for."}
      </p>
      <Button onClick={resetFilters} variant="outline">
        Clear all filters
      </Button>
    </div>
  );

  // Journal card component
  const JournalCard = ({
    entry,
    onClick,
  }: {
    entry: JournalFrontmatter;
    onClick: () => void;
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

  // CSS for the masonry grid
  const masonryGridStyles = {
    display: "grid",
    gridTemplateColumns: getGridColumns(),
    gap: "16px",
  };

  // Get search status message
  const getSearchStatusMessage = () => {
    if (isSearching) {
      return "Searching...";
    }

    if (totalResults !== null) {
      return `${totalResults} result${totalResults !== 1 ? "s" : ""} found${
        searchQuery ? ` for "${searchQuery}"` : ""
      }`;
    }

    if (journalEntries.length > 0) {
      return `${journalEntries.length}+ entries${
        searchQuery ? ` for "${searchQuery}"` : ""
      }`;
    }

    return null;
  };

  return (
    <main className="pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <section className="py-12 text-center">
          <h1 className="text-4xl lg:text-5xl font-light text-stone-800 dark:text-stone-100 mb-6">
            Journal Explorer
          </h1>
          <p className="text-xl text-stone-600 dark:text-stone-300 leading-relaxed max-w-3xl mx-auto">
            Browse and discover connections between thoughts, learnings, and
            reflections.
          </p>
        </section>

        {/* Filters and View Toggle */}
        <section className="sticky top-0 z-10 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md p-4 border-b border-stone-200 dark:border-stone-700 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* View Mode Toggle */}
            <Tabs
              value={viewMode}
              onValueChange={(value) =>
                setViewMode(value as "gallery" | "graph")
              }
              className="w-full md:w-auto"
            >
              <TabsList>
                <TabsTrigger
                  value="gallery"
                  className="flex items-center gap-2"
                >
                  <Grid size={16} />
                  Gallery
                </TabsTrigger>
                <TabsTrigger value="graph" className="flex items-center gap-2">
                  <Network size={16} />
                  Graph
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex flex-col md:flex-row gap-4 w-full">
              {/* Search Input */}
              <div className="relative w-full md:w-64">
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
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                <Select
                  value={selectedCategory || "all"}
                  onValueChange={(value) => {
                    applyCategory(value === "all" ? null : value);
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
                    applyTag(value === "all" ? null : value);
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
                    <SelectItem value="wordCount-desc">
                      Longest First
                    </SelectItem>
                    <SelectItem value="wordCount-asc">
                      Shortest First
                    </SelectItem>
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
          </div>
        </section>

        {/* Content Area */}
        <section className="py-4">
          <Tabs
            value={viewMode}
            onValueChange={(value) => setViewMode(value as "gallery" | "graph")}
          >
            <TabsContent value="gallery" className="mt-0">
              {isLoading && journalEntries.length === 0 ? (
                <LoadingAnimation />
              ) : journalEntries.length === 0 ? (
                <EmptyState />
              ) : (
                <>
                  {(searchQuery || selectedCategory || selectedTag) && (
                    <div className="mb-4 flex items-center">
                      <span className="text-sm text-stone-500 dark:text-stone-400 mr-2">
                        Active filters:
                      </span>
                      {searchQuery && (
                        <button
                          onClick={clearSearch}
                          className="inline-flex items-center px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded-full text-xs mr-2"
                        >
                          Search: {searchQuery}
                          <X size={12} className="ml-1" />
                        </button>
                      )}
                      {selectedCategory && (
                        <button
                          onClick={() => {
                            setSelectedCategory(null);
                            setFilterChangeCounter((prev) => prev + 1);
                          }}
                          className="inline-flex items-center px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded-full text-xs mr-2"
                        >
                          Category: {selectedCategory}
                          <X size={12} className="ml-1" />
                        </button>
                      )}
                      {selectedTag && (
                        <button
                          onClick={() => {
                            setSelectedTag(null);
                            setFilterChangeCounter((prev) => prev + 1);
                          }}
                          className="inline-flex items-center px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded-full text-xs mr-2"
                        >
                          Tag: {selectedTag}
                          <X size={12} className="ml-1" />
                        </button>
                      )}
                      {(searchQuery || selectedCategory || selectedTag) && (
                        <button
                          onClick={resetFilters}
                          className="text-xs text-stone-500 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 ml-2"
                        >
                          Clear all
                        </button>
                      )}
                    </div>
                  )}
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
                    <div
                      style={masonryGridStyles}
                      ref={masonryRef}
                      className="grid-container"
                    >
                      {journalEntries.map((entry, index) => (
                        <div
                          key={`${entry.slug}-${index}`}
                          className="grid-item"
                        >
                          <JournalCard
                            entry={entry}
                            onClick={() => handleEntryClick(entry.slug)}
                          />
                        </div>
                      ))}
                    </div>
                  </InfiniteScroll>
                </>
              )}
            </TabsContent>

            <TabsContent value="graph" className="mt-0">
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="bg-stone-100 dark:bg-stone-800 rounded-full p-6 mb-4">
                  <Network className="text-amber-500 dark:text-amber-400 h-12 w-12" />
                </div>
                <h3 className="text-xl font-medium text-stone-800 dark:text-stone-200 mb-2">
                  Knowledge Graph Coming Soon
                </h3>
                <p className="text-stone-600 dark:text-stone-400 text-center max-w-md mb-6">
                  The graph view is currently under development. It will
                  visualize connections between journal entries based on tags
                  and wiki-links.
                </p>
                <Button
                  onClick={() => setViewMode("gallery")}
                  variant="outline"
                >
                  Return to Gallery View
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </main>
  );
};

export default JournalExplorer;
