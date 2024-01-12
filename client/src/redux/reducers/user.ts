import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserDataType } from "../../types/types";
import { axiosWithToken } from "../../utils/axios";
import toast from "react-hot-toast";
import { updateLocalStorage } from "../../utils/helper";

export type UserReduxType = {
  loading: boolean;
  error: string;
} & UserDataType;

const initialState: UserReduxType = {
  email: "",
  id: "",
  contact: 0,
  name: "",
  profile: "",
  loading: false,
  error: "",
};

export const updateUser = createAsyncThunk<UserDataType | unknown>(
  "User/updateUser",
  async (data: UserDataType | any, { rejectWithValue }) => {
    try {
      const response = await axiosWithToken.patch("/updateUser", { data });
      return response?.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser: (state, action) => {
      if (action.payload === null) {
        return initialState;
      }
      const { email, _id, name, profile, contact } = action.payload;
      state.email = email;
      state.contact = contact;
      state.id = _id;
      state.name = name;
      state.profile = profile;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const data: any = action.payload;
      state.error = "";
      const { email, name, contact } = data.user;
      state.email = email;
      state.name = name;
      state.contact = contact;
      updateLocalStorage({ email, name, contact });
      toast.success("Updated");
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      const error: unknown | string = action.payload;
      if (typeof error === "string") {
        state.error = error;
      } else {
        console.log(error);
      }
    });
  },
});

export const { setUser, setError, setLoading, setProfile } = userSlice.actions;
export default userSlice.reducer;
