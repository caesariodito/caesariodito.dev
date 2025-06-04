import React from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface GraphControlsProps {
  zoomIn: () => void;
  zoomOut: () => void;
  resetView: () => void;
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
