import { Request, Response, NextFunction } from "express-serve-static-core";

import { checkValidationErrors, hashPassword, compareHashedPasswords, generateLogin } from "../utils/helpers";
import UserService from "../services/UserService";
import { UserGetDTO } from "../dto/models/userDTO";
import SessionService from "../services/SessionService";
import APIError from "../exceptions/api-error";
import { BaseUserType } from "../types/models/userTypes";
import User from "../models/User";


class UserController {
    // basic
    async register(req: Request, res: Response, next: NextFunction) {
        try {   
            await checkValidationErrors(req);
            // hashing
            req.body.password = await hashPassword(req.body.password);
            req.body.login = await generateLogin();

            // creating new user
            const newUser: UserGetDTO = await UserService.create(req.body);
            res.status(201).send(newUser);

        } catch(err) {
            next(err);
        }
    }
    async login(req: Request, res: Response, next: NextFunction) {
        try {   
            await checkValidationErrors(req);
            const { login, password } = req.body;
            const candidate = await UserService.getRawByLogin(login);

            // compare password. Throws error if passwords are not equal
            compareHashedPasswords(password, candidate.password)

            // creating new session
            const session = await SessionService.create(candidate);
            
            // setting cookie to headers. It will be expired in 1 month
            res.cookie('sessionId', session.id, { maxAge: 1000 * 60 * 60 * 24 * 30 })

            res.send();

        } catch(err) {
            next(err);
        }
    }
    async getOne(req: Request, res: Response, next: NextFunction) {
        try {   
            await checkValidationErrors(req);
            const user: UserGetDTO = await UserService.getById(req.params.id)
            return res.send(user);
        } catch(err) {
            next(err);
        }
    }
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {   
            await checkValidationErrors(req);
            const users: UserGetDTO[] = await UserService.getAll()
            return res.send(users);
        } catch(err) {
            next(err);
        }
    }
}

export default new UserController();