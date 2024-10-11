import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { peopleAuthSchema } from "../../schema/peopleSchema";
import { generateToken } from "../../utilities/auth";
import {
  formatZodErrors,
  sendResponse,
  sendServerError,
  STATUS_BAD_REQUEST,
  STATUS_OK,
  STATUS_UNAUTHORIZED,
} from "../../utilities/response";

const loginPeople = async (req: Request, res: Response) => {
  const prisma = new PrismaClient();

  try {
    const { error } = peopleAuthSchema.safeParse(req.body);

    if (error) {
      sendResponse(res, STATUS_BAD_REQUEST, {
        message: "You have some errors in your request",
        errors: formatZodErrors(error.errors),
      });
      return;
    }

    const { email, password } = peopleAuthSchema.parse(req.body);

    const user = await prisma.people.findUnique({
      where: { email, status: true },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return sendResponse(res, STATUS_UNAUTHORIZED, {
        message: "Invalid email or password",
      });
    }

    const userData: {
      id: number;
      public_key: string;
      email: string;
    } = {
      id: user.id,
      public_key: user.public_key,
      email: user.email,
    };

    const token = generateToken(user.id, user.public_key);

    sendResponse(res, STATUS_OK, {
      message: "Login successful",
      data: { token, ...userData },
    });
  } catch (error) {
    sendServerError(res, error);
  } finally {
    await prisma.$disconnect();
  }
};

export default [loginPeople];
