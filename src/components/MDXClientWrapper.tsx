"use client";

import { MDXRemote } from "next-mdx-remote/rsc";
import MDXComponents from "@/components/MDXComponents";

interface MDXClientWrapperProps {
  source: string;
}

export default function MDXClientWrapper({ source }: MDXClientWrapperProps) {
  return <MDXRemote source={source} components={MDXComponents} />;
}
