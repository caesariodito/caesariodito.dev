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
} from "react";
import { Card } from "@/components/ui/card";

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

const Embed = ({ url, title }: EmbedProps) => {
  return (
    <div className="aspect-w-16 aspect-h-9 my-8">
      <iframe
        src={url}
        title={title || "Embedded content"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full rounded-lg"
      />
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
    <figure className="my-8">
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
        <figcaption className="text-sm text-center mt-2 text-stone-500 dark:text-stone-400">
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
    <pre className="bg-stone-800 text-stone-100 p-4 rounded-lg overflow-x-auto my-6">
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
};

export default MDXComponents;
