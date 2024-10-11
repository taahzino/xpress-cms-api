import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidV4 } from "uuid";

export const generateToken = (userId: number, public_key: string) => {
  return jwt.sign({ id: userId, public_key }, process.env.JWT_SECRET!, { expiresIn: "7d" });
};

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const generateResetToken = () => {
  const key = uuidV4().toUpperCase();
  const hash = bcrypt.hashSync(key, 10);

  return { key, hash };
};
