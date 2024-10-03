import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import validateRoleId from "../../middleware/role/validateRoleId";
import {
  sendResponse,
  sendServerError,
  STATUS_FORBIDDEN,
  STATUS_OK,
} from "../../utilities/response";

const deleteRole = async (req: Request, res: Response) => {
  const prisma = new PrismaClient();

  try {
    const { role } = res.locals;

    if (role.People.length > 0) {
      sendResponse(res, STATUS_FORBIDDEN, {
        message: "Role is assigned to some people",
      });

      return;
    }

    await prisma.role.delete({
      where: {
        id: role.id,
      },
    });

    sendResponse(res, STATUS_OK, {
      message: "Role deleted successfully",
    });

    return;
  } catch (error) {
    sendServerError(res, error);
  } finally {
    await prisma.$disconnect();
  }
};

export default [validateRoleId, deleteRole];
