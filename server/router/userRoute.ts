import express from "express";
import { getData, home, updateImage, updateUser } from "../controller/userController";
import { protectJwt } from "../middlewares/authMiddleWare";

const userRoute = express.Router();

userRoute.get("/", protectJwt, home);
userRoute.get("/userData", protectJwt, getData);
userRoute.patch("/updateUser", protectJwt, updateUser);
userRoute.patch("/updateImage", protectJwt, updateImage);

export { userRoute };
