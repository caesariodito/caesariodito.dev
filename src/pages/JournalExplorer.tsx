"use client";

import { useState, useEffect, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid, Network } from "lucide-react";
import { JournalFrontmatter } from "@/lib/mdx";
import { useRouter } from "next/navigation";
import { useDebounce } from "../hooks/useDebounce";

// Import modular components
import JournalExplorerHeader from "@/components/journal-explorer/JournalExplorerHeader";
import JournalFilters from "@/components/journal-explorer/JournalFilters";
import GalleryView from "@/components/journal-explorer/GalleryView/GalleryView";
import GraphView from "@/components/journal-explorer/GraphView/GraphView";
import FilterBadges from "@/components/journal-explorer/common/FilterBadges";

const JournalExplorer = () => {
  // Shared state for both views
  const [journalEntries, setJournalEntries] = useState<JournalFrontmatter[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  // State for filtering and pagination
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"date" | "title" | "wordCount">("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filterChangeCounter, setFilterChangeCounter] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [totalResults, setTotalResults] = useState<number | null>(null);

  // Metadata for filters
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  // View mode toggle
  const [viewMode, setViewMode] = useState<"gallery" | "graph">("gallery");

  const router = useRouter();
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

      console.log("Fetching journals with params:", queryParams.toString());
      const response = await fetch(`/api/journals?${queryParams.toString()}`);
      const data = await response.json();
      console.log("Received journal data:", data);

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
          console.log(
            "Updated journal entries:",
            reset ? data : [...journalEntries, ...uniqueEntries]
          );
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
          console.log(
            "Updated journal entries:",
            reset ? data.journals : [...journalEntries, ...uniqueEntries]
          );
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
    console.log("Entry clicked:", slug);
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

  return (
    <main className="pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <JournalExplorerHeader />

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
                  <Grid size={16} /> Gallery
                </TabsTrigger>
                <TabsTrigger value="graph" className="flex items-center gap-2">
                  <Network size={16} /> Graph
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <JournalFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={applyCategory}
              selectedTag={selectedTag}
              setSelectedTag={applyTag}
              sortBy={sortBy}
              sortDirection={sortDirection}
              applySort={applySort}
              categories={categories}
              tags={tags}
              isSearching={isSearching}
              handleSearchClick={handleSearchClick}
              searchInputRef={searchInputRef}
              clearSearch={clearSearch}
            />
          </div>
        </section>

        {/* Active Filters Display */}
        {(searchQuery || selectedCategory || selectedTag) && (
          <FilterBadges
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            selectedTag={selectedTag}
            clearSearch={clearSearch}
            clearCategory={() => {
              setSelectedCategory(null);
              setFilterChangeCounter((prev) => prev + 1);
            }}
            clearTag={() => {
              setSelectedTag(null);
              setFilterChangeCounter((prev) => prev + 1);
            }}
            resetFilters={resetFilters}
          />
        )}

        {/* Content Area */}
        <section className="py-4">
          <Tabs
            value={viewMode}
            onValueChange={(value) => setViewMode(value as "gallery" | "graph")}
          >
            <TabsContent value="gallery" className="mt-0">
              <GalleryView
                journalEntries={journalEntries}
                isLoading={isLoading}
                hasMore={hasMore}
                loadMoreEntries={loadMoreEntries}
                handleEntryClick={handleEntryClick}
                handleTagClick={handleTagClick}
                searchQuery={searchQuery}
                resetFilters={resetFilters}
              />
            </TabsContent>

            <TabsContent value="graph" className="mt-0">
              <GraphView
                journalEntries={journalEntries}
                isLoading={isLoading}
                handleEntryClick={handleEntryClick}
                handleTagClick={handleTagClick}
                setViewMode={setViewMode}
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
                selectedTag={selectedTag}
              />
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </main>
  );
};

export default JournalExplorer;
