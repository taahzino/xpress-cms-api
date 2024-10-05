import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidV4 } from "uuid";

const SECRET_KEY = process.env.JWT_SECRET || "JWT_SECRET_KEY";

export const generateToken = (userId: number) => {
  return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: "7d" });
};

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const generateResetToken = () => {
  const key = uuidV4().toUpperCase();
  const hash = bcrypt.hashSync(key, 10);

  return { key, hash };
};
