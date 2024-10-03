import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import validateRole from "../../middleware/role/validateRole";
import validateRoleId from "../../middleware/role/validateRoleId";
import {
  sendResponse,
  sendServerError,
  STATUS_BAD_REQUEST,
  STATUS_CREATED,
} from "../../utilities/response";

export const updateRole = async (req: Request, res: Response) => {
  const prisma = new PrismaClient();

  try {
    const { body: data, role } = res.locals;

    const updatedRole = await prisma.role.update({
      where: {
        id: role.id,
      },
      data,
    });

    if (!updatedRole) {
      sendResponse(res, STATUS_BAD_REQUEST, {
        message: "Failed to update role",
      });
    } else {
      sendResponse(res, STATUS_CREATED, {
        message: "Role updated successfully",
        data: { role: updatedRole },
      });
    }
  } catch (error) {
    sendServerError(res, error);
  } finally {
    await prisma.$disconnect();
  }
};

export default [validateRoleId, validateRole, updateRole];
