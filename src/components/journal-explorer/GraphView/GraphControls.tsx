import React from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface GraphControlsProps {
  zoomIn: (e: React.MouseEvent) => void;
  zoomOut: (e: React.MouseEvent) => void;
  resetView: (e: React.MouseEvent) => void;
  zoomLevel: number;
  setZoomLevel: (level: number) => void;
}

const GraphControls: React.FC<GraphControlsProps> = ({
  zoomIn,
  zoomOut,
  resetView,
  zoomLevel,
  setZoomLevel,
}) => {
  // Handler for slider to prevent propagation
  const handleSliderChange = (value: number[]) => {
    setZoomLevel(value[0] / 100);
  };

  // Handle button clicks with proper event stopping
  const handleButtonClick =
    (handler: (e: React.MouseEvent) => void) => (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      handler(e);
    };

  return (
    <div
      className="graph-controls absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 dark:bg-stone-800/90 rounded-lg shadow-md p-2 flex items-center gap-2"
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={handleButtonClick(zoomOut)}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <ZoomOut size={16} />
      </Button>

      <Slider
        value={[zoomLevel * 100]}
        min={10}
        max={400}
        step={10}
        className="w-32"
        onValueChange={handleSliderChange}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
      />

      <Button
        variant="ghost"
        size="sm"
        onClick={handleButtonClick(zoomIn)}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <ZoomIn size={16} />
      </Button>

      <div className="w-px h-6 bg-stone-200 dark:bg-stone-700 mx-1" />

      <Button
        variant="ghost"
        size="sm"
        onClick={handleButtonClick(resetView)}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <RotateCcw size={16} />
      </Button>
    </div>
  );
};

export default GraphControls;
