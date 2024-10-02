import express, { NextFunction, Request, Response, Router } from "express";
import _globals from "../config/_globals";
import authRouter from "./authRouter";
import peopleRouter from "./peopleRouter";
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

appRouter.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Hello World!",
  });
  return;
});

appRouter.use("/auth", authRouter);
appRouter.use("/roles", roleRouter);
appRouter.use("/people", peopleRouter);

appRouter.use("/public", express.static(_globals.PUBLIC_DIR));

// Catch 404 and forward to error handler
appRouter.use((req: Request, res: Response) => {
  res.status(404).json({ message: "404 Not Found" });
  return;
});

// Internal Server Error Handler
appRouter.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    message: "Internal Server Error",
  });
  return;
});

export default appRouter;
