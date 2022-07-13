import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(POSTS_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const addNewPost = createAsyncThunk("posts/addNewPost", async (post) => {
  try {
    const response = await axios.post(POSTS_URL, post);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: {
      reducer: (state, action) => {
        state.posts.push(action.payload);
      },
      prepare: (title, body, userId) => ({
        payload: {
          id: nanoid(),
          title,
          body,
          userId,
          date: new Date().toISOString(),
          likesCount: 0,
        },
      }),
    },
    likePost: (state, action) => {
      const post = state.posts.find((post) => post.id === action.payload);
      if (post) {
        post.likesCount += 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";

        const loadedPosts = action.payload.map((post) => {
          post.date = new Date().toISOString();
          post.likesCount = Math.floor(Math.random() * 100);
          return post;
        });
        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.likesCount = Math.floor(Math.random() * 100);
        console.log(action.payload);
        state.posts.push(action.payload);
      });
  },
});

export const postsSelector = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId);

export const { addPost, likePost } = postsSlice.actions;

export default postsSlice.reducer;
