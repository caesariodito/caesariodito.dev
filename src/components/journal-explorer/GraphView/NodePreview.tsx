import React, { useEffect, useRef, useState } from "react";
import { formatDate } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Calendar, Hash } from "lucide-react";
import type { GraphNode } from "@/components/journal-explorer/GraphView/types";

interface NodePreviewProps {
  node: GraphNode | null;
  position: { x: number; y: number };
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
  const [adjustedPosition, setAdjustedPosition] = useState(position);
  const [isHovered, setIsHovered] = useState(false);
  const positionRef = useRef(position);

  // Update position ref when position changes
  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  // Adjust position to avoid going out of viewport and prevent overlap with node
  useEffect(() => {
    if (!previewRef.current) return;

    const previewRect = previewRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Calculate adjusted position
    let adjustedX = position.x;
    let adjustedY = position.y + 20; // Default offset below the node

    // Add a minimum distance from the node to prevent immediate mouseout
    const minDistance = 15;

    // Adjust horizontally if needed
    if (position.x + previewRect.width > viewportWidth - 20) {
      adjustedX = position.x - previewRect.width - minDistance;
    } else {
      adjustedX = position.x + minDistance;
    }

    // Adjust vertically if needed
    if (position.y + previewRect.height > viewportHeight - 20) {
      adjustedY = position.y - previewRect.height - minDistance; // Place above the node
    } else {
      adjustedY = position.y + minDistance; // Place below the node with minimum distance
    }

    // Ensure the tooltip doesn't jump around too much
    const prevPosition = adjustedPosition;
    const distance = Math.sqrt(
      Math.pow(prevPosition.x - adjustedX, 2) +
        Math.pow(prevPosition.y - adjustedY, 2)
    );

    // Only update position if it's significantly different (prevents small jitters)
    if (distance > 5) {
      setAdjustedPosition({ x: adjustedX, y: adjustedY });
    }
  }, [position, adjustedPosition]);

  if (!node) return null;

  // Style with adjusted position and transition for smoother movement
  const style = {
    left: `${adjustedPosition.x}px`,
    top: `${adjustedPosition.y}px`,
    // Allow pointer events so we can hover the preview
    pointerEvents: "auto" as const,
    zIndex: 1000,
    // Add transition for smoother movement
    transition: "left 0.1s ease-out, top 0.1s ease-out",
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
