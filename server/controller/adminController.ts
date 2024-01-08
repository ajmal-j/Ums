import expressAsyncHandler from "express-async-handler";
import { Admin } from "../model/AdminModel";
import { User } from "../model/UserModel";

const getAdminData = expressAsyncHandler(async (req, res) => {
  const _id = res.locals.adminId;
  const admin = await Admin.findById({ _id }).select("-password");
  if (!admin) throw new Error("Admin Not Found");
  const { email, name, profile } = admin;
  res.status(200).json({ email, name, profile });
});

const allUser = expressAsyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
});

export { getAdminData, allUser };
