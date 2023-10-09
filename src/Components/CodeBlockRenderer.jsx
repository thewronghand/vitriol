import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeBlockRenderer({
  node,
  inline,
  className,
  children,
  ...props
}) {
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
}
