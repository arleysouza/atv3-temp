import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Department } from '../entities';

class DepartmentController {

    public async create(req: Request, res: Response): Promise<Response> {
        let { name } = req.body;
        if (!name || name.trim().length == 0) {
            return res.json({ error: "Forneça o nome do departamento" });
        }
        const object = new Department();
        object.name = name.trim();;
        const turno: any = await AppDataSource.manager.save(Department, object).catch((e) => {
            // testa se o name é repetido
            if (/(name)[\s\S]+(already exists)/.test(e.detail)) {
                return { error: 'Já existe um departamento com este nome' };
            }
            return e.message;
        })
        return res.json(turno);
    }

    public async list(req: Request, res: Response): Promise<Response> {
        const {employees} = req.params;
        const object: any = await AppDataSource.getRepository(Department).find({
            order: {
                name: 'asc',
            }
        });
        return res.json(object);
    }

}

export default new DepartmentController();