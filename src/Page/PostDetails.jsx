import { useParams } from "react-router-dom";
import Graph from "../Components/Graph";
import { useState, useEffect } from "react";
import useObsidianMarkdown from "../utils/hooks/useObsidianMarkdown";
import rehypeRaw from "rehype-raw";
import { convertObsidianLinks, removeConfigSection } from "../utils/userUtils";
import remarkGfm from "remark-gfm";
import styled from "@emotion/styled";
import useDetectWindowWidth from "../utils/hooks/useDetectWindowWidth";
import MobileGraph from "../Components/MobileGraph";
import { StyledMarkdown } from "../utils/styles";

const mobileWindowWidth = 650;

export default function PostDetails({ data }) {
  const [content, setContent] = useState("");
  const { id } = useParams();
  const components = useObsidianMarkdown();
  const windowWidth = useDetectWindowWidth();
  const isMobile = windowWidth <= mobileWindowWidth;

  useEffect(() => {
    fetch(`/notes/${id}.md`)
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
    <PostDetailsContainer>
      <GraphContainer>
        {isMobile ? (
          <MobileGraph data={data} currentId={id} />
        ) : (
          <Graph data={data} currentId={id} />
        )}
      </GraphContainer>
      <DocContainer>
        <DocHeading>{id}</DocHeading>
        <StyledMarkdown
          rehypePlugins={[rehypeRaw]}
          components={components}
          remarkPlugins={[remarkGfm]}
        >
          {content}
        </StyledMarkdown>
      </DocContainer>
    </PostDetailsContainer>
  );
}

const PostDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  @media (min-width: 650px) {
    flex-direction: row;
  }
`;

const GraphContainer = styled.div`
  width: 100%;
  height: 50vh;
  @media (min-width: 650px) {
    width: 50%;
    height: 100vh;
  }
`;

const DocHeading = styled.h1`
  margin-bottom: 15px;
  font-size: 48px;
  padding: 15px 0;
  border-bottom: 1px solid lightgray;
`;

const DocContainer = styled.div`
  padding: 15px;
  min-width: 100%;
  max-width: 100%;
  overflow-y: auto;
  @media (min-width: 650px) {
    min-width: 50%;
    max-width: 50%;
  }
`;
