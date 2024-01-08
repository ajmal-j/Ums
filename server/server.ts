import express, { Express, Request, Response } from "express";
import { auth as authRouter } from "./router/authentication";
import { errorHandler } from "./middlewares/errorHandler";
import { userRoute } from "./router/userRoute";
require("dotenv").config({ path: ".env" });
import { connect } from "./config/db";
const app: Express = express();
app.use(express.json());
import cors from "cors";
import adminAuth from "./router/adminAuth";
import adminRouter from "./router/adminRouter";
const port = 3000;
app.use(cors());
connect();

app.use("/user", userRoute);
app.use("/admin", adminRouter);
app.use("/auth", authRouter);
app.use("/adminAuth", adminAuth);

// not found handler
app.use("*", (req: Request, res: Response) => {
  res.status(404).send(`${req.originalUrl} Not Found`);
});

// error handler
app.use(errorHandler);
app.listen(port, () => {
  console.log("running");
});
