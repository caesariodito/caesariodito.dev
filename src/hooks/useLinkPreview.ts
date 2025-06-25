import { useState, useEffect } from "react";

interface LinkPreviewData {
  title: string;
  description: string;
  image: string | null;
  siteName: string | null;
  favicon: string | null;
}

export function useLinkPreview(url: string) {
  const [previewData, setPreviewData] = useState<LinkPreviewData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchPreview = async () => {
      if (!url) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Check if we have cached data
        const cachedData = sessionStorage.getItem(`link-preview-${url}`);
        if (cachedData) {
          setPreviewData(JSON.parse(cachedData));
          setLoading(false);
          return;
        }

        // Encode the URL to make it safe for query parameters
        const encodedUrl = encodeURIComponent(url);
        const response = await fetch(`/api/link-preview?url=${encodedUrl}`, {
          signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch link preview");
        }

        const data = await response.json();
        setPreviewData(data);

        // Cache the preview data
        sessionStorage.setItem(`link-preview-${url}`, JSON.stringify(data));
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPreview();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { previewData, loading, error };
}
