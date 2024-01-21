import express from "express";
import {
  getData,
  home,
  updateImage,
  updateUser,
} from "../controller/userController";
import { protectUser } from "../middlewares/authMiddleWare";

const userRoute = express.Router();
userRoute.use(protectUser);

userRoute.get("/", home);
userRoute.get("/userData", getData);
userRoute.patch("/updateUser", updateUser);
userRoute.patch("/updateImage", updateImage);

export { userRoute };
