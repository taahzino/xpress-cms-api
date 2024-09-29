import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import validateRole from "../../middleware/role/validateRole";
import {
  sendResponse,
  sendServerError,
  STATUS_BAD_REQUEST,
  STATUS_CREATED,
} from "../../utilities/response";

export const createRole = async (req: Request, res: Response) => {
  const prisma = new PrismaClient();

  try {
    const data = res.locals.body;

    const role = await prisma.role.create({
      data,
    });

    if (!role) {
      sendResponse(res, STATUS_BAD_REQUEST, {
        message: "Failed to create role",
      });
    } else {
      sendResponse(res, STATUS_CREATED, {
        message: "Role created successfully",
        data: { role },
      });
    }
  } catch (error) {
    sendServerError(res, error);
  } finally {
    await prisma.$disconnect();
  }
};

export default [validateRole, createRole];
