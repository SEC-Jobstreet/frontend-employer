import { createSlice } from "@reduxjs/toolkit";

const init = {
  account: {
    email: "",
    email_verified: false,
    name: "",
    picture: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState: init,
  reducers: {
    logoutAccount: (state) => {
      state.account = {
        ...init.account,
      };
    },
    loginAccount: (state, action) => {
      const newState = action.payload;
      state.account = {
        email: newState.email,
        name: newState.name,
        email_verified: newState.email_verified,
        picture: newState.picture,
      };
    },
  },
});

export const { loginAccount, logoutAccount } = userSlice.actions;

export const selectUser = (state) => state.user.account;

export default userSlice.reducer;
