import { configureStore } from "@reduxjs/toolkit";
import postsReducert from "./Posts.js";
import usersReducer from "./Users.js";

export default configureStore({
  reducer: {
    posts: postsReducert,
    users: usersReducer,
  },
});
