import { useDispatch } from "react-redux";
import { rootReducer } from "./AppReducer";

import { configureStore } from "@reduxjs/toolkit";
// ...
const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
