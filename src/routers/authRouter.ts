import { Router } from "express";
import loginPeople from "../controllers/auth/loginPeople";

const authRouter = Router();

authRouter.post("/login/people", loginPeople);

export default authRouter;
