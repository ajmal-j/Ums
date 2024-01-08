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

const editUser = expressAsyncHandler(async (req, res) => {
  const { email, contact, name, _id } = req.body.data;
  const exist = await User.findOne({ email, _id: { $ne: _id } });
  if (exist) throw new Error("Email already in use");
  await User.findByIdAndUpdate(_id, { email, contact, name });
  res.status(200).end();
});

const deleteUser = expressAsyncHandler(async (req, res) => {
  const id = req.body.data;
  console.log(id);
  res.status(200).end();
});

export { getAdminData, allUser, editUser ,deleteUser};
