import { useState, useEffect } from "react";
import ObsidianLink from "../../Components/ObsidianLink";
import { NamedHeadings } from "../userUtils";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const codeBlockRender = {
  code: ({ node, inline, className, children, ...props }) => {
    if (inline) {
      return <code className={className}>{children}</code>;
    }

    const match = /language-(\w+)/.exec(className || "");
    const language = match ? match[1] : "plaintext"; // 언어가 지정되지 않은 경우 "plaintext"를 기본값으로 사용합니다.

    return (
      <SyntaxHighlighter style={atomDark} language={language} PreTag="div">
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    );
  },
};

function useObsidianMarkdown() {
  const [components, setComponents] = useState({});

  useEffect(() => {
    const renderers = {
      a: ObsidianLink,
      heading: NamedHeadings,
      ...codeBlockRender,
      // 기타 렌더러는 필요에 따라 여기에 추가하세요.
    };
    setComponents(renderers);
  }, []);

  return components;
}

export default useObsidianMarkdown;
