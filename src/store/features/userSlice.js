import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: true,
    user: null,
  },
  reducers: {
    login: (state, action) => {
      const { photoUrl, displayName, uid, email } = action.payload;
      state.loading = false;
      state.user = action.payload;
      state.user = { photoUrl, displayName, uid, email };
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export const selectUser = (state) => state.user; // selectors
export default userSlice.reducer;
