import { configureStore } from "@reduxjs/toolkit";
import websiteReducer from "../features/websites/websiteSlice";

const rootReducer = { website: websiteReducer };

const store = configureStore({
  reducer: rootReducer,
});

export default store;
