import React from "react";
import { Sparkles } from "lucide-react";

const LoadingAnimation: React.FC = () => {
  return (
    <div className="flex justify-center my-12">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-stone-200 dark:border-stone-700 border-t-amber-400 dark:border-t-amber-600 animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles
            className="text-amber-500 dark:text-amber-400 animate-pulse"
            size={16}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
