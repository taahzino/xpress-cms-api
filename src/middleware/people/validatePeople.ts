import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { peopleSchema } from "../../schema/peopleSchema";
import {
  formatZodErrors,
  sendResponse,
  sendServerError,
  STATUS_BAD_REQUEST,
} from "../../utilities/response";

const validatePeople = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = peopleSchema.safeParse(req.body);

    if (error) {
      sendResponse(res, STATUS_BAD_REQUEST, {
        message: "You have some errors in your request",
        errors: formatZodErrors(error.errors),
      });
      return;
    }

    res.locals.body = peopleSchema.parse(req.body);

    const prisma = new PrismaClient();

    const role = await prisma.role.findUnique({
      where: {
        id: res.locals.body.roleId,
      },
    });

    if (!role) {
      sendResponse(res, STATUS_BAD_REQUEST, {
        message: "Role does not exist",
      });

      await prisma.$disconnect();

      return;
    }

    console.log(res.locals.body);
    

    const user = await prisma.people.findUnique({
      where: {
        email: res.locals.body.email,
      },
    });

    if (user) {
      sendResponse(res, STATUS_BAD_REQUEST, {
        message: "Email already exists",
      });

      await prisma.$disconnect();

      return;
    }

    next();
  } catch (error) {
    sendServerError(res, error);
  }
};

export default validatePeople;
