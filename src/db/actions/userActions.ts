import { Request, Response } from 'express';
import { Helper } from '../../common/helpers';
import UserDB, { User_DB } from '../models_DB/user_DB';
import { User } from '../../Models/user';

export class UserController {
  constructor() {}

  public async getUserDB(req: Request, res: Response) {
    try {
      res.status(200).send('');
    } catch (err) {
      res.status(500).send(err);
    }
  }

  public async addUserDB(req: Request, res: Response) {
    const name: string = req.body.name;
    const email: string = req.body.email;
    const password: string = req.body.password;
    const newUser: User = new User(name, email);
    newUser.setPassword(password);

    const isEmailValid: boolean = newUser.emailValidator();
    const doesUserExist: User_DB | any = UserDB.findOne({ email: email });
    try {
      if (isEmailValid) {
        if (doesUserExist != null) {
          await UserDB.create({
            name: newUser.getName(),
            email: newUser.getEmail(),
            password: newUser.getPassword(),
            tokens: [],
            events: [],
          });
        } else {
          res.status(400).send({ message: 'User already exits' });
        }
        res.status(200).send({ message: 'User added to DB' });
      } else {
        res.status(400).send({ message: 'Email adress is not valid' });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }
  public async editUserDB(req: Request, res: Response) {}

  public async removeUserDB(req: Request, res: Response) {}

  public async logInDB(req: Request, res: Response) {}
  public async logOutDB(req: Request, res: Response) {}

  public async userAddEventToCartDB(req: Request, res: Response) {}
}
