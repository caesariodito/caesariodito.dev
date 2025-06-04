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

// Add SVG container rect interface
interface SVGContainerRect {
  width: number;
  height: number;
  left: number;
  top: number;
  right: number;
  bottom: number;
}

interface NodePreviewProps {
  node: GraphNode | null;
  position: HoverPosition;
  svgContainerRect: SVGContainerRect;
  zoomLevel: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const NodePreview: React.FC<NodePreviewProps> = ({
  node,
  position,
  svgContainerRect,
  zoomLevel,
  onMouseEnter,
  onMouseLeave,
}) => {
  const previewRef = useRef<HTMLDivElement>(null);
  // adjustedPosition will store the final CSS top/left values
  const [adjustedPosition, setAdjustedPosition] = useState({
    x: -9999,
    y: -9999,
  }); // Initialize off-screen
  const [isHovered, setIsHovered] = useState(false);
  const positionRef = useRef(position);

  // Update position ref when position changes
  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  // Adjust position to keep tooltip within the visible canvas area
  useEffect(() => {
    if (!previewRef.current || !svgContainerRect) return;

    const previewRect = previewRef.current.getBoundingClientRect();
    const previewWidth = previewRect.width;
    const previewHeight = previewRect.height;

    // Get current node's center screen coordinates and radius
    const nodeScreenX = position.x;
    const nodeScreenY = position.y;
    const nodeRadius = position.nodeRadius || 30; // Default radius if not provided

    // Define vertical offset constants
    const baseVerticalOffset = 0; // Reduced to 0 to place tooltip directly on top of node
    const verticalOffset = Math.max(
      0,
      baseVerticalOffset / Math.sqrt(zoomLevel)
    ); // Min 0px padding

    // Position the tooltip centered horizontally above the node
    let targetViewportX = nodeScreenX - previewWidth / 2; // Center horizontally
    let targetViewportY =
      nodeScreenY -
      nodeRadius / Math.sqrt(zoomLevel) -
      previewHeight -
      verticalOffset; // Position directly on top of node

    // Use svgContainerRect directly for boundaries
    const containerLeft = svgContainerRect.left;
    const containerRight = svgContainerRect.right;
    const containerTop = svgContainerRect.top;
    const containerBottom = svgContainerRect.bottom;

    // Adjust horizontally to keep within container, after centering
    if (targetViewportX + previewWidth > containerRight - 5) {
      targetViewportX = containerRight - previewWidth - 5; // Shift left to fit
    } else if (targetViewportX < containerLeft + 5) {
      targetViewportX = containerLeft + 5; // Shift right to fit
    }

    // Adjust vertically to keep within container
    if (targetViewportY < containerTop + 5) {
      targetViewportY = containerTop + 5;
    }
    if (targetViewportY + previewHeight > containerBottom - 5) {
      targetViewportY = containerBottom - previewHeight - 5;
    }

    // Convert final target viewport coordinates to be relative to the offset parent
    // This is necessary because the Card is position: absolute
    let finalDivX = targetViewportX - containerLeft;
    let finalDivY = targetViewportY - containerTop;

    setAdjustedPosition({ x: finalDivX, y: finalDivY });
  }, [position, svgContainerRect, zoomLevel]); // Dependencies remain the same

  if (!node) return null;

  // Style with adjusted position and add opacity transition
  const style = {
    left: `${adjustedPosition.x}px`,
    top: `${adjustedPosition.y}px`,
    pointerEvents: "auto" as const,
    zIndex: 1000,
    maxWidth: "300px",
    opacity: adjustedPosition.x === -9999 ? 0 : 1, // Hide until properly positioned
    transition: "opacity 0.1s ease-out", // Smooth fade-in once positioned
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
