import { Router } from "express";
import controller from "../controllers/role";
import { peopleAuth } from "../middleware/auth/peopleAuth";

const roleRouter = Router();

/**
 * @swagger
 * /roles:
 *   post:
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
 * /roles/{id}:
 *   put:
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
