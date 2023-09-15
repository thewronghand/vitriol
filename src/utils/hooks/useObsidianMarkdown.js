import { useState, useEffect } from "react";
import { ObsidianLink } from "../userUtils";
import { NamedHeadings } from "../userUtils";

function useObsidianMarkdown() {
  const [components, setComponents] = useState({});

  useEffect(() => {
    const renderers = {
      link: ObsidianLink,
      heading: NamedHeadings,
      // 기타 렌더러는 필요에 따라 여기에 추가하세요.
    };
    setComponents(renderers);
  }, []);

  return components;
}

export default useObsidianMarkdown;
