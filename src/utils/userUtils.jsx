import slugify from "@sindresorhus/slugify";
import { Link, useNavigate } from "react-router-dom";

export function headerToId(heading) {
  const slugifiedHeader = slugify(heading);
  return slugifiedHeader || heading;
}

function namedHeadings(md, state) {
  const ids = {};

  state.tokens.forEach((token, i) => {
    if (token.type === "heading_open") {
      const text = md.renderer.render(state.tokens[i + 1].children, md.options);
      const id = headerToId(text);
      const uniqId = uncollide(ids, id);
      ids[uniqId] = true;
      setAttr(token, "id", uniqId);
    }
  });
}

function uncollide(ids, id) {
  if (!ids[id]) return id;
  let i = 1;
  while (ids[id + "-" + i]) {
    i++;
  }
  return id + "-" + i;
}

function setAttr(token, attr, value, options) {
  const idx = token.attrIndex(attr);

  if (idx === -1) {
    token.attrPush([attr, value]);
  } else if (options && options.append) {
    token.attrs[idx][1] = token.attrs[idx][1] + " " + value;
  } else {
    token.attrs[idx][1] = value;
  }
}

export function namedHeadingsFilter(md) {
  md.core.ruler.push("named_headings", namedHeadings.bind(null, md));
}

export function convertObsidianLinks(text) {
  const regex = /\[\[(.*?)\]\]/g;
  return text.replace(regex, (match, linkText) => {
    const encodedLinkText = encodeURIComponent(linkText);
    return `[${linkText}](/post/${encodedLinkText})`;
    // return <Link to={`/post/${encodedLinkText}`}>{linkText}</Link>
  });
}

export function NamedHeadings({ level, children }) {
  const textContent = children[0].props.children;
  const slugifiedHeader = slugify(textContent);
  const id = slugifiedHeader || textContent;

  const HeadingComponent = `h${level}`;

  return <HeadingComponent id={id}>{children}</HeadingComponent>;
}

export function removeConfigSection(markdownText) {
  const sections = markdownText.split("---");
  if (sections.length >= 3) {
    return sections.slice(2).join("---");
  }
  return markdownText;
}

export const removeFileExtension = (filename) => {
  return filename.split(".").slice(0, -1).join(".");
};
