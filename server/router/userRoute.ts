import express from "express";
import { home } from "../controller/userController";
import { protectJwt } from "../middlewares/authMiddleWare";

const userRoute = express.Router();

userRoute.get("/",protectJwt, home);

export { userRoute };
