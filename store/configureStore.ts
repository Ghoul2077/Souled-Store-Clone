import { configureStore, Middleware } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import logger from "./middleware/logger";
import api from "./middleware/api";
import persistReducer from "./reducer";
import { NODE_ENV } from "@env";

const middleware: Array<Middleware> = [api];

if (NODE_ENV === "development") {
  middleware.push(logger({ destination: "console" }));
}

const store = configureStore({
  reducer: persistReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middleware),
});

export default function createStore() {
  const persistor = persistStore(store);
  return { store, persistor };
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
