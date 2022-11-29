import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { User } from '../entities';

class UserController {

  public async create(req: Request, res: Response): Promise<Response> {
    let { name, mail, password, profile, idmaster, departments } = req.body;
    if (!name || name.trim().length == 0) {
      return res.json({ error: "Forneça o nome do empregado" });
    }
    if (!mail || mail.trim().length == 0) {
      return res.json({ error: "Forneça o e-mail do empregado" });
    }
    if (!password || password.trim().length == 0) {
      return res.json({ error: "Forneça a senha do colaborador" });
    }
    const object = new User();
    object.name = name.trim();
    object.mail = mail.trim();
    object.password = password.trim();
    if( profile !== ""){
        object.profile = profile;
    }

    const response: any = await AppDataSource.manager.save(User, object).catch((e) => {
      // testa se o mail é repetido
      if (/(mail)[\s\S]+(already exists)/.test(e.detail)) {
        return { error: 'Este e-mail já existe no cadastro' }
      }
      return { error: e.message }
    });
    if( !response.error ){
      const {iduser,name,mail,profile,manager,departments} = response;
      return res.json({iduser,name,mail,profile,manager,departments});
    }

    return res.json(response);
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const object: any = await AppDataSource.getRepository(User).find({
      order: {
        name: 'asc'
      }
    });
    return res.json(object);
  }

}

export default new UserController();