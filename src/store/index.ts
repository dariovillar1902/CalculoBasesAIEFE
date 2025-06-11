import { configureStore } from "@reduxjs/toolkit";
import baseHormigonReducer from "./slices/baseHormigonSlice";
import baseHormigonResultsReducer from "./slices/baseHormigonResultsSlice";

export const store = configureStore({
  reducer: {
    baseHormigon: baseHormigonReducer,
    baseHormigonResults: baseHormigonResultsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
