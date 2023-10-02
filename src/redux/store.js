import { configureStore } from "@reduxjs/toolkit";
import graphDataReducer from "./slices/graphDataSlice";

export const store = configureStore({
  reducer: {
    graphData: graphDataReducer,
  },
});
