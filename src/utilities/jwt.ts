import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "JWT_SECRET_KEY";

export const generateToken = (userId: number) => {
  return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: "7d" });
};
