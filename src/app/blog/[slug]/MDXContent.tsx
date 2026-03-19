"use client";

import { MDXRemote } from "next-mdx-remote/rsc";

const mdxComponents = {
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6 rounded-lg border border-gray-700">
      <table className="w-full text-sm text-left text-gray-300" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="text-xs uppercase bg-gray-800 text-gray-400" {...props} />
  ),
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className="divide-y divide-gray-700" {...props} />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="border-b border-gray-700 hover:bg-gray-800/50" {...props} />
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-4 py-3 font-semibold text-white" {...props} />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-3" {...props} />
  ),
};

export function MDXContent({ content }: { content: string }) {
  return <MDXRemote source={content} components={mdxComponents} />;
}
