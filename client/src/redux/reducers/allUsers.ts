import { createSlice } from "@reduxjs/toolkit";
import { AllUserType } from "../../types/types";

export type AllUserReduxType = { users: AllUserType };

const initialState: AllUserReduxType = {
  users: [],
};

const userSlice = createSlice({
  name: "AllUsers",
  initialState,
  reducers: {
    setAllUsers: (state, action) => {
      const data = action.payload;
      state.users = data;
    },
  },
});

export const { setAllUsers } = userSlice.actions;
export default userSlice.reducer;
