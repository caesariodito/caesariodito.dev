import React from "react";
import { formatDate } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Calendar, Hash } from "lucide-react";
import { GraphNode } from "./types";

interface NodePreviewProps {
  node: GraphNode | null;
  position: { x: number; y: number };
}

const NodePreview: React.FC<NodePreviewProps> = ({ node, position }) => {
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
