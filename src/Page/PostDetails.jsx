import { useParams } from "react-router-dom";
import Graph from "../Components/Graph";
import { useState, useEffect } from "react";
import useObsidianMarkdown from "../utils/hooks/useObsidianMarkdown";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";
import { convertObsidianLinks, removeConfigSection } from "../utils/userUtils";
import remarkGfm from "remark-gfm";

export default function PostDetails({ data }) {
  const [content, setContent] = useState("");
  const { id } = useParams();
  const components = useObsidianMarkdown();

  useEffect(() => {
    fetch(`/src/site/notes/${id}.md`)
      .then((response) => response.text())
      .then((text) => {
        const cleanText = removeConfigSection(text);
        const convertedText = convertObsidianLinks(cleanText);
        setContent(convertedText);
        console.log(content);
      })
      .catch((err) => {
        console.error("Failed to load the markdown file:", err);
      });
  }, [id, components, content]);

  console.log(components);

  return (
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      <div style={{ width: "50%" }}>
        <Graph data={data} currentId={id} />
      </div>
      <div
        style={{
          minWidth: "50%",
          maxWidth: "50%",
          textAlign: "left",
          padding: "15px",
          overflowY: "scroll",
        }}
      >
        <h1>{id}</h1>
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
