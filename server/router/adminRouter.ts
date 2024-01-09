import express from "express";
import {
  allUser,
  createUserByAdmin,
  deleteUser,
  editUser,
  getAdminData,
  searchUser,
  updateUserProfile,
} from "../controller/adminController";
import { protectAdmin } from "../middlewares/authMiddleWare";

const adminRouter = express.Router();

adminRouter.get("/adminData", protectAdmin, getAdminData);
adminRouter.get("/allUser", protectAdmin, allUser);
adminRouter.patch("/editUser", protectAdmin, editUser);
adminRouter.delete("/deleteUser", protectAdmin, deleteUser);
adminRouter.patch("/updateImage", protectAdmin, updateUserProfile);
adminRouter.post("/searchUser", protectAdmin, searchUser);
adminRouter.post("/createUserByAdmin", protectAdmin, createUserByAdmin);

export default adminRouter;
