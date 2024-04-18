import { createSlice } from "@reduxjs/toolkit";

const init = {
  account: {
    email: "",
    email_verified: false,
    firstName: "",
    lastName: "",
    picture: "",
    phone: "",
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
        firstName: newState.firstName,
        lastName: newState.lastName,
        email_verified: newState.email_verified,
        picture: newState.picture,
        phone: newState.phone,
      };
    },
  },
});

export const { loginAccount, logoutAccount } = userSlice.actions;

export const selectUser = (state) => state.user.account;

export default userSlice.reducer;
