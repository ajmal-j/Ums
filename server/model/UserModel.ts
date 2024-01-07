import mongoose, { ObjectId, Schema } from "mongoose";

export interface UserType {
  _id?: ObjectId;
  name: string;
  email: string;
  password: string;
  profile?: string;
  contact: number;
}

const userSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    contact: {
      type: Number,
    },
    profile: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<UserType>("User", userSchema);
