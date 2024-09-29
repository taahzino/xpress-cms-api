import { Router } from "express";
import createPeople from "../controllers/people/createPeople";

const peopleRouter = Router();

peopleRouter.post("/", createPeople);

export default peopleRouter;
