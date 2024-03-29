import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    account: {
      email: "",
    },
  },
  reducers: {
    logoutAccout: (state) => {
      state.account = {
        email: "",
      };
    },
    loginAccout: (state, action) => {
      state.account = action.payload;
    },
  },
});

export const { loginAccout, logoutAccout } = userSlice.actions;

export const selectUser = (state) => state.user.account;

export default userSlice.reducer;
