import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { roleSchema } from "../../schema/roleSchema";
import {
  formatZodErrors,
  sendResponse,
  sendServerError,
  STATUS_BAD_REQUEST,
} from "../../utilities/response";

const validateRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = roleSchema.safeParse(req.body);

    if (error) {
      sendResponse(res, STATUS_BAD_REQUEST, {
        message: "You have some errors in your request",
        errors: formatZodErrors(error.errors),
      });
      return;
    }

    res.locals.body = roleSchema.parse(req.body);

    const prisma = new PrismaClient();

    const role = await prisma.role.findUnique({
      where: {
        name: res.locals.body.name,
      },
    });

    if (role) {
      sendResponse(res, STATUS_BAD_REQUEST, {
        message: "Role already exists",
      });

      await prisma.$disconnect();

      return;
    }

    next();
  } catch (error) {
    sendServerError(res, error);
  }
};

export default validateRole;
