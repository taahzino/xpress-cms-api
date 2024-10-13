import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { v4 as uuidV4 } from "uuid";
import {
  sendResponse,
  sendServerError,
  STATUS_OK,
} from "../../utilities/response";

export default async function logoutPeople(req: Request, res: Response) {
  const prisma = new PrismaClient();

  try {
    const { user } = res.locals;

    await prisma.people.update({
      where: { id: user.id },
      data: { public_key: uuidV4().toUpperCase() },
    });

    return sendResponse(res, STATUS_OK, {
      message: "Logout successful",
    });
  } catch (error) {
    sendServerError(res, error);
  } finally {
    await prisma.$disconnect();
  }
}
