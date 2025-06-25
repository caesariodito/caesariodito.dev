"use client";

import { MDXRemote } from "next-mdx-remote/rsc";
import MDXComponents from "@/components/MDXComponents";
import { processContent } from "@/lib/utils";
import { useState, useEffect } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

interface MDXClientWrapperProps {
  source: string;
  processContentBeforeRendering?: boolean;
}

// Error fallback component for the entire MDX content
const ContentErrorFallback = ({ error }: FallbackProps) => {
  return (
    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg my-4">
      <p className="text-red-600 dark:text-red-400 font-medium">
        Error rendering content
      </p>
      <p className="text-sm text-red-500 dark:text-red-300 mt-1">
        {error.message}
      </p>
    </div>
  );
};

export default function MDXClientWrapper({
  source,
  processContentBeforeRendering = false,
}: MDXClientWrapperProps) {
  const [error, setError] = useState<string | null>(null);
  const [processedSource, setProcessedSource] = useState<string>(source);

  useEffect(() => {
    try {
      if (processContentBeforeRendering && source) {
        setProcessedSource(processContent(source));
      } else {
        setProcessedSource(source);
      }
    } catch (err) {
      console.error("Error processing MDX content:", err);
      setError("Failed to process content");
    }
  }, [source, processContentBeforeRendering]);

  if (error) {
    return (
      <div className="text-red-500 p-4 border border-red-300 rounded">
        Error rendering content: {error}
      </div>
    );
  }

  if (!processedSource) {
    return <div className="text-amber-500">No content available</div>;
  }

  return (
    <ErrorBoundary FallbackComponent={ContentErrorFallback}>
      <MDXRemote source={processedSource} components={MDXComponents} />
    </ErrorBoundary>
  );
}
