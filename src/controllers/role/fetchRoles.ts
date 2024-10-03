import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import {
  sendResponse,
  sendServerError,
  STATUS_BAD_REQUEST,
  STATUS_CREATED,
} from "../../utilities/response";

export const fetchRoles = async (req: Request, res: Response) => {
  const prisma = new PrismaClient();

  try {
    const roles = await prisma.role.findMany({});

    if (!roles) {
      sendResponse(res, STATUS_BAD_REQUEST, {
        message: "No roles found",
      });
    } else {
      sendResponse(res, STATUS_CREATED, {
        message: "Roles fetched successfully",
        data: { roles },
      });
    }
  } catch (error) {
    sendServerError(res, error);
  } finally {
    await prisma.$disconnect();
  }
};

export default [fetchRoles];
