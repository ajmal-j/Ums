import express, { Express, Request, Response } from "express";
import { auth as authRouter } from "./router/authentication";
import { errorHandler } from "./middlewares/errorHandler";
import { userRoute } from "./router/userRoute";
require("dotenv").config({ path: ".env" });
import { connect } from "./config/db";
const app: Express = express();
app.use(express.json());
import cors from "cors";
const port = 3000;
app.use(cors());
connect();

app.use("/auth", authRouter);
app.use("/user", userRoute);

// not found handler
app.use("*", (req: Request, res: Response) => {
  res.status(404).send(`${req.originalUrl} Not Found`);
});

// error handler
app.use(errorHandler);
app.listen(port, () => {
  console.log("running");
});
