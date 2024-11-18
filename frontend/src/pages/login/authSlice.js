import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUser: (state) => {
      console.log(state);
      return { ...state };
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment } = authSlice.actions;

export default authSlice.reducer;
