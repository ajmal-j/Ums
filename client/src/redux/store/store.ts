import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/user";
import adminReducer from "../reducers/admin";
import allUserReducer from "../reducers/allUsers";

export const store = configureStore({
  reducer: {
    userReducer,
    adminReducer,
    allUserReducer,
  },
});
