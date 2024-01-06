import express, { Express, Request, Response } from "express";
import cors from "cors";
const port = 3000;
const app: Express = express();
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("his");
});

app.get("/run", (req, res) => {
  res.send("typescript");
});

app.listen(port, () => {
  console.log("running");
});
