import { configureStore } from "@reduxjs/toolkit";
import lensStateReducer from "./slices/lensSlice";

export const store = configureStore({
  reducer: {
    lens: lensStateReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
