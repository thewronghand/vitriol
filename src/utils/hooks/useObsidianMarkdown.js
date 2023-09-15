import {
  headerToId,
  namedHeadingsFilter,
  obsidianLinkPlugin,
} from "../userUtils";
import { useState, useEffect } from "react";
import MarkdownIt from "markdown-it";
import mdAnchor from "markdown-it-anchor";
import mdMark from "markdown-it-mark";
import mdFootnote from "markdown-it-footnote";
import mdMathjax3 from "markdown-it-mathjax3";
import mdAttrs from "markdown-it-attrs";
import mdTaskCheckbox from "markdown-it-task-checkbox";
import mdPlantUML from "markdown-it-plantuml";

function useObsidianMarkdown() {
  const [markdownLib, setMarkdownLib] = useState(null);

  useEffect(() => {
    if (!markdownLib) {
      const md = new MarkdownIt({
        breaks: true,
        html: true,
      })
        .use(mdAnchor, { slugify: headerToId })
        .use(mdMark)
        .use(mdFootnote)
        .use(mdMathjax3, {
          tex: {
            inlineMath: [["$", "$"]],
          },
          options: {
            skipHtmlTags: { "[-]": ["pre"] },
          },
        })
        .use(mdAttrs)
        .use(mdTaskCheckbox, {
          disabled: true,
          divWrap: false,
          divClass: "checkbox",
          idPrefix: "cbx_",
          ulClass: "task-list",
          liClass: "task-list-item",
        })
        .use(mdPlantUML, {
          openMarker: "```plantuml",
          closeMarker: "```",
        })
        .use(namedHeadingsFilter)
        .use(obsidianLinkPlugin); // 이 부분이 추가됩니다.
      setMarkdownLib(md);
    }
  }, [markdownLib]);

  return markdownLib;
}

export default useObsidianMarkdown;
