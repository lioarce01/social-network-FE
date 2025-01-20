import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { userApi } from "./api/userApi";
import { postApi } from "./api/postApi";
import { commentApi } from "./api/commentApi";
import authReducer from "./slices/authSlice";
import { jobPostingApi } from "./api/jobPostingApi";
import jobReducer from "./slices/jobSlice";
import postReducer from "./slices/postSlice";

const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "auth", "jobs"],
};

const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
  [jobPostingApi.reducerPath]: jobPostingApi.reducer,
  [commentApi.reducerPath]: commentApi.reducer,
  jobs: jobReducer,
  posts: postReducer,
  auth: authReducer,
});

const localStorage = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: localStorage,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/FLUSH",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
      //concat api middlewares
    }).concat(
      userApi.middleware,
      postApi.middleware,
      jobPostingApi.middleware,
      commentApi.middleware,
    ),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
