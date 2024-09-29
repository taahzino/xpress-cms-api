import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import validatePeople from "../../middleware/people/validatePeople";
import validatePeopleAvatar from "../../middleware/people/validatePeopleAvatar";
import {
  sendResponse,
  sendServerError,
  STATUS_BAD_REQUEST,
  STATUS_CREATED,
} from "../../utilities/response";

export const createPeople = async (req: Request, res: Response) => {
  const prisma = new PrismaClient();

  try {
    const data = res.locals.body;

    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);

    const user = await prisma.people.create({
      data: {
        ...data,
        ...res.locals.uploads,
      },
    });

    if (!user) {
      sendResponse(res, STATUS_BAD_REQUEST, {
        message: "Failed to create user",
      });
    } else {
      let userObj: {
        [prop: string]: any;
      } = { ...user };
      delete userObj.password;

      sendResponse(res, STATUS_CREATED, {
        message: "User created successfully",
        data: {
          user: userObj,
        },
      });
    }
  } catch (error) {
    sendServerError(res, error);
  } finally {
    await prisma.$disconnect();
  }
};

export default [validatePeopleAvatar, validatePeople, createPeople];
