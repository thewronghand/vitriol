export function linkDistance(link, data) {
  const sourceLinksCount = data.links.filter(
    (l) => l.source.id === link.source.id || l.target.id === link.source.id
  ).length;

  const targetLinksCount = data.links.filter(
    (l) => l.source.id === link.target.id || l.target.id === link.target.id
  ).length;

  const totalLinksCount = sourceLinksCount + targetLinksCount;
  return 50 * (1 + 0.05 * totalLinksCount); // 기본 길이는 50이며, 연결 개수에 따라 5%씩 늘어납니다.
}
