"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ReactNode,
  HTMLAttributes,
  ImgHTMLAttributes,
  AnchorHTMLAttributes,
  Children,
  isValidElement,
  cloneElement,
  useState,
  useEffect,
} from "react";
import { Card } from "@/components/ui/card";
import { useLinkPreview } from "@/hooks/useLinkPreview";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { ComponentType } from "react";

// Utility function to unwrap paragraph children
const unwrapParagraphs = (children: ReactNode): ReactNode => {
  return Children.map(children, (child) => {
    if (isValidElement(child) && child.type === "p") {
      return child.props.children;
    }
    return child;
  });
};

interface CalloutProps {
  children: ReactNode;
  type?: "default" | "warning" | "info";
}

const Callout = ({ children, type = "default" }: CalloutProps) => {
  const bgColors = {
    default:
      "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800",
    warning: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
    info: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
  };

  // Process children to prevent nested paragraph tags
  const processedChildren = unwrapParagraphs(children);

  return (
    <div className={`p-4 my-6 border-l-4 rounded-r-lg ${bgColors[type]}`}>
      <div className="text-stone-600 dark:text-stone-300">
        {processedChildren}
      </div>
    </div>
  );
};

interface EmbedProps {
  url: string;
  title?: string;
}

// Helper function to extract YouTube video ID
const getYouTubeVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Helper function to get domain from URL
const getDomain = (url: string): string => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch (error) {
    return "";
  }
};

const Embed = ({ url, title }: EmbedProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { previewData, loading: previewLoading } = useLinkPreview(url);

  useEffect(() => {
    // Simulate checking if embed is loaded
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [url]);

  // YouTube embed
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const videoId = getYouTubeVideoId(url);
    if (videoId) {
      return (
        <div className="relative w-full pb-[56.25%] my-6 md:my-8 overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-stone-100 dark:bg-stone-800 rounded-lg">
              <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title || "YouTube video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            onLoad={() => setIsLoading(false)}
            onError={() => setError("Failed to load YouTube video")}
          />
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div className="text-red-500 dark:text-red-400">{error}</div>
            </div>
          )}
        </div>
      );
    }
  }

  // Twitter/X embed
  if (url.includes("twitter.com") || url.includes("x.com")) {
    return (
      <div className="my-6 md:my-8">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 border border-stone-200 dark:border-stone-700 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
        >
          <div className="flex items-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-5 h-5 mr-2 text-[#1DA1F2] dark:text-[#1DA1F2]"
              fill="currentColor"
            >
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
            <span className="text-stone-600 dark:text-stone-300 font-medium">
              View on Twitter/X
            </span>
          </div>
          <div className="text-sm text-stone-500 dark:text-stone-400">
            {title || "Twitter/X Post"}
          </div>
        </a>
      </div>
    );
  }

  // LinkedIn embed - keep existing implementation
  if (url.includes("linkedin.com")) {
    return (
      <div className="my-6 md:my-8">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 border border-stone-200 dark:border-stone-700 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
        >
          <div className="flex items-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-5 h-5 mr-2 text-[#0077b5] dark:text-[#0077b5]"
              fill="currentColor"
            >
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
            </svg>
            <span className="text-stone-600 dark:text-stone-300 font-medium">
              View on LinkedIn
            </span>
          </div>
          <div className="text-sm text-stone-500 dark:text-stone-400">
            {title || "LinkedIn Post"}
          </div>
        </a>
      </div>
    );
  }

  // Wiki pages (Wikipedia, Fandom, etc.)
  if (
    url.includes("wikipedia.org") ||
    url.includes("wiki") ||
    url.includes("fandom.com")
  ) {
    // Use the default link preview handler
    return (
      <div className="my-6 md:my-8">
        {isLoading || previewLoading ? (
          <div className="w-full h-64 flex items-center justify-center bg-stone-100 dark:bg-stone-800 rounded-lg">
            <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="block border border-stone-200 dark:border-stone-700 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors overflow-hidden"
          >
            {previewData?.image ? (
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={previewData.image}
                  alt={previewData.title || title || "Wiki page"}
                  fill
                  className="object-cover"
                  onError={() => setError("Failed to load image")}
                />
              </div>
            ) : null}
            <div className="p-4">
              <div className="flex items-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 mr-2 text-stone-600 dark:text-stone-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
                <span className="text-stone-600 dark:text-stone-300 font-medium line-clamp-1">
                  {previewData?.title || title || "View Wiki Page"}
                </span>
              </div>
              {previewData?.description && (
                <div className="text-sm text-stone-500 dark:text-stone-400 line-clamp-2 mb-2">
                  {previewData.description}
                </div>
              )}
              <div className="text-xs text-stone-400 dark:text-stone-500">
                {previewData?.siteName || getDomain(url)}
              </div>
            </div>
          </a>
        )}
      </div>
    );
  }

  // News sites and articles
  if (
    url.includes("news") ||
    url.includes("article") ||
    url.includes("blog") ||
    url.includes("capitalfm.com") ||
    url.includes(".fm") ||
    url.includes("bbc") ||
    url.includes("cnn") ||
    url.includes("nytimes")
  ) {
    // Use the default link preview handler
    return (
      <div className="my-6 md:my-8">
        {isLoading || previewLoading ? (
          <div className="w-full h-64 flex items-center justify-center bg-stone-100 dark:bg-stone-800 rounded-lg">
            <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="block border border-stone-200 dark:border-stone-700 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors overflow-hidden"
          >
            {previewData?.image ? (
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={previewData.image}
                  alt={previewData.title || title || "Article"}
                  fill
                  className="object-cover"
                  onError={() => setError("Failed to load image")}
                />
              </div>
            ) : null}
            <div className="p-4">
              <div className="flex items-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 mr-2 text-stone-600 dark:text-stone-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                  <path d="M18 14h-8" />
                  <path d="M15 18h-5" />
                  <path d="M10 6h8v4h-8V6Z" />
                </svg>
                <span className="text-stone-600 dark:text-stone-300 font-medium line-clamp-1">
                  {previewData?.title || title || "View Article"}
                </span>
              </div>
              {previewData?.description && (
                <div className="text-sm text-stone-500 dark:text-stone-400 line-clamp-2 mb-2">
                  {previewData.description}
                </div>
              )}
              <div className="text-xs text-stone-400 dark:text-stone-500">
                {previewData?.siteName || getDomain(url)}
              </div>
            </div>
          </a>
        )}
      </div>
    );
  }

  // Default fallback for other URLs - with link preview
  return (
    <div className="my-6 md:my-8">
      {isLoading || previewLoading ? (
        <div className="w-full h-64 flex items-center justify-center bg-stone-100 dark:bg-stone-800 rounded-lg">
          <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block border border-stone-200 dark:border-stone-700 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors overflow-hidden"
        >
          {previewData?.image ? (
            <div className="relative w-full h-48 overflow-hidden">
              <Image
                src={previewData.image}
                alt={previewData.title || title || "Link preview"}
                fill
                className="object-cover"
                onError={() => setError("Failed to load image")}
              />
            </div>
          ) : null}
          <div className="p-4">
            <div className="flex items-center mb-2">
              {previewData?.favicon && (
                <img
                  src={previewData.favicon}
                  alt=""
                  className="w-4 h-4 mr-2"
                  onError={(e) => {
                    // Hide favicon if it fails to load
                    e.currentTarget.style.display = "none";
                  }}
                />
              )}
              <span className="text-stone-600 dark:text-stone-300 font-medium line-clamp-1">
                {previewData?.title || title || getDomain(url)}
              </span>
            </div>
            {previewData?.description && (
              <div className="text-sm text-stone-500 dark:text-stone-400 line-clamp-2 mb-2">
                {previewData.description}
              </div>
            )}
            <div className="text-xs text-stone-400 dark:text-stone-500 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-3 h-3 mr-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              {previewData?.siteName || getDomain(url)}
            </div>
          </div>
        </a>
      )}
      {error && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 border border-stone-200 dark:border-stone-700 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors mt-2"
        >
          <div className="flex items-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-5 h-5 mr-2 text-stone-600 dark:text-stone-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            <span className="text-stone-600 dark:text-stone-300 font-medium">
              Visit Website
            </span>
          </div>
          <div className="text-sm text-stone-500 dark:text-stone-400">
            {title || getDomain(url)}
          </div>
        </a>
      )}
    </div>
  );
};

interface ImageWithCaptionProps {
  src: string;
  alt: string;
  caption?: ReactNode;
  width?: number;
  height?: number;
}

const ImageWithCaption = ({
  src,
  alt,
  caption,
  width = 1200,
  height = 630,
}: ImageWithCaptionProps) => {
  return (
    <figure className="my-6 md:my-8">
      <div className="overflow-hidden rounded-lg">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto object-cover"
        />
      </div>
      {caption && (
        <figcaption className="text-xs md:text-sm text-center mt-2 text-stone-500 dark:text-stone-400">
          {typeof caption === "string" ? caption : unwrapParagraphs(caption)}
        </figcaption>
      )}
    </figure>
  );
};

interface CodeBlockProps {
  children: ReactNode;
  language?: string;
}

const CodeBlock = ({ children, language }: CodeBlockProps) => {
  return (
    <pre className="bg-stone-800 text-stone-100 p-3 md:p-4 rounded-lg overflow-x-auto text-sm my-4 md:my-6">
      <code className={language ? `language-${language}` : ""}>{children}</code>
    </pre>
  );
};

type HeadingProps = HTMLAttributes<HTMLHeadingElement>;
type ParagraphProps = HTMLAttributes<HTMLParagraphElement>;
type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;
type ListProps = HTMLAttributes<HTMLUListElement | HTMLOListElement>;
type ListItemProps = HTMLAttributes<HTMLLIElement>;
type BlockquoteProps = HTMLAttributes<HTMLQuoteElement>;
type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt?: string;
};

// Add new components for HashtagLink and WikiLink
interface HashtagLinkProps {
  tag: string;
  children?: ReactNode; // Allow children if MDX parser wraps the text
}

const HashtagLink = ({ tag, children }: HashtagLinkProps) => {
  return (
    <Link
      href={`/tags/${tag}`}
      className="text-amber-600 dark:text-amber-400 hover:underline font-medium"
    >
      {children || `#${tag}`}
    </Link>
  );
};

interface WikiLinkProps {
  pageName: string;
  href: string;
  children?: ReactNode; // Allow children if MDX parser wraps the text
}

const WikiLink = ({ pageName, href, children }: WikiLinkProps) => {
  return (
    <Link
      href={href}
      className="px-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded hover:bg-amber-200 dark:hover:bg-amber-800/50"
    >
      {children || pageName}
    </Link>
  );
};

// Error fallback component
const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg my-4">
      <p className="text-red-600 dark:text-red-400 font-medium">
        Error rendering component
      </p>
      <p className="text-sm text-red-500 dark:text-red-300 mt-1">
        {error.message}
      </p>
      <button
        onClick={resetErrorBoundary}
        className="mt-2 px-3 py-1 bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-300 text-sm rounded hover:bg-red-200 dark:hover:bg-red-700"
      >
        Try again
      </button>
    </div>
  );
};

// Wrapper to safely render any component
interface SafeComponentProps {
  component: ComponentType<any> | undefined;
  [key: string]: any;
}

const SafeComponent = ({
  component: Component,
  ...props
}: SafeComponentProps) => {
  if (!Component) {
    return (
      <span className="text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded">
        Missing component
      </span>
    );
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Component {...props} />
    </ErrorBoundary>
  );
};

const MDXComponents = {
  h1: (props: HeadingProps) => (
    <h1
      className="text-3xl font-light mt-12 mb-6 text-stone-800 dark:text-stone-100"
      {...props}
    />
  ),
  h2: (props: HeadingProps) => (
    <h2
      className="text-2xl font-light mt-10 mb-4 text-stone-800 dark:text-stone-100"
      {...props}
    />
  ),
  h3: (props: HeadingProps) => (
    <h3
      className="text-xl font-medium mt-8 mb-4 text-stone-800 dark:text-stone-100"
      {...props}
    />
  ),
  p: (props: ParagraphProps) => (
    <p
      className="my-4 text-stone-600 dark:text-stone-300 leading-relaxed"
      {...props}
    />
  ),
  a: (props: AnchorProps) => (
    <Link
      href={props.href || "#"}
      className="text-amber-600 dark:text-amber-400 hover:underline"
      {...props}
    />
  ),
  ul: (props: ListProps) => (
    <ul
      className="list-disc pl-6 my-4 text-stone-600 dark:text-stone-300"
      {...props}
    />
  ),
  ol: (props: ListProps) => (
    <ol
      className="list-decimal pl-6 my-4 text-stone-600 dark:text-stone-300"
      {...props}
    />
  ),
  li: (props: ListItemProps) => <li className="my-1" {...props} />,
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="border-l-4 border-amber-300 dark:border-amber-600 pl-4 my-6 italic text-stone-600 dark:text-stone-300"
      {...props}
    />
  ),
  hr: () => <hr className="my-8 border-stone-200 dark:border-stone-700" />,
  img: (props: ImageProps) => (
    <Image
      src={props.src}
      alt={props.alt || ""}
      width={1200}
      height={630}
      className="rounded-lg my-6"
    />
  ),
  Callout,
  Embed,
  ImageWithCaption,
  CodeBlock,
  Card: (props: HTMLAttributes<HTMLDivElement>) => {
    // Process children to prevent nested paragraph tags
    const processedChildren = unwrapParagraphs(props.children);

    return (
      <Card className="p-6 my-6" {...props} children={processedChildren} />
    );
  },
  // Add the new components here
  HashtagLink,
  WikiLink,
  // Add a wrapper for custom components to prevent undefined errors
  wrapper: ({ components, children, ...props }) => {
    try {
      return <div {...props}>{children}</div>;
    } catch (error) {
      console.error("Error in MDX wrapper:", error);
      return <div className="text-red-500">Error rendering content</div>;
    }
  },
};

export default MDXComponents;
