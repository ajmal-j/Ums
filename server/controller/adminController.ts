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
  const { id } = req.body;
  await User.findByIdAndDelete(id);
  res.status(200).end();
});

const updateUserProfile = expressAsyncHandler(async (req, res) => {
  const { url, id } = req.body.data;
  await User.findByIdAndUpdate(id, { $set: { profile: url } });
  res.status(200).end();
});

const searchUser = expressAsyncHandler(async (req, res) => {
  const query = req.body.data;
  let regexQuery;
  const parsedNumber = Number(query);
  if (!isNaN(parsedNumber)) {
    regexQuery = {
      $or: [{ contact: { $eq: parsedNumber } }],
    };
  } else {
    regexQuery = {
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    };
  }
  const data = await User.find(regexQuery);
  res.status(200).json(data);
});

export {
  getAdminData,
  allUser,
  editUser,
  deleteUser,
  updateUserProfile,
  searchUser,
};
