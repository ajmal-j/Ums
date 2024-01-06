import { Request, Response } from "express";

const logIn = async (req: Request, res: Response) => {
  res.json({ message: "hi" });
};

export {
  logIn,
};
