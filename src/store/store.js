import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../futures/user/userSlice";
import todoSlice from "../futures/todo/todoSlice";
import postSlice from "../futures/post/postSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    todo: todoSlice,
    post: postSlice,
  },
});
