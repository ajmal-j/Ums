import express from "express";
import { adminLogIn } from "../controller/authController";

const adminAuth = express.Router();

adminAuth.post("/logIn", adminLogIn);

export default adminAuth;
