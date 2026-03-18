"use client";

import { MDXRemote } from "next-mdx-remote/rsc";

export function MDXContent({ content }: { content: string }) {
  return <MDXRemote source={content} />;
}
