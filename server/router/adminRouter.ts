import express from "express";
import { allUser, editUser, getAdminData } from "../controller/adminController";
import { protectAdmin } from "../middlewares/authMiddleWare";

const adminRouter = express.Router();

adminRouter.get("/adminData", protectAdmin, getAdminData);
adminRouter.get("/allUser", protectAdmin, allUser);
adminRouter.patch("/editUser", protectAdmin, editUser);

export default adminRouter;
