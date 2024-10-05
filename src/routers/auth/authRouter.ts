import { Router } from "express";
import controller from "../../controllers/auth";
import { peopleAuth } from "../../middleware/auth/peopleAuth";
import authPeopleRouter from "./authPeopleRouter";

const authRouter = Router();

// Child Routers
authRouter.use("/people", authPeopleRouter);

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get user profile
 *     security:
 *       - bearerAuth: []  # Applies the Bearer token scheme to this route
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful request
 *       401:
 *         description: Unauthorized
 */
authRouter.get("/profile", peopleAuth(), controller.profile);

export default authRouter;
