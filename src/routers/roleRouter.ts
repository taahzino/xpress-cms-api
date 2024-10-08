import { Router } from "express";
import controller from "../controllers/role";
import { peopleAuth } from "../middleware/auth/peopleAuth";

const roleRouter = Router();

/**
 * @swagger
 * /roles:
 *   post:
 *     tags:
 *      - Roles
 *     summary: Create a new role
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the role
 *                 example: "Admin"
 *               capabilities:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: The capabilities of the role
 *                   example: "manage-roles"
 *             required:
 *               - name
 *               - capabilities
 *     responses:
 *       201:
 *         description: Role created successfully
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *
 */

roleRouter.post("/", peopleAuth(["manage-roles"]), controller.create);

/**
 * @swagger
 * /roles:
 *   get:
 *     tags:
 *      - Roles
 *     summary: Fetch all roles
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Roles fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Roles fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     roles:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           name:
 *                             type: string
 *                             example: Super Admin
 *                           capabilities:
 *                             type: array
 *                             items:
 *                               type: string
 *                             example: ["manage-everything"]
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: 2024-09-29T05:56:46.400Z
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: 2024-09-29T05:56:46.400Z
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

roleRouter.get("/", peopleAuth(["manage-roles"]), controller.fetch);

/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     tags:
 *      - Roles
 *     summary: Update a role by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the role to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the role
 *                 example: "Admin"
 *               capabilities:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: The capabilities of the role
 *                   example: "manage-roles"
 *     responses:
 *       200:
 *         description: Role updated successfully
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Role not found
 *
 */

roleRouter.put("/:id", peopleAuth(["manage-roles"]), controller.update);

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     tags:
 *      - Roles
 *     summary: Delete a role by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the role to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Role deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Role not found
 *
 */

roleRouter.delete("/:id", peopleAuth(["manage-roles"]), controller.delete);

export default roleRouter;
