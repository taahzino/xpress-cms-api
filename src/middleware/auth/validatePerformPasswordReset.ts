import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { UserTypes } from "../../config/_constants";
import { resetPasswordSchema } from "../../schema/shortSchemas";
import {
  sendResponse,
  sendServerError,
  sendZodErrors,
  STATUS_UNAUTHORIZED,
} from "../../utilities/response";

const validatePerformPasswordReset = (type: UserTypes = "People") => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const prisma = new PrismaClient();

    try {
      const { error } = resetPasswordSchema.safeParse(req.body);

      if (error) {
        sendZodErrors(res, error.errors);
        return;
      }

      const { email, token, password } = resetPasswordSchema.parse(req.body);

      const verification = await prisma.emailVerification.findFirst({
        where: {
          email,
          userType: type,
          createdAt: {
            gte: new Date(Date.now() - 10 * 60 * 1000),
          },
        },
      });

      if (
        !verification ||
        !verification.token ||
        !(await bcrypt.compare(token, verification.token))
      ) {
        sendResponse(res, STATUS_UNAUTHORIZED, {
          message: "Unauthorized",
        });
        return;
      }

      await prisma.emailVerification.deleteMany({
        where: {
          email,
        },
      });

      res.locals.data = { email, password };

      next();
    } catch (error) {
      sendServerError(res, error);
    } finally {
      await prisma.$disconnect();
    }
  };
};

export default validatePerformPasswordReset;
