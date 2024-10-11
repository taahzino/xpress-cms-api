import { Router } from "express";
import controller from "../controllers/profile";
import { peopleAuth } from "../middleware/auth/peopleAuth";

const profileRouter = Router();

/**
 * @swagger
 * /profile:
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
profileRouter.get("/", peopleAuth(), controller.get);

export default profileRouter;
