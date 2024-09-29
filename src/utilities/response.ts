import { Response } from "express";
import { ZodIssue } from "zod";

interface customError {
  field: string;
  message: string;
}

interface ResponseBody {
  message: string;
  data?: object | Array<any>;
  errors?: Array<customError>;
}

type ResponseCode = 201 | 200 | 204 | 400 | 401 | 403 | 404 | 409 | 500;

export const STATUS_CREATED = 201;
export const STATUS_OK = 200;
export const STATUS_NO_CONTENT = 204;
export const STATUS_BAD_REQUEST = 400;
export const STATUS_UNAUTHORIZED = 401;
export const STATUS_FORBIDDEN = 403;
export const STATUS_NOT_FOUND = 404;
export const STATUS_CONFLICT = 409;
export const STATUS_INTERNAL_SERVER_ERROR = 500;

export const sendResponse = (
  res: Response,
  code: ResponseCode,
  body: ResponseBody,
  callback?: Function
) => {
  res.status(code).json(body);

  if (callback) {
    callback();
  }

  if (res.locals.fallback && !code.toString().startsWith("2")) {
    res.locals.fallback();
  }

  return;
};

export const sendServerError = (res: Response, error: any) => {
  console.error(error);
  sendResponse(res, STATUS_INTERNAL_SERVER_ERROR, {
    message: "Internal Server Error",
  });

  if (res.locals.fallback) {
    res.locals.fallback();
  }

  return;
};

export const formatZodErrors = (errors: ZodIssue[]) => {
  return errors.map((err: ZodIssue) => {
    return {
      field: err.path.join("."),
      message: err.message,
    };
  });
};
