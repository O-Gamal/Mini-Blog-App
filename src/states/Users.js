import { createSlice, nanoid } from "@reduxjs/toolkit";
import firstImg from "../assets/images/1.jpg";
import seccondImg from "../assets/images/2.jpg";

const initialState = [
  { id: "0", name: "Khaled Amr", img: seccondImg },
  { id: "1", name: "Mohamed Yasser" },
  { id: "2", name: "Omar Gamal", img: firstImg },
];

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const usersSelector = (state) => state.users;

export default userSlice.reducer;
