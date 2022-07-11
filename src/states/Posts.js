import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    title: "Non elit enim",
    body: "Non elit enim consectetur sunt tempor et ut do aute.",
    date: "2020-01-01",
    likesCount: 0,
  },
  {
    id: "2",
    title: "Sunt aliqua eiusmod",
    body: "Sunt aliqua eiusmod cillum do cupidatat consectetur aliquip sint ex qui nulla est.",
    userId: "2",
    date: "2022-04-06",
    likesCount: 0,
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: {
      reducer: (state, action) => {
        state.push(action.payload);
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
      const post = state.find((post) => post.id === action.payload);
      if (post) {
        post.likesCount += 1;
      }
    },
  },
});

export const postsSelector = (state) => state.posts;

export const { addPost, likePost } = postsSlice.actions;

export default postsSlice.reducer;
