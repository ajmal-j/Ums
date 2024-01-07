import expressAsyncHandler from "express-async-handler";
import { User } from "../model/UserModel";

const home = expressAsyncHandler(async (req, res) => {
  res.send("Some Data With Authorization");
});

const getData = expressAsyncHandler(async (req, res) => {
  const { _id, name, email, profile, contact, ...rest } = res.locals.user;
  res.status(200).json({ user: { _id, name, email, profile, contact } });
});

const updateUser = expressAsyncHandler(async (req, res) => {
  const { _id } = res.locals.user;
  const { data } = req.body;

  if (!data) throw new Error("Please provide a valid data");
  const userExist = await User.findOne({
    email: data.email,
    _id: { $ne: _id },
  });
  if (userExist) throw new Error("Email already taken");
  const user = await User.findByIdAndUpdate(
    _id,
    { $set: { name: data.name, email: data.email, contact: data.contact } },
    { new: true }
  )
    .select("-password -createdAt -updatedAt")
    .exec();
  if (!user) throw new Error("User not fount");
  
  res.status(200).json({
    user: {
      name: user.name,
      email: user.email,
      contact: user.contact,
    },
  });
});

export { home, getData, updateUser };
