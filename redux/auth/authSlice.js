import { createSlice } from "@reduxjs/toolkit";

const initialState = {
user : {},
};
const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    addUser: {
      reducer(state, action) {
        state.user = action.payload;
      },
    },

    removeUser: {
      reducer(state, action) {
        state.user = null;
      },
    },
  },
});

export const SelectUser = (state) => {
  return state.auth.user;
};

export default authSlice.reducer;

export const { addUser, removeUser } = authSlice.actions;
