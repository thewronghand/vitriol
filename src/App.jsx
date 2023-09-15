import { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import PostDetails from "./Page/PostDetails";
import Main from "./Page/Main";

function App() {
  const [data, setData] = useState({ nodes: [], links: [] });

  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    // JSON 데이터 불러오기
    fetch("/graphData.json")
      .then((response) => response.json())
      .then((data) => setGraphData(data))
      .catch((error) => console.error("Error fetching graphData:", error));
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main data={graphData} />} />
        <Route path="/post/:id" element={<PostDetails data={graphData} />} />
      </Routes>
    </div>
  );
}

export default App;
