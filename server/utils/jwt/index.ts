import jtw from "jsonwebtoken";
import { ObjectId } from "mongoose";
type GenerateToken = (id: ObjectId) => string;

export const generateToken: GenerateToken = (id) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT secret is missing!!");
  return jtw.sign({ id }, secret, {
    expiresIn: "30days",
  });
};
