import { Router } from "express";
import createPeople from "../controllers/people/createPeople";
import { peopleAuth } from "../middleware/auth/peopleAuth";

const peopleRouter = Router();

peopleRouter.post("/", peopleAuth, createPeople);

export default peopleRouter;
