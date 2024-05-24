import express, { Express, NextFunction, Request, Response } from "express";
import { auth as authRouter } from "./router/authentication";
import { errorHandler } from "./middlewares/errorHandler";
import { userRoute } from "./router/userRoute";
import adminRouter from "./router/adminRouter";
require("dotenv").config({ path: ".env" });
import adminAuth from "./router/adminAuth";
import { connect } from "./config/db";
const app: Express = express();
app.use(express.json());
import cors from "cors";
const port = 3000;

app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "https://weatherglance.vercel.app",
      "http://localhost:4173",
    ],
    credentials: true,
  })
);
connect();

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  console.log(req.method, "-", req.originalUrl);
  next();
});

app.get("/api/v1/", (_, res) => {
  res.send("working");
});

// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/adminAuth", adminAuth);

// not found handler
app.use("*", (req: Request, res: Response) => {
  console.log(req.method, "-", req.originalUrl,'- not found');
  res.status(404).send(`${req.originalUrl} Not Found`);
});

// error handler
app.use(errorHandler);

// listening
app.listen(port, () => {
  console.log(`Running server on : http://localhost:${port}`);
});
