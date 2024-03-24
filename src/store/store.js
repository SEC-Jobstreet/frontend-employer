import { configureStore } from "@reduxjs/toolkit";

export default function configureAppStore() {
  const store = configureStore({
    reducer: {},
  });

  return store;
}
