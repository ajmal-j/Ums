import express, { Router } from "express";
import { logIn } from "../controller/userController";

const auth: Router = express.Router();

auth.get('/logIn',logIn)
