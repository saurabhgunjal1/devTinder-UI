import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import userFeed from "./feedSlice.js";
import connectionsSlice from "./connectionsSlice.js";
import requestSlice from "./requestsSlice.js";
export const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: userFeed,
    connections: connectionsSlice,
    requests: requestSlice,
  },
});
