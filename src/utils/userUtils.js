import slugify from "@sindresorhus/slugify";

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

function convertObsidianLinkToReactLink(str) {
  return str.replace(
    /\[\[(.*?)(\|(.*?))?\]\]/g,
    function (match, linkText, _, alias) {
      const displayText = alias || linkText;
      // React-Router의 <Link> 대신 일반 <a> 태그를 사용합니다.
      return `<a href="/post/${linkText}">${displayText}</a>`;
    }
  );
}

export function obsidianLinkPlugin(md) {
  const defaultRender = md.renderer.rules.text;
  md.renderer.rules.text = function (tokens, idx, options, env, self) {
    tokens[idx].content = convertObsidianLinkToReactLink(tokens[idx].content);
    return defaultRender(tokens, idx, options, env, self);
  };
}
