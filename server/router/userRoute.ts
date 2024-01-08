import express from "express";
import { getData, home, updateImage, updateUser } from "../controller/userController";
import { protectUser } from "../middlewares/authMiddleWare";

const userRoute = express.Router();

userRoute.get("/", protectUser, home);
userRoute.get("/userData", protectUser, getData);
userRoute.patch("/updateUser", protectUser, updateUser);
userRoute.patch("/updateImage", protectUser, updateImage);

export { userRoute };
