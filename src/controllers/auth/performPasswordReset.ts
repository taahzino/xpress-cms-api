import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { UserTypes } from "../../config/_constants";
import validatePerformPasswordReset from "../../middleware/auth/validatePerformPasswordReset";
import {
  sendResponse,
  sendServerError,
  STATUS_OK,
} from "../../utilities/response";

const performPasswordReset = (type: UserTypes = "People") => {
  return [
    validatePerformPasswordReset(type),
    async (req: Request, res: Response) => {
      const prisma = new PrismaClient();
      try {
        const { data } = res.locals;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);

        await prisma.people.update({
          where: {
            email: data.email,
          },
          data: {
            password: hashedPassword,
          },
        });

        sendResponse(res, STATUS_OK, {
          message: "Your password has been reset successfully",
        });

        return;
      } catch (error) {
        sendServerError(res, error);
      } finally {
        await prisma.$disconnect();
      }
    },
  ];
};

export default performPasswordReset;
