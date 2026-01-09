/** @format */
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";

const MarkdownPreview = ({ content = "", className = "" }) => {
  return (
    <article
      className={`prose prose-lg max-w-none
      prose-h2:text-3xl prose-h2:font-bold
      prose-h3:text-xl prose-h3:font-semibold
      prose-p:leading-relaxed
      prose-strong:text-gray-900
      prose-blockquote:border-l-indigo-500
      ${className}`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize]}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
};

export default MarkdownPreview;
