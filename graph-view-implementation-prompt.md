# Prompt for Implementing Journal Graph View and Code Modularization

## Overview

This prompt focuses on two main objectives:

1. **Code Modularization** - Refactoring the existing `JournalExplorer.tsx` to have a more maintainable structure with separate components
2. **Graph View Implementation** - Creating the Obsidian-inspired graph visualization for journal entries

## Part 1: Code Modularization

Before implementing the Graph View, let's refactor the current code to be more modular. The current `JournalExplorer.tsx` file should be restructured into:

### Component Structure

```
src/
├── pages/
│   └── JournalExplorer.tsx (main container)
└── components/
    └── journal-explorer/
        ├── JournalExplorerHeader.tsx
        ├── JournalFilters.tsx
        ├── GalleryView/
        │   ├── GalleryView.tsx (main gallery component)
        │   ├── JournalCard.tsx
        │   └── MasonryGrid.tsx
        ├── GraphView/
        │   ├── GraphView.tsx (main graph component)
        │   ├── GraphNode.tsx
        │   ├── GraphEdge.tsx
        │   └── GraphControls.tsx
        └── common/
            ├── LoadingAnimation.tsx
            ├── EmptyState.tsx
            └── FilterBadges.tsx
```

### Main JournalExplorer Component

`JournalExplorer.tsx` should be refactored to:

1. Handle state management for both views
2. Provide data fetching functions as props/context
3. Implement view toggling
4. Render the appropriate view component based on the selected mode

### Example Refactored Structure

```tsx
"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid, Network } from "lucide-react";
import { JournalFrontmatter } from "@/lib/mdx";
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

  // Metadata for filters
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  // View mode toggle
  const [viewMode, setViewMode] = useState<"gallery" | "graph">("gallery");

  // Data fetching functions and filter handlers
  // ... [keep existing functions]

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
              />
            </TabsContent>

            <TabsContent value="graph" className="mt-0">
              <GraphView
                journalEntries={journalEntries}
                isLoading={isLoading}
                handleEntryClick={handleEntryClick}
                handleTagClick={handleTagClick}
                setViewMode={setViewMode}
              />
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </main>
  );
};

export default JournalExplorer;
```

## Part 2: Graph View Implementation

Now that we have a modular structure, let's focus on implementing the GraphView component.

### Graph View Requirements

The graph view should:

1. Create a force-directed graph visualization of journal entries
2. Show connections between entries based on shared tags and wiki-links
3. Allow interactive exploration with zoom, pan, and node selection
4. Display preview of journal content on node hover
5. Support filtering and highlighting of connections
6. Provide intuitive navigation between related entries

### GraphView Component Structure

```tsx
// src/components/journal-explorer/GraphView/GraphView.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { JournalFrontmatter } from "@/lib/mdx";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Network, ZoomIn, ZoomOut, Maximize, RotateCcw } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import * as d3 from "d3";
import GraphNode from "./GraphNode";
import GraphEdge from "./GraphEdge";
import GraphControls from "./GraphControls";

interface GraphViewProps {
  journalEntries: JournalFrontmatter[];
  isLoading: boolean;
  handleEntryClick: (slug: string) => void;
  handleTagClick: (tag: string, e: React.MouseEvent) => void;
  setViewMode: (mode: "gallery" | "graph") => void;
}

// Define graph data structure
interface GraphNode {
  id: string;
  type: "journal" | "tag" | "category";
  label: string;
  slug?: string;
  date?: string;
  mood?: string;
  category?: string;
  wordCount?: number;
  radius?: number;
  x?: number;
  y?: number;
}

interface GraphLink {
  source: string;
  target: string;
  type: "tag" | "category" | "wikilink";
  strength?: number;
}

const GraphView = ({
  journalEntries,
  isLoading,
  handleEntryClick,
  handleTagClick,
  setViewMode,
}: GraphViewProps) => {
  // Implement graph rendering logic using D3 force simulation
  // ...
};

export default GraphView;
```

### D3 Integration for Force-Directed Graph

The graph should be implemented using D3.js for the force-directed layout:

```tsx
// Inside GraphView component

const svgRef = useRef<SVGSVGElement>(null);
const [graphData, setGraphData] = useState<{
  nodes: GraphNode[];
  links: GraphLink[];
}>({ nodes: [], links: [] });
const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
const [zoomLevel, setZoomLevel] = useState(1);
const { theme } = useTheme();

// Transform journal entries into graph data
useEffect(() => {
  if (journalEntries.length === 0) return;

  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];
  const tagNodes: Set<string> = new Set();
  const categoryNodes: Set<string> = new Set();

  // Add journal nodes
  journalEntries.forEach((entry) => {
    // Add journal node
    nodes.push({
      id: entry.slug,
      type: "journal",
      label: entry.title,
      slug: entry.slug,
      date: entry.date,
      mood: entry.mood,
      category: entry.category,
      wordCount: entry.wordCount,
      radius: Math.max(30, Math.min(50, (entry.wordCount / 1000) * 40 + 30)),
    });

    // Add category if it doesn't exist
    if (entry.category && !categoryNodes.has(entry.category)) {
      categoryNodes.add(entry.category);
      nodes.push({
        id: `category-${entry.category}`,
        type: "category",
        label: entry.category,
        radius: 25,
      });
    }

    // Connect journal to its category
    if (entry.category) {
      links.push({
        source: entry.slug,
        target: `category-${entry.category}`,
        type: "category",
        strength: 0.5,
      });
    }

    // Process tags
    if (entry.tags && entry.tags.length > 0) {
      entry.tags.forEach((tag) => {
        // Add tag node if it doesn't exist
        if (!tagNodes.has(tag)) {
          tagNodes.add(tag);
          nodes.push({
            id: `tag-${tag}`,
            type: "tag",
            label: tag,
            radius: 15,
          });
        }

        // Connect journal to tag
        links.push({
          source: entry.slug,
          target: `tag-${tag}`,
          type: "tag",
          strength: 0.7,
        });
      });
    }

    // Process wiki-links (extract from content if available)
    // This would require parsing the content for [[wiki-links]]
    // ...
  });

  setGraphData({ nodes, links });
}, [journalEntries]);

// Initialize D3 force simulation
useEffect(() => {
  if (!svgRef.current || graphData.nodes.length === 0) return;

  const svg = d3.select(svgRef.current);
  const width = svgRef.current.clientWidth;
  const height = svgRef.current.clientHeight;

  // Clear previous graph
  svg.selectAll("*").remove();

  // Create zoom behavior
  const zoom = d3
    .zoom()
    .scaleExtent([0.1, 4])
    .on("zoom", (event) => {
      g.attr("transform", event.transform);
      setZoomLevel(event.transform.k);
    });

  svg.call(zoom as any);

  // Create container group
  const g = svg.append("g");

  // Create simulation
  const simulation = d3
    .forceSimulation(graphData.nodes as any)
    .force(
      "link",
      d3
        .forceLink(graphData.links)
        .id((d: any) => d.id)
        .distance((d: any) => {
          // Customize link distances based on type
          if (d.type === "tag") return 80;
          if (d.type === "category") return 120;
          return 100;
        })
        .strength((d: any) => d.strength || 0.3)
    )
    .force("charge", d3.forceManyBody().strength(-200))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force(
      "collide",
      d3.forceCollide().radius((d: any) => (d.radius || 30) + 2)
    );

  // Create links
  const link = g
    .append("g")
    .selectAll("line")
    .data(graphData.links)
    .enter()
    .append("line")
    .attr("stroke", (d: any) => {
      if (d.type === "tag") return theme === "dark" ? "#fbbf24" : "#d97706";
      if (d.type === "category")
        return theme === "dark" ? "#78716c" : "#a8a29e";
      return theme === "dark" ? "#57534e" : "#d6d3d1";
    })
    .attr("stroke-opacity", 0.6)
    .attr("stroke-width", (d: any) => {
      if (d.type === "tag") return 2;
      if (d.type === "category") return 3;
      return 1;
    });

  // Create nodes
  const node = g
    .append("g")
    .selectAll("g")
    .data(graphData.nodes)
    .enter()
    .append("g")
    .call(
      d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    )
    .on("click", (event, d: any) => {
      event.stopPropagation();
      setSelectedNode(d);

      if (d.type === "journal" && d.slug) {
        handleEntryClick(d.slug);
      } else if (d.type === "tag") {
        handleTagClick(d.label, event);
      }
    })
    .on("mouseover", (event, d: any) => {
      setHoveredNode(d);
    })
    .on("mouseout", () => {
      setHoveredNode(null);
    });

  // Add circles to nodes
  node
    .append("circle")
    .attr("r", (d: any) => d.radius || 30)
    .attr("fill", (d: any) => {
      if (d.type === "journal") return theme === "dark" ? "#1c1917" : "#ffffff";
      if (d.type === "tag") return theme === "dark" ? "#854d0e" : "#fef3c7";
      if (d.type === "category")
        return theme === "dark" ? "#57534e" : "#e7e5e4";
      return theme === "dark" ? "#292524" : "#f5f5f4";
    })
    .attr("stroke", (d: any) => {
      if (d.type === "journal") return theme === "dark" ? "#fbbf24" : "#d97706";
      if (d.type === "tag") return theme === "dark" ? "#fbbf24" : "#d97706";
      if (d.type === "category")
        return theme === "dark" ? "#a8a29e" : "#78716c";
      return theme === "dark" ? "#57534e" : "#d6d3d1";
    })
    .attr("stroke-width", 2);

  // Add labels to nodes
  node
    .append("text")
    .text((d: any) => {
      // Truncate long labels
      if (d.label.length > 15) {
        return d.label.substring(0, 12) + "...";
      }
      return d.label;
    })
    .attr("text-anchor", "middle")
    .attr("dy", (d: any) => (d.type === "journal" ? 4 : 4))
    .attr("font-size", (d: any) => (d.type === "journal" ? "12px" : "10px"))
    .attr("fill", theme === "dark" ? "#e7e5e4" : "#44403c");

  // Add mood emoji for journal nodes
  node
    .filter((d: any) => d.type === "journal" && d.mood)
    .append("text")
    .text((d: any) => d.mood)
    .attr("text-anchor", "middle")
    .attr("dy", -15)
    .attr("font-size", "16px");

  // Update positions on simulation tick
  simulation.on("tick", () => {
    link
      .attr("x1", (d: any) => d.source.x)
      .attr("y1", (d: any) => d.source.y)
      .attr("x2", (d: any) => d.target.x)
      .attr("y2", (d: any) => d.target.y);

    node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
  });

  // Drag functions
  function dragstarted(event: any) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }

  function dragged(event: any) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }

  function dragended(event: any) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }

  // Cleanup
  return () => {
    simulation.stop();
  };
}, [graphData, theme]);

// Rest of component implementation...
```

### Graph Controls Component

```tsx
// src/components/journal-explorer/GraphView/GraphControls.tsx

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ZoomIn, ZoomOut, Maximize, RotateCcw } from "lucide-react";

interface GraphControlsProps {
  zoomIn: () => void;
  zoomOut: () => void;
  resetView: () => void;
  zoomLevel: number;
  setZoomLevel: (level: number) => void;
}

const GraphControls = ({
  zoomIn,
  zoomOut,
  resetView,
  zoomLevel,
  setZoomLevel,
}: GraphControlsProps) => {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 dark:bg-stone-800/90 rounded-lg shadow-md p-2 flex items-center gap-2">
      <Button variant="ghost" size="sm" onClick={zoomOut}>
        <ZoomOut size={16} />
      </Button>

      <Slider
        value={[zoomLevel * 100]}
        min={10}
        max={400}
        step={10}
        className="w-32"
        onValueChange={(value) => setZoomLevel(value[0] / 100)}
      />

      <Button variant="ghost" size="sm" onClick={zoomIn}>
        <ZoomIn size={16} />
      </Button>

      <div className="w-px h-6 bg-stone-200 dark:bg-stone-700 mx-1" />

      <Button variant="ghost" size="sm" onClick={resetView}>
        <RotateCcw size={16} />
      </Button>
    </div>
  );
};

export default GraphControls;
```

### Node Preview Component

```tsx
// src/components/journal-explorer/GraphView/NodePreview.tsx

import { formatDate } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Calendar, Hash } from "lucide-react";

interface NodePreviewProps {
  node: any;
  position: { x: number; y: number };
}

const NodePreview = ({ node, position }: NodePreviewProps) => {
  if (!node) return null;

  // Position the preview card to avoid going out of viewport
  const style = {
    left: `${position.x}px`,
    top: `${position.y + 20}px`,
  };

  if (node.type === "journal") {
    return (
      <Card
        className="absolute z-50 w-64 bg-white/95 dark:bg-stone-800/95 shadow-lg p-4"
        style={style}
      >
        <div className="flex items-start gap-2 mb-2">
          <span className="text-xl">{node.mood}</span>
          <div>
            <h4 className="font-medium">{node.label}</h4>
            <div className="text-xs text-stone-500 dark:text-stone-400 flex items-center">
              <Calendar size={10} className="mr-1" />
              {formatDate(node.date)}
              {node.category && (
                <span className="ml-2 text-amber-600 dark:text-amber-400">
                  {node.category}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="text-xs bg-stone-100 dark:bg-stone-700/50 p-2 rounded">
          Click to view journal entry
        </div>
      </Card>
    );
  }

  if (node.type === "tag") {
    return (
      <Card
        className="absolute z-50 bg-white/95 dark:bg-stone-800/95 shadow-lg p-3"
        style={style}
      >
        <div className="flex items-center">
          <Hash size={12} className="mr-1 text-amber-500" />
          <span className="font-medium">{node.label}</span>
        </div>
        <div className="text-xs mt-1">Click to filter by this tag</div>
      </Card>
    );
  }

  if (node.type === "category") {
    return (
      <Card
        className="absolute z-50 bg-white/95 dark:bg-stone-800/95 shadow-lg p-3"
        style={style}
      >
        <div className="font-medium">{node.label}</div>
        <div className="text-xs mt-1">Category grouping</div>
      </Card>
    );
  }

  return null;
};

export default NodePreview;
```

### API Enhancement for Graph Data

Add a new API endpoint to efficiently fetch graph data:

```typescript
// src/app/api/journals/graph/route.ts
import { NextResponse } from "next/server";
import { getAllJournals } from "@/lib/mdx";

export async function GET() {
  try {
    const journals = getAllJournals();

    // Extract wiki links from content
    // This would require parsing content for [[wiki-links]]
    const wikiLinks = [];
    // ...

    // Return graph data
    return NextResponse.json({
      nodes: journals.map((journal) => ({
        id: journal.slug,
        type: "journal",
        label: journal.title,
        date: journal.date,
        mood: journal.mood,
        category: journal.category,
        wordCount: journal.wordCount,
        tags: journal.tags,
      })),
      // Include extracted wikiLinks
      wikiLinks,
    });
  } catch (error) {
    console.error("Error fetching graph data:", error);
    return NextResponse.json(
      { error: "Failed to load graph data" },
      { status: 500 }
    );
  }
}
```

## Implementation Details

### 1. Force-Directed Graph

The graph visualization uses D3's force-directed layout to position nodes dynamically:

- Journal entries are represented as larger nodes
- Tags are represented as smaller nodes
- Categories form intermediate-sized nodes
- Connections (edges) between nodes show relationships

### 2. Node Types and Relationships

Three types of relationships should be visualized:

1. **Journal ↔ Tag**: When a journal entry has a specific tag
2. **Journal ↔ Category**: When a journal entry belongs to a category
3. **Journal ↔ Journal**: When journals are connected via wiki-links

### 3. Interactive Features

The graph view should support:

- **Zoom and Pan**: Allow users to navigate the knowledge graph
- **Node Selection**: Clicking a node should highlight its connections
- **Hover Previews**: Show brief details about nodes on hover
- **Draggable Nodes**: Allow users to rearrange the graph
- **Physics Simulation**: Nodes should repel/attract based on relationships
- **Filters**: Allow filtering the graph by tag, category, or date range

### 4. Visual Design

The graph should follow the existing design system:

- Use the amber/stone color scheme
- Dark/light mode compatibility
- Visual distinction between node types
- Appropriate sizing based on entry importance (e.g., word count)

### 5. Technical Implementation

Key technical aspects include:

- Using D3.js for the force simulation and graph rendering
- Optimizing performance for large graphs using techniques like:
  - Canvas rendering for large graphs (fallback from SVG)
  - Node clustering for dense areas
  - On-demand loading of distant connections
- Proper cleanup to prevent memory leaks

### 6. Empty and Loading States

Create appropriate loading and empty states for the graph view:

- Skeleton loading animation during data fetch
- Empty state with helpful message when no entries match filters
- Initial state that guides users on how to interact with the graph

## Getting Started

To implement this functionality:

1. First refactor the existing code to follow the modular structure
2. Install D3.js as a dependency
3. Create the basic GraphView component
4. Implement the force-directed simulation
5. Add interactivity and controls
6. Style the graph following the design system
7. Optimize performance for larger journal collections

## Technical Requirements

- Add D3.js to the project: `npm install d3 @types/d3`
- Ensure SVG rendering works correctly in Next.js
- Test with various dataset sizes to ensure performance
  </rewritten_file>
