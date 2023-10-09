import styled from "@emotion/styled";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export const COLOR = {
  PRIMARY: "#9f4ff3",
  SECONDARY: "#e7beee",
  TERTIARY: "#fce9ff",
  GRAY: "#d3d3d3",
  BACKGROUND: "#ffffff",
  TEXT: {
    PRIMARY: "#3c3c3c",
    SECONDARY: "#636363",
    TERTIARY: "#c2c2c2",
    POSITIVE: "#9f4ff3",
    NEGATIVE: "#f34f80",
  },
  GRAPH: {
    PRIMARY: "#9f4ff3",
    SECONDARY: "#c497f4",
    NEGATIVE: "#f34f80",
    NEGATIVE_SECONDARY: "#f397b3",
    LINK: "#d3d3d3",
  },
};

export const StyledMarkdown = styled(ReactMarkdown)`
  color: ${COLOR.TEXT.SECONDARY};
  padding-bottom: 150px;
  line-height: 1.4;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${COLOR.TEXT.PRIMARY};
    margin: 1rem 0;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid lightgray;
  }
  p {
    margin: 1rem 0;
    padding: 0 0.5rem;
  }
  ul {
    margin: 1rem 0;
  }

  blockquote {
    position: relative;
    padding: 0.5rem 1rem;
    background-color: #fcfcfc;
    border-radius: 10px;
    overflow: hidden;
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 5px;
      background-color: ${COLOR.PRIMARY};
    }
  }
  // inline code만 타겟팅
  code {
    color: ${COLOR.TEXT.SECONDARY};
    background-color: ${COLOR.TERTIARY};
    padding: 2px;
    margin: 2px;
    border-radius: 5px;
  }
  pre code {
    background-color: inherit;
    font-size: 0.8rem;
  }
`;
