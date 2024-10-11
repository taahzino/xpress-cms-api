import express, { NextFunction, Request, Response, Router } from "express";
import _globals from "../config/_globals";
import {
  sendResponse,
  sendServerError,
  STATUS_NOT_FOUND,
  STATUS_OK,
} from "../utilities/response";
import authRouter from "./auth/authRouter";
import peopleRouter from "./peopleRouter";
import profileRouter from "./profileRouter";
import roleRouter from "./roleRouter";

const appRouter = Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

// Root Route: Health Check
appRouter.get("/", (req: Request, res: Response) => {
  sendResponse(res, STATUS_OK, {
    message: "xpress-cms is awesome!",
  });
  return;
});

// Auth Router: Authentication
appRouter.use("/auth", authRouter);

// Role Router: Manage Roles
appRouter.use("/roles", roleRouter);

// People Router: Manage People
appRouter.use("/people", peopleRouter);

// People Router: User Profile
appRouter.use("/profile", profileRouter);

// Public folder
appRouter.use("/x-public", express.static(_globals.PUBLIC_DIR));

// Catch 404 and forward to error handler
appRouter.use((req: Request, res: Response) => {
  sendResponse(res, STATUS_NOT_FOUND, {
    message: "404 Not Found",
  });
  return;
});

// Internal Server Error Handler
appRouter.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  sendServerError(res, err);
  return;
});

export default appRouter;
