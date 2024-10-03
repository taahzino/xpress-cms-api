import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { idSchema } from "../../schema/idSchema";
import {
  sendResponse,
  sendServerError,
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND,
} from "../../utilities/response";

const validateRoleId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const prisma = new PrismaClient();

  try {
    const { error } = idSchema.safeParse(req.params);

    if (error) {
      sendResponse(res, STATUS_BAD_REQUEST, {
        message: "Invalid role id",
      });

      return;
    }

    const roleId = idSchema.parse(req.params).id;

    const role = await prisma.role.findUnique({
      where: {
        id: roleId,
      },
      include: {
        People: true,
      },
    });

    if (!role) {
      sendResponse(res, STATUS_NOT_FOUND, {
        message: "Role not found",
      });

      return;
    }

    res.locals.role = role;

    next();
  } catch (error) {
    sendServerError(res, error);
  } finally {
    await prisma.$disconnect();
  }
};

export default validateRoleId;
