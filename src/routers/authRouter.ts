import { Router } from "express";
import loginPeople from "../controllers/auth/loginPeople";

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

authRouter.post("/login/people", loginPeople);

export default authRouter;
