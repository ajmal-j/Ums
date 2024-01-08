import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/user";
import adminReducer from "../reducers/admin";

export const store = configureStore({
  reducer: {
    userReducer,
    adminReducer,
  },
});
