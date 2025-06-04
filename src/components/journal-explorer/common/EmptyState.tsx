import React from "react";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  searchQuery?: string;
  resetFilters: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  searchQuery,
  resetFilters,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="bg-stone-100 dark:bg-stone-800 rounded-full p-6 mb-4">
        <BookOpen className="text-amber-500 dark:text-amber-400 h-12 w-12" />
      </div>
      <h3 className="text-xl font-medium text-stone-800 dark:text-stone-200 mb-2">
        No journal entries found
      </h3>
      <p className="text-stone-600 dark:text-stone-400 text-center max-w-md mb-6">
        {searchQuery
          ? `No results found for "${searchQuery}"`
          : "Try adjusting your filters to find what you're looking for."}
      </p>
      <Button onClick={resetFilters} variant="outline">
        Clear all filters
      </Button>
    </div>
  );
};

export default EmptyState;
