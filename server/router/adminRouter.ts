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
adminRouter.use(protectAdmin);

adminRouter.get("/adminData", getAdminData);
adminRouter.get("/allUser", allUser);
adminRouter.patch("/editUser", editUser);
adminRouter.delete("/deleteUser", deleteUser);
adminRouter.patch("/updateImage", updateUserProfile);
adminRouter.post("/searchUser", searchUser);
adminRouter.post("/createUserByAdmin", createUserByAdmin);

export default adminRouter;
