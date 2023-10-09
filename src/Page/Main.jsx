import styled from "@emotion/styled";
import Graph from "../Components/Graph";

export default function Main({ data }) {
  return (
    <MainContainer>
      <Graph data={data} />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  @media (min-width: 650px) {
    flex-direction: row;
  }
`;
