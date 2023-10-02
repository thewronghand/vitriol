import styled from "@emotion/styled";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ObsidianLink(props) {
  const navigate = useNavigate();

  // 대상 URL에서 \| 패턴 제거
  const cleanHref =
    props.href && decodeURIComponent(props.href).replace(/\\?\|.*/, "");

  const childrenArray = React.Children.toArray(props.children);
  let childText = childrenArray.map((child) =>
    typeof child === "string" ? child.split("|")[0] : child
  );

  const fileName = getFileName(cleanHref);

  const exists = useSelector(
    (state) =>
      state.graphData.nodes.find((node) => node.id === fileName)?.exists
  );

  // href 속성이 있는지 확인
  if (
    cleanHref &&
    typeof cleanHref === "string" &&
    cleanHref.startsWith("/post/")
  ) {
    return (
      <ColoredAnchor
        href={cleanHref}
        onClick={(e) => {
          e.preventDefault();
          // 정제된 URL로 navigate
          navigate(cleanHref);
        }}
        exists={exists}
      >
        {childText}
      </ColoredAnchor>
    );
  }

  return <ColoredAnchor href={cleanHref}>{childText}</ColoredAnchor>;
}

const ColoredAnchor = styled.a`
  text-decoration: none;
  color: ${(props) => (props.exists ? "purple" : "red")};
`;

function getFileName(path) {
  // 마지막 '/' 이후의 문자열을 가져옵니다.
  const parts = path.split("/");
  return parts[parts.length - 1];
}
