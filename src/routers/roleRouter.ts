import { Router } from "express";
import createRole from "../controllers/role/createRole";

const roleRouter = Router();

roleRouter.post("/", createRole);

export default roleRouter;
