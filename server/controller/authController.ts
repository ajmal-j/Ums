import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { User, UserType } from "../model/UserModel";
import { hashPassword, matchPassword } from "../utils/bcrypt";
import { generateToken } from "../utils/jwt";
import expressAsyncHandler from "express-async-handler";
import { Admin } from "../model/AdminModel";
import { baseProfileUrl } from "../utils/helper";

const logIn = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, contact } = req.body;

  const user: UserType | null = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid Credential.");
  }
  const compare = await matchPassword(password, user.password);
  if (!compare) {
    throw new Error("Password not matches");
  }
  let token;
  if (user._id) token = generateToken(user._id);
  const userData = {
    email: user.email,
    name: user.name,
    profile: user.profile,
    contact: user.contact,
    id: user._id,
    token,
  };
  res.status(200).json({ userData });
});

const signUp = expressAsyncHandler(async (req: Request, res: Response) => {
  const { email, password, name, contact, profile } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Error("Email is already in use.");
  }
  const contactExist = await User.findOne({ contact });
  if (contactExist) {
    throw new Error("Contact in use.");
  }
  const encryptedPassword = await hashPassword(password);
  const data: UserType = {
    email,
    name,
    contact,
    password: encryptedPassword,
    profile: profile ? profile : baseProfileUrl,
  };

  await User.create(data)
    .then(() => {
      res.status(200).json();
    })
    .catch((error) => {
      console.log(error);
      throw new Error("Error while signUp.");
    });
});

const adminLogIn = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body.data;
  const user = await Admin.findOne({ email });
  if (!user) throw new Error("Invalid Credentials.");
  const comparePass = await matchPassword(password, user.password);
  if (!comparePass) throw new Error("Password not matches.");
  const data = {
    id: user._id,
    email: user.email,
    name: user.name,
    profile: user.profile,
    token: generateToken(user._id),
  };
  res.status(200).json({ adminData: data });
});

export { logIn, signUp, adminLogIn };
