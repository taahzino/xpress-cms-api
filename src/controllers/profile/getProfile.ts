import { Request, Response } from "express";
import {
  sendResponse,
  sendServerError,
  STATUS_OK,
} from "../../utilities/response";

export const getProfile = async (req: Request, res: Response) => {
  try {
    sendResponse(res, STATUS_OK, {
      message: "Profile fetched successfully",
      data: { profile: res.locals.user },
    });
  } catch (error) {
    sendServerError(res, error);
  }
};

export default [getProfile];
