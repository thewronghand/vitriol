import { useState, useEffect } from "react";
import ObsidianLink from "../../Components/ObsidianLink";
import { NamedHeadings } from "../userUtils";
import CodeBlockRenderer from "../../Components/CodeBlockRenderer";

function useObsidianMarkdown() {
  const [components, setComponents] = useState({});

  useEffect(() => {
    const renderers = {
      a: ObsidianLink,
      heading: NamedHeadings,
      code: CodeBlockRenderer,
      // 기타 렌더러는 필요에 따라 여기에 추가하세요.
    };
    setComponents(renderers);
  }, []);

  return components;
}

export default useObsidianMarkdown;
