import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const response = await axios.get(POSTS_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const updatePost = createAsyncThunk('posts/updatePost', async (post) => {
  const { id } = post;
  try {
    const response = await axios.put(`${POSTS_URL}/${id}`, post);
    return response.data;
  } catch (error) {
    return post;
    // throw error;
  }
});

export const deletePost = createAsyncThunk('posts/deletePost', async (post) => {
  const { id } = post;
  try {
    const response = await axios.delete(`${POSTS_URL}/${id}`, post);
    if (response.status === 200) return post;
    return `${response.status}: ${response.statusText}`;
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async (post) => {
  try {
    const response = await axios.post(POSTS_URL, post);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const postsSlice = createSlice({
  name: 'posts',
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
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';

        const loadedPosts = action.payload.map((post) => {
          post.date = new Date().toISOString();
          post.likesCount = Math.floor(Math.random() * 100);
          return post;
        });
        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.id = state.posts[state.posts.length - 1].id + 1;
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.likesCount = Math.floor(Math.random() * 100);
        console.log(action.payload);
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log('update could not complete', action.payload);
          return;
        }
        const { id } = action.payload;
        action.payload.date = new Date().toISOString();
        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = [...posts, action.payload];
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log('update could not complete', action.payload);
          return;
        }
        const { id } = action.payload;
        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = posts;
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
