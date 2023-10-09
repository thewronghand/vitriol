import fs from "fs";
import path from "path";

const notesDir = "./src/site/notes";
const outputFile = "./graphData.json";

const extractLinks = (content) => {
  const linkPattern = /\[\[(.*?)\]\]/g;
  const links = [];
  let match;

  while ((match = linkPattern.exec(content))) {
    let linkText = match[1];
    linkText = linkText.split("|")[0].trim().replace(/\\/g, "");
    links.push(linkText);
  }

  return links;
};

const normalizeFileName = (filename) => {
  return filename.replace(/\s+/g, " ").trim();
};

const crawlNotes = () => {
  const files = fs.readdirSync(notesDir);
  const nodes = [];
  const links = [];

  // 모든 파일에서 노드와 연결 정보를 가져오기
  files.forEach((filename) => {
    const filePath = path.join(notesDir, filename);
    const content = fs.readFileSync(filePath, "utf-8");

    const id = normalizeFileName(path.basename(filename, ".md"));
    nodes.push({ id, label: id, exists: true });

    const fileLinks = extractLinks(content);
    fileLinks.forEach((link) => {
      links.push({ source: id, target: normalizeFileName(link) });
    });
  });

  // 연결 정보에서 노드 목록을 생성
  links.forEach((link) => {
    if (!nodes.some((node) => node.id === link.target)) {
      nodes.push({ id: link.target, label: link.target, exists: false });
    }
  });

  return { nodes, links };
};

const graphData = crawlNotes();
fs.writeFileSync(outputFile, JSON.stringify(graphData, null, 2));

console.log(`Graph data has been generated at ${outputFile}`);
