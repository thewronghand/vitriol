import { useParams } from "react-router-dom";
import Graph from "../Components/Graph";
import { useState, useEffect } from "react";
import useObsidianMarkdown from "../utils/hooks/useObsidianMarkdown";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

const options = {
  replace: ({ attribs, children }) => {
    if (!attribs) {
      console.log("호출되지않음");
      return;
    }

    // a 태그의 href 속성을 확인하여 Link 컴포넌트로 변환
    if (attribs.href && attribs.href.startsWith("/post/")) {
      console.log("호출됨");
      return <Link to={attribs.href}>{children}</Link>;
    }
  },
};

export default function PostDetails({ data }) {
  const [content, setContent] = useState("");
  const { id } = useParams();
  const markdownRenderer = useObsidianMarkdown();

  useEffect(() => {
    fetch(`/src/notes/${id}.md`)
      .then((response) => response.text())
      .then((text) => {
        const htmlContent = markdownRenderer.render(text);
        setContent(htmlContent);
      })
      .catch((err) => {
        console.error("Failed to load the markdown file:", err);
      });
  }, [id, markdownRenderer]);

  const reactComponents = parse(content, options);

  return (
    <div>
      <Graph data={data} currentId={id} />
      <div>{reactComponents}</div>
    </div>
  );
}
