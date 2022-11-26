import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    username: "Guest",
    fullname: "Guest",
    image: "https://firebasestorage.googleapis.com/v0/b/hfc-resto.appspot.com/o/pizzas%2Fguest-user.jpg?alt=media&token=db829d3e-873c-4f50-b876-179998e49ba5"
  },
  reducers: {

    addUser: (state, action) => {
      state.id=action.payload.id;
      state.username=action.payload.username;
      state.fullname=action.payload.fullname;
      state.image=action.payload.image;
    },
    resetUser: (state) => {
      state.id = null;
      state.username = "Guest";
      state.fullname = "Guest";
      state.image = "https://firebasestorage.googleapis.com/v0/b/hfc-resto.appspot.com/o/pizzas%2Fguest-user.jpg?alt=media&token=db829d3e-873c-4f50-b876-179998e49ba5";
    },
  },
});

export const {  addUser, resetUser } = userSlice.actions;
export default userSlice.reducer;