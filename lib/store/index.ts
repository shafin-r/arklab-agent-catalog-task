import { configureStore } from "@reduxjs/toolkit";
import agentsReducer from "./agentsSlice";

export const store = configureStore({
  reducer: {
    agents: agentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
