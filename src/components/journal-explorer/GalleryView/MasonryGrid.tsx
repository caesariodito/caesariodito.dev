import React, { useEffect, useRef } from "react";

interface MasonryGridProps {
  children: React.ReactNode;
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ children }) => {
  const masonryRef = useRef<HTMLDivElement>(null);

  // Get grid columns based on screen size
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
    <div style={masonryGridStyles} ref={masonryRef} className="grid-container">
      {children}
    </div>
  );
};

export default MasonryGrid;
