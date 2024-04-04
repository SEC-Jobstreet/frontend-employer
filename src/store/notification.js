import { createSlice } from "@reduxjs/toolkit";

const init = {
  notification: {
    type: "", // error, success
    message: "",
  },
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState: init,
  reducers: {
    setDefaultNoti: (state) => {
      state.notification = {
        ...init.notification,
      };
    },
    setNotification: (state, action) => {
      const newState = action.payload;
      state.notification = {
        type: newState.type,
        message: newState.message,
      };
    },
  },
});

export const { setDefaultNoti, setNotification } = notificationSlice.actions;

export const selectNotification = (state) => state.notification.notification;

export default notificationSlice.reducer;
