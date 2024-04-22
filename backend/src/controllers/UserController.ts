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
            await compareHashedPasswords(password, candidate.password)

            // creating new session
            const session = await SessionService.create(candidate);
            
            res.send({...new UserGetDTO(candidate), sessionId: session.id});

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

    async getSubordinates(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await SessionService.verify(req.headers.authorization!);
            const users = await User.findAll({ where: { supervisor: String(user) } });

            res.send(users);
        } catch (err) {
            next(err);
        }
    }
    async addSubordinates(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await SessionService.verify(req.headers.authorization!);
            const candidate = await UserService.updateOne(req.body.userId, { supervisor: user });

            res.send(201).send(candidate);
        } catch (err) {
            next(err);
        }
    }
    async removeSubordinates(req: Request, res: Response, next: NextFunction) {
        try {
            await UserService.updateOne(req.params.id, { supervisor: null });

            res.send();
        } catch (err) {
            next(err);
        }
    }
}

export default new UserController();