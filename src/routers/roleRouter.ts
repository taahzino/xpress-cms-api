import { Router } from "express";
import createRole from "../controllers/role/createRole";
import { peopleAuth } from "../middleware/auth/peopleAuth";

const roleRouter = Router();

roleRouter.post("/", peopleAuth(["manage-roles"]), createRole);

export default roleRouter;
