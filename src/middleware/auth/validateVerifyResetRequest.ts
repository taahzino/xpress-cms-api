import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { UserTypes } from "../../config/_constants";
import { emailAndOTPSchema } from "../../schema/shortSchemas";
import {
  sendResponse,
  sendServerError,
  sendZodErrors,
  STATUS_BAD_REQUEST,
} from "../../utilities/response";

const validateVerifyResetRequest = (type: UserTypes = "People") => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const prisma = new PrismaClient();

    try {
      const { error } = emailAndOTPSchema.safeParse(req.body);

      if (error) {
        sendZodErrors(res, error.errors);
        return;
      }

      const { email, otp } = emailAndOTPSchema.parse(req.body);

      const verification = await prisma.emailVerification.findFirst({
        where: {
          email,
          otp,
          userType: type,
          createdAt: {
            gte: new Date(Date.now() - 5 * 60 * 1000),
          },
        },
      });

      if (!verification) {
        sendResponse(res, STATUS_BAD_REQUEST, {
          message: "Invalid OTP",
        });
        return;
      }

      res.locals.verification = verification;

      next();
    } catch (error) {
      sendServerError(res, error);
    } finally {
      await prisma.$disconnect();
    }
  };
};

export default validateVerifyResetRequest;
