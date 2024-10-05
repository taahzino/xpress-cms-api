import { Router } from "express";
import controller from "../../controllers/auth";

const authPeopleRouter = Router();

/**
 * @swagger
 *
 * /auth/people/login:
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

authPeopleRouter.post("/login", controller.login);

/**
 * @swagger
 * /auth/people/reset/request:
 *  post:
 *      summary: Request password reset
 *      produces:
 *          - application/json
 *      consumes:
 *          - application/json
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "example@example.com"
 *      responses:
 *       200:
 *        description: Successful request
 *       400:
 *        description: Invalid email
 */

authPeopleRouter.post("/reset/request", controller.reset.request("People"));

/**
 * @swagger
 * /auth/people/reset/verify:
 *   post:
 *     summary: Verify password reset
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
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Successful request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "OTP verified"
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: "A1B2C3D4E5F6G7H8I9J0"
 *       400:
 *         description: Invalid OTP
 */

authPeopleRouter.post("/reset/verify", controller.reset.verify("People"));

/**
 * @swagger
 * /auth/people/reset/perform:
 *   post:
 *     summary: Perform password reset
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
 *               token:
 *                 type: string
 *                 example: "A1B2C3D4E5F6G7H8I9J0"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Successful request
 *       400:
 *         description: Invalid password
 *       401:
 *         description: Unauthorized
 */

authPeopleRouter.post("/reset/perform", controller.reset.perform("People"));

export default authPeopleRouter;
