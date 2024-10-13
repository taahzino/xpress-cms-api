import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Capabilities } from "../../config/_constants";
import logger from "../../config/_logger";
import {
  sendResponse,
  STATUS_FORBIDDEN,
  STATUS_UNAUTHORIZED,
} from "../../utilities/response";

const prisma = new PrismaClient();

export const peopleAuth = (capabilities: Capabilities[] = []) => {
  let allowedCapabilities: Capabilities[] = [];

  if (capabilities.length > 0) {
    // add manage-everything to the capabilities
    allowedCapabilities = ["manage-everything", ...capabilities];

    // remove duplicates
    allowedCapabilities = allowedCapabilities.filter(
      (capability, index) => allowedCapabilities.indexOf(capability) === index
    );
  }

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      let token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return sendResponse(res, STATUS_UNAUTHORIZED, {
          message: "Unauthorized access",
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET!);

      if (
        !decoded ||
        typeof decoded === "string" ||
        !decoded.id ||
        !decoded.public_key
      ) {
        return sendResponse(res, STATUS_UNAUTHORIZED, {
          message: "Unauthorized access",
        });
      }

      const user = await prisma.people.findUnique({
        where: {
          id: decoded.id,
          public_key: decoded.public_key,
          status: true,
        },
        include: {
          role: true,
        },
      });

      if (!user) {
        return sendResponse(res, STATUS_UNAUTHORIZED, {
          message: "Unauthorized access",
        });
      }

      res.locals.user = { ...user };
      delete res.locals.user.password;

      if (allowedCapabilities.length > 0) {
        let userCapabilities = res.locals.user.role.capabilities;

        let canAccess = allowedCapabilities.some((capability) =>
          userCapabilities.includes(capability)
        );

        if (!canAccess) {
          return sendResponse(res, STATUS_FORBIDDEN, {
            message: "You do not have access to this resource",
          });
        }
      }

      next();
    } catch (error) {
      logger.error(error);
      return sendResponse(res, STATUS_UNAUTHORIZED, {
        message: "Unauthorized access",
      });
    }
  };
};
