import { Router } from "express";
import { Request, Response, NextFunction } from "express-serve-static-core";

import { checkSchema } from "express-validator";

import { UserCreateValidationSchema, UserLoginValidationSchema, IdValidationSchema } from "../utils/validationSchemas";

import UserController from "../controllers/UserController";
import SessionService from "../services/SessionService";

import authMiddleware from "../middlewares/auth-middleware";


const router = Router();

// register
router.post('/register/', checkSchema(UserCreateValidationSchema), 
    (req: Request, res: Response, next: NextFunction) => UserController.register(req, res, next))

// login
router.post('/login/', checkSchema(UserLoginValidationSchema),
    (req: Request, res: Response, next: NextFunction) => UserController.login(req, res, next))

// get user by id
router.get('/users/',
    (req: Request, res: Response, next: NextFunction) => UserController.getAll(req, res, next))
// get user by id
router.get('/users/:id',
    (req: Request, res: Response, next: NextFunction) => UserController.getOne(req, res, next))


// list all subordinates
router.get('/subordinates/', authMiddleware, 
    (req: Request, res: Response, next: NextFunction) => UserController.getSubordinates(req, res, next))

// add user to suboridinate's list
router.post('/subordinates/', authMiddleware, 
    (req: Request, res: Response, next: NextFunction) => UserController.addSubordinates(req, res, next))

// remove user to suboridinate's list
router.delete('/subordinates/:id', authMiddleware, 
    (req: Request, res: Response, next: NextFunction) => UserController.removeSubordinates(req, res, next))


export default router;