import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeExternalLinks from "rehype-external-links";

const MarkdownRenderer = ({ content }) => {
  return (
    <Markdown
    components={{
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold">{children}</h1>
    ),
  }}>
  {" # **Test**\n\n**Bold**\n\n- # A\n- ## B"}
</Markdown>

  );
};

export default MarkdownRenderer;
