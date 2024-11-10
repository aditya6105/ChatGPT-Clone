import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";

// Create a JWT token
export const createToken = (
  id: string,
  email: string,
  expiresIn: string
): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  const payload = { id, email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });
  return token;
};

// Verify the JWT token middleware
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies[COOKIE_NAME];

  if (!token || token.trim() === "") {
    return res.status(401).json({ message: "Token Not Received" });
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    // Verify token asynchronously using promise-based API
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;
    res.locals.jwtData = decoded; // Attach decoded data to res.locals

    return next();
  } catch (err: unknown) {
    console.error(err);
    return res.status(401).json({ message: "Token Expired or Invalid" });
  }
};
