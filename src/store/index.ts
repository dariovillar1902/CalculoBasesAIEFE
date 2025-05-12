import { configureStore } from "@reduxjs/toolkit";
import baseHormigonReducer from "./slices/baseHormigonSlice";

export const store = configureStore({
  reducer: {
    baseHormigon: baseHormigonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
