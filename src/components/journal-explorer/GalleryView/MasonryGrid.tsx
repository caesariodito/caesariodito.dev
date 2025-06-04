import React, { useEffect, useRef } from "react";

interface MasonryGridProps {
  children: React.ReactNode;
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ children }) => {
  const masonryRef = useRef<HTMLDivElement>(null);

  // Get grid columns based on screen size
  const getGridColumns = () => {
    if (typeof window === "undefined") return "repeat(3, 1fr)";

    const width = window.innerWidth;
    if (width < 640) return "repeat(1, 1fr)";
    if (width < 768) return "repeat(1, 1fr)";
    if (width < 1024) return "repeat(2, 1fr)";
    return "repeat(3, 1fr)"; // Always 3 columns for desktop and larger
  };

  // Update grid on resize
  useEffect(() => {
    const handleResize = () => {
      if (masonryRef.current) {
        masonryRef.current.style.gridTemplateColumns = getGridColumns();
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial setup

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // CSS for the masonry grid
  const masonryGridStyles = {
    display: "grid",
    gridTemplateColumns: getGridColumns(),
    gap: "16px",
  };

  return (
    <div
      style={masonryGridStyles}
      ref={masonryRef}
      className="grid-container mt-2"
    >
      {children}
    </div>
  );
};

export default MasonryGrid;
