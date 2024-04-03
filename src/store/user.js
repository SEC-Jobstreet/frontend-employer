import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    account: {
      email: "",
    },
  },
  reducers: {
    logoutAccount: (state) => {
      state.account = {
        email: "",
      };
    },
    loginAccount: (state, action) => {
      state.account = action.payload;
    },
  },
});

export const { loginAccount, logoutAccount } = userSlice.actions;

export const selectUser = (state) => state.user.account;

export default userSlice.reducer;
