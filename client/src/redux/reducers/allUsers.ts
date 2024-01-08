import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "AllUsers",
  initialState: {
    users: [],
  },
  reducers: {
    getAllUsers: (state, action) => {
      const data = action.payload;
      console.log(data);
      state.users = data;
    },
  },
});

export const { getAllUsers } = userSlice.actions;
export default userSlice.reducer;
