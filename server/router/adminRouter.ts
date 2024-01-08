import express from "express";
import { getAdminData } from "../controller/adminController";
import { protectAdmin } from "../middlewares/authMiddleWare";

const adminRouter = express.Router();

adminRouter.get("/adminData", protectAdmin, getAdminData);

export default adminRouter;
