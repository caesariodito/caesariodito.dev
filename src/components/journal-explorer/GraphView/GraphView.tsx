import React, {
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
} from "react";
import { JournalFrontmatter } from "@/lib/mdx";
import { useTheme } from "next-themes";
import * as d3 from "d3";
import { GraphNode, GraphLink, GraphData } from "./types";
import GraphControls from "./GraphControls";
import NodePreview from "./NodePreview";
import LoadingAnimation from "../common/LoadingAnimation";
import { Network } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GraphViewProps {
  journalEntries: JournalFrontmatter[];
  isLoading: boolean;
  handleEntryClick: (slug: string) => void;
  handleTagClick: (tag: string, e: React.MouseEvent) => void;
  setViewMode: (mode: "gallery" | "graph") => void;
}

// Helper types for D3
type D3Node = GraphNode & {
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
  index?: number;
};

type D3Link = GraphLink & {
  index?: number;
  source: D3Node;
  target: D3Node;
};

// Define a type for the hover position, now including node radius
interface HoverPosition {
  x: number;
  y: number;
  nodeRadius?: number; // Optional: useful for offsetting from node edge
}

// Add SVG container rect type
interface SVGContainerRect {
  width: number;
  height: number;
  left: number;
  top: number;
  right: number;
  bottom: number;
}

// Add a type for the API response
interface GraphNodeResponse {
  id: string;
  type: string;
  label: string;
  slug: string;
  date: string;
  mood?: string;
  category?: string;
  wordCount: number;
  tags?: string[];
}

// Debounce function to prevent rapid state changes
function debounce<F extends (...args: unknown[]) => void>(
  func: F,
  wait: number
): (...args: Parameters<F>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (...args: Parameters<F>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

const GraphView: React.FC<GraphViewProps> = ({
  journalEntries,
  isLoading,
  handleEntryClick,
  handleTagClick,
  setViewMode,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  // Store zoom behavior in a ref to maintain it across renders
  const zoomBehaviorRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown>>();
  const [graphData, setGraphData] = useState<GraphData>({
    nodes: [],
    links: [],
  });
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [hoverPosition, setHoverPosition] = useState<HoverPosition>({
    x: 0,
    y: 0,
    nodeRadius: 0,
  });
  // Add SVG container rect state
  const [svgContainerRect, setSvgContainerRect] =
    useState<SVGContainerRect | null>(null);
  // Add a ref to track the current hovered node to prevent flickering
  const hoveredNodeRef = useRef<string | null>(null);
  // Add a timeout ref to manage debounced hover state
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Add a flag to track if mouse is over the preview
  const isMouseOverPreviewRef = useRef<boolean>(false);
  // Add refs to track current mouse position
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const { theme } = useTheme();
  const [simulationInitialized, setSimulationInitialized] = useState(false);
  const [containerDimensions, setContainerDimensions] = useState({
    width: 800,
    height: 600,
  });
  // Add a state to track when the SVG is mounted
  const [svgMounted, setSvgMounted] = useState(false);

  // Add a mouse move handler to track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Debounced version of setHoveredNode to prevent flickering
  // Reduced debounce time for more immediate appearance
  const debouncedSetHoveredNode = useCallback(
    debounce((node: GraphNode | null, position?: HoverPosition) => {
      setHoveredNode(node);
      if (position) setHoverPosition(position);
    }, 10), // Reduced from 100ms to 10ms for more immediate response
    []
  );

  // Function to clear hover state immediately
  const clearHoverState = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    hoveredNodeRef.current = null;
    setHoveredNode(null);
  }, []);

  // Function to safely set hover state with node proximity check
  const safeSetHoveredNode = useCallback(
    (node: GraphNode | null, position?: HoverPosition) => {
      // If we're already hovering this node, don't do anything
      if (node && hoveredNodeRef.current === node.id) return;

      // Clear any pending timeouts
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }

      // Set the currently hovered node ID in the ref
      hoveredNodeRef.current = node ? node.id : null;
      debouncedSetHoveredNode(node, position);
    },
    [debouncedSetHoveredNode]
  );

  // Add a callback ref to detect when SVG is mounted
  const svgCallback = useCallback((node: SVGSVGElement | null) => {
    if (node) {
      svgRef.current = node;
      setSvgMounted(true);

      // Update dimensions immediately when ref is available
      const width = node.clientWidth || 800;
      const height = node.clientHeight || 600;
      console.log("SVG mounted with dimensions:", width, height);
      setContainerDimensions({ width, height });

      // Get and store the SVG container's bounding rect
      const rect = node.getBoundingClientRect();
      setSvgContainerRect({
        width: rect.width,
        height: rect.height,
        left: rect.left,
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
      });

      // Prevent browser zoom on wheel events
      node.addEventListener(
        "wheel",
        (event) => {
          if (event.ctrlKey) {
            event.preventDefault();
          }
        },
        { passive: false }
      );

      // Track mouse position within the SVG
      node.addEventListener("mousemove", (event) => {
        mousePositionRef.current = { x: event.clientX, y: event.clientY };
      });
    }
  }, []);

  // Add console logs to debug the loading issue
  useEffect(() => {
    console.log("Journal entries:", journalEntries);
    console.log("Graph data nodes:", graphData.nodes);
    console.log("Simulation initialized:", simulationInitialized);
    console.log("SVG mounted:", svgMounted);
  }, [journalEntries, graphData, simulationInitialized, svgMounted]);

  // Initialize D3 force simulation
  useLayoutEffect(() => {
    console.log(
      "D3 init effect running, nodes:",
      graphData.nodes.length,
      "svgRef:",
      !!svgRef.current,
      "svgMounted:",
      svgMounted
    );

    // Only proceed if both SVG is mounted and we have graph data
    if (!svgRef.current || !svgMounted || graphData.nodes.length === 0) {
      console.log("Skipping D3 initialization - missing ref or no nodes");
      return;
    }

    try {
      const svg = d3.select(svgRef.current);
      const width = svgRef.current.clientWidth || 800;
      const height = svgRef.current.clientHeight || 600;
      console.log("SVG dimensions:", width, height);

      // Clear previous graph
      svg.selectAll("*").remove();

      // Create zoom behavior and store in ref
      const zoom = d3
        .zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.1, 4])
        .on("zoom", (event) => {
          g.attr("transform", event.transform);
          setZoomLevel(event.transform.k);

          // Clear hover state when zooming to prevent misplaced tooltips
          clearHoverState();
        })
        // Filter out events from the controls area
        .filter((event) => {
          // Don't process zoom events if they originated from controls
          const target = event.target as Element;
          const isFromControls = target.closest(".graph-controls");
          return !isFromControls && !event.ctrlKey && !event.button;
        });

      // Store zoom behavior in ref for later use
      zoomBehaviorRef.current = zoom;

      svg.call(zoom);

      // Create container group
      const g = svg.append("g");

      // Create simulation
      const simulation = d3
        .forceSimulation<D3Node>(graphData.nodes as D3Node[])
        .force(
          "link",
          d3
            .forceLink<D3Node, D3Link>(graphData.links as D3Link[])
            .id((d) => d.id)
            .distance((d) => {
              // Customize link distances based on type
              if (d.type === "tag") return 80;
              if (d.type === "category") return 120;
              return 100;
            })
            .strength((d) => d.strength || 0.3)
        )
        .force("charge", d3.forceManyBody().strength(-200))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force(
          "collide",
          d3.forceCollide<D3Node>().radius((d) => (d.radius || 30) + 2)
        );

      // Define drag handlers
      const handleDragStart = (
        event: d3.D3DragEvent<SVGGElement, D3Node, D3Node>
      ) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;

        // Clear hover state when dragging starts
        clearHoverState();
      };

      const handleDrag = (
        event: d3.D3DragEvent<SVGGElement, D3Node, D3Node>
      ) => {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      };

      const handleDragEnd = (
        event: d3.D3DragEvent<SVGGElement, D3Node, D3Node>
      ) => {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      };

      // Create links
      const link = g
        .append("g")
        .selectAll<SVGLineElement, D3Link>("line")
        .data(graphData.links as D3Link[])
        .enter()
        .append("line")
        .attr("stroke", (d) => {
          if (d.type === "tag") return theme === "dark" ? "#fbbf24" : "#d97706";
          if (d.type === "category")
            return theme === "dark" ? "#78716c" : "#a8a29e";
          return theme === "dark" ? "#57534e" : "#d6d3d1";
        })
        .attr("stroke-opacity", 0.6)
        .attr("stroke-width", (d) => {
          if (d.type === "tag") return 2;
          if (d.type === "category") return 3;
          return 1;
        });

      // Create nodes
      const node = g
        .append("g")
        .selectAll<SVGGElement, D3Node>("g")
        .data(graphData.nodes as D3Node[])
        .enter()
        .append("g")
        .attr("class", "node-group")
        // Set cursor style for the entire node group
        .style("cursor", "pointer")
        .call(
          d3
            .drag<SVGGElement, D3Node>()
            .on("start", handleDragStart)
            .on("drag", handleDrag)
            .on("end", handleDragEnd)
        )
        .on("click", (event, d) => {
          event.stopPropagation();
          setSelectedNode(d);

          if (d.type === "journal" && d.slug) {
            handleEntryClick(d.slug);
          } else if (d.type === "tag") {
            handleTagClick(d.label, event);
          }
        })
        .on("mouseover", (event, d) => {
          // Prevent mouseout/mouseover cycle by checking if we're already hovering this node
          if (hoveredNodeRef.current === d.id) return;

          // Cancel any pending hover clear operations
          if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
          }

          // Set the currently hovered node ID in the ref
          hoveredNodeRef.current = d.id;

          const calculatedPosition: HoverPosition = {
            x: 0,
            y: 0,
            nodeRadius: d.radius || 30,
          };

          if (svgRef.current && d.x !== undefined && d.y !== undefined) {
            const svgElement = svgRef.current;
            const svgRect = svgElement.getBoundingClientRect();
            const currentTransform = d3.zoomTransform(svgElement);

            // Apply D3 transform to node's graph coordinates
            const transformedX = currentTransform.applyX(d.x);
            const transformedY = currentTransform.applyY(d.y);

            // Calculate node's center position relative to the viewport
            calculatedPosition.x = svgRect.left + transformedX;
            calculatedPosition.y = svgRect.top + transformedY;
          } else {
            // Fallback to mouse cursor position if node coordinates are not available (should be rare)
            // Get the actual mouse position in client coordinates
            let clientX = 0;
            let clientY = 0;

            if (event.sourceEvent) {
              clientX = event.sourceEvent.clientX;
              clientY = event.sourceEvent.clientY;
            } else if ("clientX" in event && "clientY" in event) {
              clientX = (event as MouseEvent).clientX;
              clientY = (event as MouseEvent).clientY;
            } else {
              const evt = window.event as MouseEvent | undefined;
              clientX = evt?.clientX || 0;
              clientY = evt?.clientY || 0;
            }
            if (clientX === 0 && clientY === 0) {
              clientX = mousePositionRef.current.x;
              clientY = mousePositionRef.current.y;
            }
            calculatedPosition.x = clientX;
            calculatedPosition.y = clientY;
          }

          // Use the debounced setter to update hover state with new position
          debouncedSetHoveredNode(d, calculatedPosition);

          // Add hover class to the node for visual feedback
          d3.select(event.currentTarget).classed("node-hovered", true);
        })
        .on("mouseout", (event) => {
          // Don't clear hover state immediately if mouse is over the preview
          if (isMouseOverPreviewRef.current) return;

          // Use a longer timeout to prevent immediate clearing of hover state
          // This helps prevent flickering when the mouse moves between the node and its tooltip
          hoverTimeoutRef.current = setTimeout(() => {
            // Only clear if mouse is not over preview
            if (!isMouseOverPreviewRef.current) {
              hoveredNodeRef.current = null;
              setHoveredNode(null);
              d3.select(event.currentTarget).classed("node-hovered", false);
            }
          }, 200); // Increased from 100ms to 200ms for better stability
        });

      // Add circles to nodes
      node
        .append("circle")
        .attr("r", (d) => d.radius || 30)
        .attr("fill", (d) => {
          if (d.type === "journal")
            return theme === "dark" ? "#1c1917" : "#ffffff";
          if (d.type === "tag") return theme === "dark" ? "#854d0e" : "#fef3c7";
          if (d.type === "category")
            return theme === "dark" ? "#57534e" : "#e7e5e4";
          return theme === "dark" ? "#292524" : "#f5f5f4";
        })
        .attr("stroke", (d) => {
          if (d.type === "journal")
            return theme === "dark" ? "#fbbf24" : "#d97706";
          if (d.type === "tag") return theme === "dark" ? "#fbbf24" : "#d97706";
          if (d.type === "category")
            return theme === "dark" ? "#a8a29e" : "#78716c";
          return theme === "dark" ? "#57534e" : "#d6d3d1";
        })
        .attr("stroke-width", 2)
        // Ensure circle has pointer events
        .style("pointer-events", "all");

      // Add invisible larger hit area for better hover detection
      node
        .append("circle")
        .attr("r", (d) => (d.radius || 30) + 10)
        .attr("fill", "transparent")
        .style("pointer-events", "all");

      // Add labels to nodes
      node
        .append("text")
        .text((d) => {
          // Truncate long labels
          if (d.label.length > 15) {
            return d.label.substring(0, 12) + "...";
          }
          return d.label;
        })
        .attr("text-anchor", "middle")
        .attr("dy", (d) => (d.type === "journal" ? 4 : 4))
        .attr("font-size", (d) => (d.type === "journal" ? "12px" : "10px"))
        .attr("fill", theme === "dark" ? "#e7e5e4" : "#44403c")
        // Disable text selection and pointer events on text
        .style("pointer-events", "none")
        .style("user-select", "none")
        .style("cursor", "pointer");

      // Add mood emoji for journal nodes
      node
        .filter((d) => d.type === "journal" && Boolean(d.mood))
        .append("text")
        .text((d) => d.mood || "")
        .attr("text-anchor", "middle")
        .attr("dy", -15)
        .attr("font-size", "16px")
        // Disable text selection and pointer events on mood emoji
        .style("pointer-events", "none")
        .style("user-select", "none")
        .style("cursor", "pointer");

      // Update positions on simulation tick
      simulation.on("tick", () => {
        link
          .attr("x1", (d) => d.source.x ?? 0)
          .attr("y1", (d) => d.source.y ?? 0)
          .attr("x2", (d) => d.target.x ?? 0)
          .attr("y2", (d) => d.target.y ?? 0);

        node.attr("transform", (d) => `translate(${d.x ?? 0},${d.y ?? 0})`);
      });

      // Add simulation end event to center on clusters when stabilized
      simulation.on("end", () => {
        console.log("Simulation ended, centering on clusters");
        // Apply centering immediately after simulation ends
        centerGraphOnClusters(svg, zoom);
      });

      // Set initial zoom while simulation is running
      svg.call(
        zoom.transform,
        d3.zoomIdentity.translate(width / 2, height / 2).scale(0.8)
      );

      // Apply initial centering immediately for better UX
      // This will be refined when simulation ends
      setTimeout(() => {
        centerGraphOnClusters(svg, zoom);
      }, 100);

      // Add CSS for hover effects
      const style = document.createElement("style");
      style.textContent = `
        .node-hovered circle:first-child {
          stroke-width: 3px;
          stroke-opacity: 1;
        }
        /* Prevent text selection in the graph */
        .node-group text {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          pointer-events: none;
        }
        /* Ensure consistent cursor on nodes */
        .node-group {
          cursor: pointer;
        }
      `;
      document.head.appendChild(style);

      console.log("D3 simulation started successfully");
      setSimulationInitialized(true);

      // Cleanup
      return () => {
        console.log("Cleaning up D3 simulation");
        simulation.stop();
        document.head.removeChild(style);
        clearHoverState();
      };
    } catch (error) {
      console.error("Error initializing D3:", error);
    }
  }, [graphData, theme, svgMounted, clearHoverState]);

  // Zoom control functions
  const zoomIn = (e: React.MouseEvent | WheelEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.transition().call(zoomBehaviorRef.current.scaleBy, 1.3);
  };

  const zoomOut = (e: React.MouseEvent | WheelEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.transition().call(zoomBehaviorRef.current.scaleBy, 0.7);
  };

  const resetView = (e: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    const svg = d3.select(svgRef.current);

    // Center on the graph clusters instead of arbitrary center
    centerGraphOnClusters(svg, zoomBehaviorRef.current);
  };

  // New function to center the graph on clusters
  const centerGraphOnClusters = (
    svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
    zoom: d3.ZoomBehavior<Element, unknown>
  ) => {
    if (!svgRef.current || graphData.nodes.length === 0) return;

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    // Calculate bounding box of all nodes
    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;

    // Count nodes with valid positions
    let validNodeCount = 0;

    graphData.nodes.forEach((node: D3Node) => {
      // Type-safe access to x and y coordinates
      const nodeX = node.x !== undefined ? node.x : null;
      const nodeY = node.y !== undefined ? node.y : null;

      if (nodeX !== null && nodeY !== null) {
        minX = Math.min(minX, nodeX);
        minY = Math.min(minY, nodeY);
        maxX = Math.max(maxX, nodeX);
        maxY = Math.max(maxY, nodeY);
        validNodeCount++;
      }
    });

    // If we couldn't determine bounds (nodes don't have positions yet) or too few nodes have positions
    if (
      minX === Infinity ||
      minY === Infinity ||
      maxX === -Infinity ||
      maxY === -Infinity ||
      validNodeCount < graphData.nodes.length * 0.5 // At least half of nodes should have positions
    ) {
      console.log("Using default center, not enough valid node positions");
      // Fall back to default center
      svg
        .transition()
        .duration(750)
        .call(
          zoom.transform,
          d3.zoomIdentity.translate(width / 2, height / 2).scale(0.8)
        );
      return;
    }

    // Calculate center of the bounding box
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    // Calculate scale to fit the graph with some padding
    const boundWidth = Math.max(1, maxX - minX);
    const boundHeight = Math.max(1, maxY - minY);

    // Ensure we don't zoom too far in or out
    const scale = Math.min(
      Math.max(
        0.5, // minimum scale
        0.9 * Math.min(width / boundWidth, height / boundHeight)
      ),
      2.0 // maximum scale
    );

    console.log(
      `Centering graph: centerX=${centerX}, centerY=${centerY}, scale=${scale}`
    );

    // Apply transform to center on the cluster with a smooth transition
    svg
      .transition()
      .duration(750)
      .call(
        zoom.transform,
        d3.zoomIdentity
          .translate(width / 2 - centerX * scale, height / 2 - centerY * scale)
          .scale(scale)
      );
  };

  // Update the fetch graph data effect to always run when journalEntries change
  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        console.log("Fetching graph data from API...");
        const response = await fetch("/api/journals/graph");
        const data = await response.json();
        console.log("Received graph data from API:", data);

        if (data && data.nodes) {
          const nodes: GraphNode[] = [];
          const links: GraphLink[] = [];
          const tagNodes: Set<string> = new Set();
          const categoryNodes: Set<string> = new Set();

          // Process journal nodes
          data.nodes.forEach((entry: GraphNodeResponse) => {
            // Add journal node
            nodes.push({
              id: entry.id,
              type: "journal",
              label: entry.label,
              slug: entry.id,
              date: entry.date,
              mood: entry.mood,
              category: entry.category,
              wordCount: entry.wordCount,
              radius: Math.max(
                30,
                Math.min(50, (entry.wordCount / 1000) * 40 + 30)
              ),
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
                source: entry.id,
                target: `category-${entry.category}`,
                type: "category",
                strength: 0.5,
              });
            }

            // Process tags
            if (entry.tags && entry.tags.length > 0) {
              entry.tags.forEach((tag: string) => {
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
                  source: entry.id,
                  target: `tag-${tag}`,
                  type: "tag",
                  strength: 0.7,
                });
              });
            }
          });

          console.log("Processed graph data:", { nodes, links });
          setGraphData({ nodes, links });
        }
      } catch (error) {
        console.error("Error fetching graph data:", error);
      }
    };

    // Fetch graph data whenever journalEntries changes
    if (journalEntries.length > 0) {
      fetchGraphData();
    }
  }, [journalEntries]);

  // Add a useEffect to update dimensions and SVG container rect on window resize
  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current) {
        const width = svgRef.current.clientWidth || 800;
        const height = svgRef.current.clientHeight || 600;
        console.log("Updated SVG dimensions:", width, height);
        setContainerDimensions({ width, height });

        // Update SVG container rect on resize
        const rect = svgRef.current.getBoundingClientRect();
        setSvgContainerRect({
          width: rect.width,
          height: rect.height,
          left: rect.left,
          top: rect.top,
          right: rect.right,
          bottom: rect.bottom,
        });
      }
    };

    // Initial update
    updateDimensions();

    // Add resize listener
    window.addEventListener("resize", updateDimensions);

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  // Add a useEffect to handle wheel events globally for the SVG
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (!svgRef.current) return;

      // Check if the event is within the SVG element
      const svgElement = svgRef.current;
      const rect = svgElement.getBoundingClientRect();
      const isInside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (isInside) {
        // Handle pinch zoom or ctrl+wheel zoom
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault();
          if (event.deltaY < 0) {
            zoomIn(event);
          } else {
            zoomOut(event);
          }
        }
      }
    };

    // Add the wheel event listener to the window
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // Add a useEffect to handle preview hover state
  useEffect(() => {
    // Create custom event handlers for preview hover
    const handlePreviewMouseEnter = () => {
      // When mouse enters the preview, clear any pending timeouts to prevent hiding
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
      isMouseOverPreviewRef.current = true;
    };

    const handlePreviewMouseLeave = () => {
      isMouseOverPreviewRef.current = false;

      // When mouse leaves the preview, set a timeout to hide it
      // Only if we're not hovering over a node
      if (!hoveredNodeRef.current) {
        hoverTimeoutRef.current = setTimeout(() => {
          setHoveredNode(null);
        }, 200);
      }
    };

    // Add event listeners to document for custom events
    document.addEventListener("preview-mouseenter", handlePreviewMouseEnter);
    document.addEventListener("preview-mouseleave", handlePreviewMouseLeave);

    // Cleanup
    return () => {
      document.removeEventListener(
        "preview-mouseenter",
        handlePreviewMouseEnter
      );
      document.removeEventListener(
        "preview-mouseleave",
        handlePreviewMouseLeave
      );
    };
  }, []);

  // If entries are loading, show loading animation
  if (isLoading && journalEntries.length === 0) {
    return <LoadingAnimation />;
  }

  // If no entries found, show empty state
  if (journalEntries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="bg-stone-100 dark:bg-stone-800 rounded-full p-6 mb-4">
          <Network className="text-amber-500 dark:text-amber-400 h-12 w-12" />
        </div>
        <h3 className="text-xl font-medium text-stone-800 dark:text-stone-200 mb-2">
          No Journal Entries to Visualize
        </h3>
        <p className="text-stone-600 dark:text-stone-400 text-center max-w-md mb-6">
          There are no journal entries that match your current filters. Try
          adjusting your search or filters to see entries in the graph view.
        </p>
        <Button onClick={() => setViewMode("gallery")} variant="outline">
          Return to Gallery View
        </Button>
      </div>
    );
  }

  // If graph data is being processed or D3 is initializing, show loading message
  if (graphData.nodes.length > 0 && !simulationInitialized) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <LoadingAnimation />
        <p className="text-stone-600 dark:text-stone-400 mt-4">
          Initializing graph visualization...
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[calc(100vh-300px)] min-h-[500px] border border-stone-200 dark:border-stone-700 rounded-lg overflow-hidden">
      <svg
        ref={svgCallback}
        className="w-full h-full bg-white dark:bg-stone-900"
        width={containerDimensions.width}
        height={containerDimensions.height}
      />

      {/* Node preview on hover - only render when we have both hoveredNode and svgContainerRect */}
      {hoveredNode && svgContainerRect && (
        <NodePreview
          node={hoveredNode}
          position={hoverPosition}
          svgContainerRect={svgContainerRect}
          zoomLevel={zoomLevel}
          onMouseEnter={() => {
            // Dispatch custom event when mouse enters preview
            document.dispatchEvent(new Event("preview-mouseenter"));
          }}
          onMouseLeave={() => {
            // Dispatch custom event when mouse leaves preview
            document.dispatchEvent(new Event("preview-mouseleave"));
          }}
        />
      )}

      {/* Zoom controls */}
      <GraphControls
        zoomIn={zoomIn}
        zoomOut={zoomOut}
        resetView={resetView}
        zoomLevel={zoomLevel}
        setZoomLevel={(level) => {
          if (!svgRef.current || !zoomBehaviorRef.current) return;
          const svg = d3.select(svgRef.current);
          const currentTransform = d3.zoomTransform(
            svg.node() as SVGSVGElement
          );
          const newScale = level / currentTransform.k;
          svg.transition().call(zoomBehaviorRef.current.scaleBy, newScale);
        }}
      />
    </div>
  );
};

export default GraphView;
