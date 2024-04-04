import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./notification";
import userReducer from "./user";

const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
