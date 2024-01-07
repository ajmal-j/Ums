import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { User } from "../model/UserModel";

export const protectJwt = expressAsyncHandler(async (req, res, next) => {
  // @ts-ignore
  const authorization = req.headers.authorization;

  if (authorization) {
    try {
      const secret = process.env.JWT_SECRET;
      if (!secret) throw new Error("JWT secret is missing!!");
      const decode = jwt.verify(authorization, secret);
      // @ts-ignore
      const user = await User.findOne({ _id: decode?.id }).select("-password");
      res.locals.user = user;
      next();
    } catch (error) {
      console.log(error);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});
