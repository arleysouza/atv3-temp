import { Router } from "express";
import {department} from "../controllers";
import { authAdmin } from "../middlewares";
const routes = Router();

routes.post('/', authAdmin, department.create);
routes.get('/:employees', department.list);

export default routes;