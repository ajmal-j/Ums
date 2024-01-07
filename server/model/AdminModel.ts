import mongoose, { ObjectId, Schema } from "mongoose";

export interface AdminType {
  _id?: ObjectId;
  email: string;
  password: string;
  name?: string;
  profile:string;
}

const adminSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "Admin",
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
    profile: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  { timestamps: true }
);

export const Admin = mongoose.model<AdminType>("Admin", adminSchema);
