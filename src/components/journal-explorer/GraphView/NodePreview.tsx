import React, { useEffect, useRef, useState } from "react";
import { formatDate } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Calendar, Hash } from "lucide-react";
import type { GraphNode } from "@/components/journal-explorer/GraphView/types";

// Updated position prop type to match GraphView.tsx
interface HoverPosition {
  x: number;
  y: number;
  nodeRadius?: number;
}

interface NodePreviewProps {
  node: GraphNode | null;
  position: HoverPosition; // Use the updated HoverPosition type
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const NodePreview: React.FC<NodePreviewProps> = ({
  node,
  position,
  onMouseEnter,
  onMouseLeave,
}) => {
  const previewRef = useRef<HTMLDivElement>(null);
  // adjustedPosition will store the final CSS top/left values
  const [adjustedPosition, setAdjustedPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const positionRef = useRef(position);
  // Store container dimensions to handle positioning
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0,
    left: 0,
    top: 0,
  });

  // Update position ref when position changes
  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  // Get the SVG container dimensions
  useEffect(() => {
    // Find the SVG container element - use a more reliable selector
    // Look for the SVG element inside the graph container
    const svgElement = document.querySelector("svg");
    if (svgElement) {
      // Get the parent container of the SVG
      const svgContainer = svgElement.closest("div");
      if (svgContainer) {
        const rect = svgContainer.getBoundingClientRect();
        setContainerDimensions({
          width: rect.width,
          height: rect.height,
          left: rect.left,
          top: rect.top,
        });
      }
    }
  }, []);

  // Adjust position to keep tooltip within the visible canvas area
  useEffect(() => {
    if (!previewRef.current) return;

    const previewRect = previewRef.current.getBoundingClientRect();
    const previewWidth = previewRect.width;
    const previewHeight = previewRect.height;

    // Get current node's center screen coordinates and radius
    const nodeScreenX = position.x;
    const nodeScreenY = position.y;
    const nodeRadius = position.nodeRadius || 30; // Default radius if not provided

    // Position the tooltip to the right of the node, vertically centered
    const horizontalOffset = 15; // Space between node edge and tooltip
    let targetViewportX = nodeScreenX + nodeRadius + horizontalOffset;
    let targetViewportY = nodeScreenY - previewHeight / 2; // Vertically center relative to node center

    // Check if the SVG container dimensions are available
    if (containerDimensions.width > 0) {
      // Get the boundaries of the SVG container (in viewport coordinates)
      const containerLeft = containerDimensions.left;
      const containerRight = containerLeft + containerDimensions.width;
      const containerTop = containerDimensions.top;
      const containerBottom = containerTop + containerDimensions.height;

      // Adjust horizontally if needed to keep within container
      if (targetViewportX + previewWidth > containerRight - 5) {
        // If it would go outside the right edge, place it to the left of the node
        targetViewportX =
          nodeScreenX - nodeRadius - previewWidth - horizontalOffset;
      }
      // Ensure it doesn't go outside the left edge of the container
      if (targetViewportX < containerLeft + 5) {
        targetViewportX = containerLeft + 5;
      }

      // Adjust vertically to keep within container
      if (targetViewportY + previewHeight > containerBottom - 5) {
        targetViewportY = containerBottom - previewHeight - 5;
      }
      if (targetViewportY < containerTop + 5) {
        targetViewportY = containerTop + 5;
      }
    } else {
      // Fallback if container dimensions aren't available: use viewport dimensions
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Adjust horizontally if needed within viewport
      if (targetViewportX + previewWidth > viewportWidth - 5) {
        targetViewportX =
          nodeScreenX - nodeRadius - previewWidth - horizontalOffset;
      }
      if (targetViewportX < 5) {
        // Prevent going off left edge of viewport
        targetViewportX = 5;
      }

      // Adjust vertically to keep within viewport
      if (targetViewportY + previewHeight > viewportHeight - 5) {
        targetViewportY = viewportHeight - previewHeight - 5;
      }
      if (targetViewportY < 5) {
        // Prevent going off top edge of viewport
        targetViewportY = 5;
      }
    }

    // Convert final target viewport coordinates to be relative to the offset parent.
    // This is necessary because the Card is position: absolute.
    let finalDivX = targetViewportX;
    let finalDivY = targetViewportY;

    if (containerDimensions.width > 0) {
      // Ensure container dimensions are loaded
      finalDivX -= containerDimensions.left;
      finalDivY -= containerDimensions.top;
    }
    // If containerDimensions are not yet ready, finalDivX/Y will be raw viewport coordinates.
    // This might cause a brief mispositioning until containerDimensions are available and this effect re-runs.

    setAdjustedPosition({ x: finalDivX, y: finalDivY });
  }, [position, containerDimensions]); // Effect dependencies

  if (!node) return null;

  // Style with adjusted position
  const style = {
    left: `${adjustedPosition.x}px`,
    top: `${adjustedPosition.y}px`,
    pointerEvents: "auto" as const, // Allow pointer events so we can hover the preview
    zIndex: 1000,
    // transition: "left 0.1s ease-out, top 0.1s ease-out", // Removed for immediate placement
    maxWidth: "300px", // Add a max-width to prevent very wide tooltips
  };

  // Handle mouse events with improved event handling
  const handleMouseEnter = (e: React.MouseEvent) => {
    // Stop propagation to prevent interference with other events
    e.stopPropagation();
    setIsHovered(true);
    if (onMouseEnter) onMouseEnter();
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    // Stop propagation to prevent interference with other events
    e.stopPropagation();
    setIsHovered(false);
    if (onMouseLeave) onMouseLeave();
  };

  // Common props for all card types
  const commonCardProps = {
    ref: previewRef,
    style,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };

  if (node.type === "journal") {
    return (
      <Card
        {...commonCardProps}
        className="absolute z-50 w-64 bg-white/95 dark:bg-stone-800/95 shadow-lg p-4 preview-card"
      >
        <div className="flex items-start gap-2 mb-2">
          <span className="text-xl">{node.mood}</span>
          <div>
            <h4 className="font-medium">{node.label}</h4>
            <div className="text-xs text-stone-500 dark:text-stone-400 flex items-center">
              <Calendar size={10} className="mr-1" />
              {node.date ? formatDate(node.date) : ""}
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
        {...commonCardProps}
        className="absolute z-50 bg-white/95 dark:bg-stone-800/95 shadow-lg p-3 preview-card"
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
        {...commonCardProps}
        className="absolute z-50 bg-white/95 dark:bg-stone-800/95 shadow-lg p-3 preview-card"
      >
        <div className="font-medium">{node.label}</div>
        <div className="text-xs mt-1">Category grouping</div>
      </Card>
    );
  }

  return null;
};

export default NodePreview;
