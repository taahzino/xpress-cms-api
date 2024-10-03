import { NextFunction, Request, Response } from "express";
import { sendResponse, STATUS_BAD_REQUEST } from "../../utilities/response";

const validateJSON = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    err instanceof SyntaxError &&
    "status" in err &&
    err.status === 400 &&
    "body" in err
  ) {
    sendResponse(res, STATUS_BAD_REQUEST, {
      message: "Bad Request: Invalid JSON",
    });

    return;
  }

  next();
};

export default validateJSON;
