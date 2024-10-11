import { Router } from "express";
import authPeopleRouter from "./authPeopleRouter";

const authRouter = Router();

// Child Routers
authRouter.use("/people", authPeopleRouter);

export default authRouter;
