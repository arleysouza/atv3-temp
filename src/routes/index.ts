import { Router, Request, Response } from "express";
import deparment from './department';
import user from './user';
import { authorization } from "../middlewares";
const routes = Router();

routes.use("/department", authorization, deparment);
routes.use("/user", authorization, user);

//aceita qualquer método HTTP ou URL
routes.use((req: Request, res: Response) => res.json({ error: "Requisição desconhecida" }));

export default routes;