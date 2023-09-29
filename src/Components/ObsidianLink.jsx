import { useNavigate } from "react-router-dom";

export default function ObsidianLink(props) {
  const navigate = useNavigate();

  // href 속성이 있는지 확인
  if (
    props.href &&
    typeof props.href === "string" &&
    props.href.startsWith("/post/")
  ) {
    return (
      <a
        href={props.href}
        onClick={(e) => {
          e.preventDefault();
          navigate(props.href);
        }}
        className="asdf"
      >
        {props.children}
      </a>
    );
  }

  return <a href={props.href}>{props.children}</a>;
}
