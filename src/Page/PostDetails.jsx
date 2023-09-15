import { useParams } from "react-router-dom";
import Graph from "../Components/Graph";
import { useState, useEffect } from "react";
import useObsidianMarkdown from "../utils/hooks/useObsidianMarkdown";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";
import { convertObsidianLinks } from "../utils/userUtils";
import remarkGfm from "remark-gfm";

export default function PostDetails({ data }) {
  const [content, setContent] = useState("");
  const { id } = useParams();
  const components = useObsidianMarkdown();

  useEffect(() => {
    fetch(`/src/notes/${id}.md`)
      .then((response) => response.text())
      .then((text) => {
        const convertedText = convertObsidianLinks(text);
        setContent(convertedText); // markdown 문자열을 직접 상태로 저장합니다.
      })
      .catch((err) => {
        console.error("Failed to load the markdown file:", err);
      });
  }, [id, components]);

  return (
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      <div style={{ width: "50%" }}>
        <Graph data={data} currentId={id} />
      </div>
      <div style={{ minWidth: "50%", maxWidth: "50%" }}>
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          components={components}
          remarkPlugins={[remarkGfm]}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
