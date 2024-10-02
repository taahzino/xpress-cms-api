import { Router } from "express";
import controller from "../controllers/auth";
import { peopleAuth } from "../middleware/auth/peopleAuth";

const authRouter = Router();

/**
 * @swagger
 *
 * /auth/login/people:
 *   post:
 *     summary: Login user
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "example@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 *       401:
 *        description: Invalid email or password
 */

authRouter.post("/login/people", controller.login);

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
