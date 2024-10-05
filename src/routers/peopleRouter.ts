import { Router } from "express";
import createPeople from "../controllers/people/createPeople";
import { peopleAuth } from "../middleware/auth/peopleAuth";

const peopleRouter = Router();

/**
 * @swagger
 * /people:
 *   post:
 *     tags:
 *       - People
 *     summary: Create a new administrative user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: "Tahsin"
 *               lastname:
 *                 type: string
 *                 example: "Ahmed"
 *               email:
 *                 type: string
 *                 example: "taahzino@gmail.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               roleId:
 *                 type: integer
 *                 example: 1
 *               status:
 *                 type: boolean
 *                 example: true
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: Optional avatar image upload
 *             required:
 *               - firstname
 *               - lastname
 *               - email
 *               - password
 *               - roleId
 *               - status
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

peopleRouter.post("/", peopleAuth(["manage-users"]), createPeople);

export default peopleRouter;
