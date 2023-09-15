import Graph from "../Components/Graph";

export default function Main({ data }) {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Graph data={data} />
    </div>
  );
}
