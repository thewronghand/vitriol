import fs from "fs";
import path from "path";

const notesDir = "./src/notes";
const outputFile = "./graphData.json";

const extractLinks = (content) => {
  const linkPattern = /\[\[(.*?)\]\]/g;
  const links = [];
  let match;

  while ((match = linkPattern.exec(content))) {
    links.push(match[1]);
  }

  return links;
};

const crawlNotes = () => {
  const files = fs.readdirSync(notesDir);
  const nodes = [];
  const links = [];

  files.forEach((filename) => {
    const filePath = path.join(notesDir, filename);
    const content = fs.readFileSync(filePath, "utf-8");

    const id = path.basename(filename, ".md");
    nodes.push({ id, label: id });

    const fileLinks = extractLinks(content);
    fileLinks.forEach((link) => {
      links.push({ source: id, target: link });
    });
  });

  return { nodes, links };
};

const graphData = crawlNotes();
fs.writeFileSync(outputFile, JSON.stringify(graphData, null, 2));

console.log(`Graph data has been generated at ${outputFile}`);
