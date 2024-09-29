import { Request, Response, Router } from "express";

const peopleRouter = Router();

peopleRouter.get("/", (req: Request, res: Response) => {});

export default peopleRouter;
