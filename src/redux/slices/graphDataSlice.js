import { createSlice } from "@reduxjs/toolkit";
import graphData from "../../../graphData.json";

export const graphDataSlice = createSlice({
  name: "graphData",
  initialState: graphData,
});

export default graphDataSlice.reducer;
