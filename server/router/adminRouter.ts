import express from "express";
import { allUser, getAdminData } from "../controller/adminController";
import { protectAdmin } from "../middlewares/authMiddleWare";

const adminRouter = express.Router();

adminRouter.get("/adminData", protectAdmin, getAdminData);
adminRouter.get("/allUser", protectAdmin, allUser);

export default adminRouter;
