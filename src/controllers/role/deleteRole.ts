import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import validateRoleId from "../../middleware/role/validateRoleId";
import {
  sendResponse,
  sendServerError,
  STATUS_OK,
} from "../../utilities/response";

const deleteRole = async (req: Request, res: Response) => {
  const prisma = new PrismaClient();

  try {
    const role = res.locals.role;

    await prisma.role.delete({
      where: {
        id: role.id,
      },
    });

    sendResponse(res, STATUS_OK, {
      message: "Role deleted successfully",
    });
  } catch (error) {
    sendServerError(res, error);
  } finally {
    await prisma.$disconnect();
  }
};

export default [validateRoleId, deleteRole];
