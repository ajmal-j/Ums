import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

export const protectUser = expressAsyncHandler(async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    try {
      const secret = process.env.JWT_SECRET;
      if (!secret) throw new Error("JWT secret is missing!!");
      const decode = jwt.verify(authorization, secret);
      // @ts-ignore
      res.locals.userId = decode?.id;
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

export const protectAdmin = expressAsyncHandler(async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    try {
      const secret = process.env.JWT_SECRET;
      if (!secret) throw new Error("JWT secret is missing!!");
      const decode = jwt.verify(authorization, secret);
      // @ts-ignore
      res.locals.adminId = decode?.id;
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
