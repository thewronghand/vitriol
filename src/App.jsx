import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import PostDetails from "./Page/PostDetails";
import Main from "./Page/Main";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { css, Global } from "@emotion/react";
import D2CodingTTC from "./assets/fonts/D2Coding-Ver1.3.2-20180524-all.ttc";

function App() {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    // JSON 데이터 불러오기
    fetch("/graphData.json")
      .then((response) => response.json())
      .then((data) => setGraphData(data))
      .catch((error) => console.error("Error fetching graphData:", error));
  }, []);

  return (
    <Provider store={store}>
      <Global styles={globalStyles} />
      <div className="App">
        <Routes>
          <Route path="/" element={<Main data={graphData} />} />
          <Route path="/post/:id" element={<PostDetails data={graphData} />} />
        </Routes>
      </div>
    </Provider>
  );
}

const globalStyles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
  }
  @font-face {
    font-family: "D2Coding";
    src: url(${D2CodingTTC});
  }
  body {
    font-family: "D2Coding";
  }
`;

export default App;
