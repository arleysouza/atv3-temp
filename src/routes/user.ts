import { Router } from "express";
import {user} from "../controllers";
import { authManager } from "../middlewares";
const routes = Router();

routes.post('/', authManager, user.create);
routes.get('/', user.list);

export default routes;