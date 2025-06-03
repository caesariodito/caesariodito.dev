# Prompt for Creating a Journal Gallery View Page

## Overview

Create a new page called `JournalExplorer.tsx` in the `src/pages` directory that provides two view modes for exploring journal entries:

1. A gallery view (to be implemented first)
2. A graph view inspired by Obsidian (to be implemented later)

## Gallery View Requirements

### Core Functionality

- Create an infinite-scrollable grid layout for journal entries
- Implement a masonry-style layout similar to the reference image
- Add filtering and sorting options
- Include a view toggle between Gallery and Graph modes
- Ensure responsive design works on all screen sizes

### Data Integration

- Fetch journal entries from the existing API endpoint `/api/journals`
- Implement pagination with infinite scroll using a library like `react-infinite-scroll-component`
- Handle loading states with elegant animations

### UI Components

- Use the existing Card component for journal entries
- Create a toggle component for switching between Gallery and Graph views
- Add filter dropdowns for categories, tags, and date ranges
- Implement a search bar for finding specific entries

### Journal Entry Cards

Each card in the gallery should display:

- Entry title
- Date
- Mood emoji
- Category
- Tags
- A short excerpt
- Visual indicators for entry length or importance
- Hover effects that enhance the browsing experience

### Code Structure

```tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
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
} from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";

// Define the component structure with state management for:
// - Journal entries
// - Current view mode (gallery/graph)
// - Filtering options
// - Loading states
// - Pagination

// Implement the masonry layout with responsive grid
// Add infinite scroll functionality
// Create filter and sort controls
// Add view mode toggle
// Implement loading animations
```

### Styling Guidelines

- Use the existing color scheme (amber, stone) for consistency
- Implement a responsive grid layout (3-4 columns on desktop, 2 on tablet, 1 on mobile)
- Use CSS Grid or Flexbox for the masonry layout
- Add subtle animations for hover states and loading
- Ensure proper spacing between cards
- Use consistent typography from the existing design system

### Technical Considerations

- Implement virtualization for better performance with many entries
- Add proper error handling and empty states
- Ensure accessibility with proper ARIA attributes
- Optimize image loading with lazy loading
- Add keyboard navigation support
- Save view preferences in local storage

### Sample Card Layout

```tsx
<Card
  key={entry.slug}
  className="bg-white/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-300"
  onClick={() => handleEntryClick(entry.slug)}
>
  <div className="p-6">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center space-x-3">
        <span className="text-2xl">{entry.mood}</span>
        <div>
          <h3 className="text-lg font-medium text-stone-800 dark:text-stone-200">
            {entry.title}
          </h3>
          <div className="flex items-center space-x-4 text-sm text-stone-600 dark:text-stone-400">
            <span className="flex items-center">
              <Calendar size={14} className="mr-1" />
              {formatDate(entry.date)}
            </span>
            <span>•</span>
            <span className="text-amber-600 dark:text-amber-400">
              {entry.category}
            </span>
          </div>
        </div>
      </div>
    </div>

    <p className="text-stone-600 dark:text-stone-300 line-clamp-3">
      {entry.excerpt}
    </p>

    {/* Tags */}
    {entry.tags && entry.tags.length > 0 && (
      <div className="mt-4 flex flex-wrap gap-2">
        {entry.tags.map((tag, tagIndex) => (
          <span
            key={tagIndex}
            className="inline-flex items-center px-2 py-1 bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-full text-xs"
          >
            <Hash size={10} className="mr-1" />
            {tag}
          </span>
        ))}
      </div>
    )}
  </div>
</Card>
```

### Performance Optimization

- Implement windowing for large lists
- Add pagination with infinite scroll
- Optimize re-renders with memoization
- Use skeleton loaders during data fetching

## Implementation Details for Gallery View

### State Management

```tsx
// State for journal entries and pagination
const [journalEntries, setJournalEntries] = useState<JournalFrontmatter[]>([]);
const [page, setPage] = useState(1);
const [hasMore, setHasMore] = useState(true);
const [isLoading, setIsLoading] = useState(true);

// State for filtering and sorting
const [searchQuery, setSearchQuery] = useState("");
const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
const [selectedTag, setSelectedTag] = useState<string | null>(null);
const [sortBy, setSortBy] = useState<"date" | "title" | "wordCount">("date");
const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

// State for view mode
const [viewMode, setViewMode] = useState<"gallery" | "graph">("gallery");

// Unique categories and tags for filters
const [categories, setCategories] = useState<string[]>([]);
const [tags, setTags] = useState<string[]>([]);
```

### Data Fetching Logic

```tsx
// Initial data fetch
useEffect(() => {
  fetchJournals();
  fetchCategoriesAndTags();
}, []);

// Fetch journals with pagination and filters
const fetchJournals = async (reset = false) => {
  if (reset) {
    setPage(1);
    setJournalEntries([]);
  }

  const currentPage = reset ? 1 : page;
  setIsLoading(true);

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

    if (data.length === 0) {
      setHasMore(false);
    } else {
      setJournalEntries((prev) => (reset ? data : [...prev, ...data]));
      setPage((prev) => (reset ? 2 : prev + 1));
    }
  } catch (error) {
    console.error("Error fetching journals:", error);
  } finally {
    setIsLoading(false);
  }
};

// Fetch unique categories and tags for filters
const fetchCategoriesAndTags = async () => {
  try {
    const response = await fetch("/api/journals/metadata");
    const data = await response.json();
    setCategories(data.categories);
    setTags(data.tags);
  } catch (error) {
    console.error("Error fetching metadata:", error);
  }
};

// Load more entries when scrolling
const loadMoreEntries = () => {
  if (!isLoading) {
    fetchJournals();
  }
};
```

### Masonry Layout Implementation

```tsx
// CSS for the masonry grid
const masonryGridStyles = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gridAutoRows: "10px",
  gridGap: "16px",
};

// Calculate and set the height of each card
useEffect(() => {
  const resizeGridItems = () => {
    const gridItems = document.querySelectorAll(".masonry-item");
    gridItems.forEach((item: Element) => {
      const gridItem = item as HTMLElement;
      const rowHeight = 10;
      const rowSpan = Math.ceil(
        gridItem.getBoundingClientRect().height / rowHeight
      );
      gridItem.style.gridRowEnd = `span ${rowSpan}`;
    });
  };

  // Initial resize
  if (journalEntries.length > 0) {
    setTimeout(resizeGridItems, 200);
  }

  // Resize on window resize
  window.addEventListener("resize", resizeGridItems);
  return () => window.removeEventListener("resize", resizeGridItems);
}, [journalEntries]);
```

### Filter and Sort Controls

```tsx
<div className="sticky top-0 z-10 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md p-4 border-b border-stone-200 dark:border-stone-700 mb-8">
  <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
    {/* View Mode Toggle */}
    <Tabs
      value={viewMode}
      onValueChange={(value) => setViewMode(value as "gallery" | "graph")}
      className="w-full md:w-auto"
    >
      <TabsList>
        <TabsTrigger value="gallery" className="flex items-center gap-2">
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
          placeholder="Search journals..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchJournals(true)}
          className="pl-9"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2 w-full md:w-auto">
        <Select
          value={selectedCategory || ""}
          onValueChange={(value) => {
            setSelectedCategory(value || null);
            fetchJournals(true);
          }}
        >
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedTag || ""}
          onValueChange={(value) => {
            setSelectedTag(value || null);
            fetchJournals(true);
          }}
        >
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="Tag" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Tags</SelectItem>
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
            const [newSortBy, newSortDirection] = value.split("-") as [
              "date" | "title" | "wordCount",
              "asc" | "desc"
            ];
            setSortBy(newSortBy);
            setSortDirection(newSortDirection);
            fetchJournals(true);
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
      </div>
    </div>
  </div>
</div>
```

### Infinite Scroll Implementation

```tsx
<InfiniteScroll
  dataLength={journalEntries.length}
  next={loadMoreEntries}
  hasMore={hasMore}
  loader={<LoadingAnimation />}
  endMessage={
    <p className="text-center text-stone-500 dark:text-stone-400 my-8">
      You've seen all journal entries
    </p>
  }
>
  <div style={masonryGridStyles}>
    {journalEntries.map((entry, index) => (
      <div key={entry.slug} className="masonry-item">
        <JournalCard
          entry={entry}
          onClick={() => handleEntryClick(entry.slug)}
        />
      </div>
    ))}
  </div>
</InfiniteScroll>
```

### Enhanced Journal Card Component

```tsx
interface JournalCardProps {
  entry: JournalFrontmatter;
  onClick: () => void;
}

const JournalCard = ({ entry, onClick }: JournalCardProps) => {
  // Calculate card height based on content length for masonry layout
  const contentLength = entry.wordCount || 0;
  const heightClass =
    contentLength > 300
      ? "min-h-[350px]"
      : contentLength > 150
      ? "min-h-[280px]"
      : "min-h-[220px]";

  return (
    <Card
      className={`bg-white/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-300 cursor-pointer ${heightClass}`}
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
                className="inline-flex items-center px-1.5 py-0.5 bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-full text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTag(tag);
                  fetchJournals(true);
                }}
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
```

### Empty and Loading States

```tsx
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
      Try adjusting your filters or search query to find what you're looking
      for.
    </p>
    <Button
      onClick={() => {
        setSearchQuery("");
        setSelectedCategory(null);
        setSelectedTag(null);
        setSortBy("date");
        setSortDirection("desc");
        fetchJournals(true);
      }}
      variant="outline"
    >
      Clear all filters
    </Button>
  </div>
);
```

### Responsive Design Considerations

```tsx
// Responsive grid adjustments
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
    const gridElement = document.querySelector(".masonry-grid") as HTMLElement;
    if (gridElement) {
      gridElement.style.gridTemplateColumns = getGridColumns();
      resizeGridItems();
    }
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);
```

### Local Storage for User Preferences

```tsx
// Save and load user preferences
useEffect(() => {
  // Load preferences from local storage on mount
  const savedPreferences = localStorage.getItem("journalExplorerPreferences");
  if (savedPreferences) {
    const preferences = JSON.parse(savedPreferences);
    setViewMode(preferences.viewMode || "gallery");
    setSortBy(preferences.sortBy || "date");
    setSortDirection(preferences.sortDirection || "desc");
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
```

## API Requirements

To support the gallery view, you'll need to enhance your API endpoints:

### Enhanced `/api/journals` Endpoint

```typescript
// src/app/api/journals/route.ts
import { NextResponse } from "next/server";
import { getAllJournals, getJournalStats } from "@/lib/mdx";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Pagination
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const skip = (page - 1) * limit;

    // Filtering
    const query = searchParams.get("q")?.toLowerCase();
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");

    // Sorting
    const sortBy = searchParams.get("sortBy") || "date";
    const sortDirection = searchParams.get("sortDirection") || "desc";

    // Stats flag
    const includeStats = searchParams.get("stats") === "true";

    // Get all journals and apply filters
    let journals = getAllJournals();

    // Apply filters
    if (query) {
      journals = journals.filter(
        (journal) =>
          journal.title.toLowerCase().includes(query) ||
          journal.excerpt.toLowerCase().includes(query) ||
          journal.content?.toLowerCase().includes(query)
      );
    }

    if (category) {
      journals = journals.filter(
        (journal) => journal.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (tag) {
      journals = journals.filter((journal) =>
        journal.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
      );
    }

    // Apply sorting
    journals.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "wordCount":
          comparison = (a.wordCount || 0) - (b.wordCount || 0);
          break;
        case "date":
        default:
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });

    // Apply pagination
    const paginatedJournals = journals.slice(skip, skip + limit);

    if (includeStats) {
      const stats = getJournalStats();
      return NextResponse.json({
        journals: paginatedJournals,
        stats,
        total: journals.length,
        page,
        limit,
      });
    }

    return NextResponse.json(paginatedJournals);
  } catch (error) {
    console.error("Error fetching journals:", error);
    return NextResponse.json(
      { error: "Failed to load journals" },
      { status: 500 }
    );
  }
}
```

### New `/api/journals/metadata` Endpoint

```typescript
// src/app/api/journals/metadata/route.ts
import { NextResponse } from "next/server";
import { getAllJournals } from "@/lib/mdx";

export async function GET() {
  try {
    const journals = getAllJournals();

    // Extract unique categories
    const categories = [
      ...new Set(journals.map((journal) => journal.category)),
    ];

    // Extract unique tags
    const tagsSet = new Set<string>();
    journals.forEach((journal) => {
      journal.tags.forEach((tag) => tagsSet.add(tag));
    });
    const tags = Array.from(tagsSet);

    return NextResponse.json({
      categories,
      tags,
    });
  } catch (error) {
    console.error("Error fetching journal metadata:", error);
    return NextResponse.json(
      { error: "Failed to load journal metadata" },
      { status: 500 }
    );
  }
}
```

## Future Graph View Requirements (for reference)

- Create a force-directed graph visualization inspired by Obsidian
- Show connections between journal entries based on tags and wiki-links
- Allow interactive exploration of the knowledge graph
- Implement zoom and pan functionality
- Add node selection and highlighting
- Show preview of entries on node hover
