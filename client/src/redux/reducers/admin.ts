import { createSlice } from "@reduxjs/toolkit";
import { adminDataType } from "../../types/types";

export type AdminReduxType = {
  loading: boolean;
  error: string;
} & adminDataType;

const initialState: AdminReduxType = {
  email: "",
  id: "",
  name: "",
  profile: "",
  loading: false,
  error: "",
};

const adminSlice = createSlice({
  name: "Admin",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      const { name, email, profile } = action.payload;
      state.email = email;
      state.name = name;
      state.profile = profile;
    },
  },
  
});

export const { setAdmin } = adminSlice.actions;
export default adminSlice.reducer;
