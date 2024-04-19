import { Router } from "express";
import { Request, Response, NextFunction } from "express-serve-static-core";

import { checkSchema } from "express-validator";
import { TaskCreateValidationsSchema } from "../utils/validationSchemas";

import authMiddleware from "../middlewares/auth-middleware";

import TaskController from "../controllers/TaskController";

const router = Router();

// create task
router.post('/tasks/', authMiddleware, checkSchema(TaskCreateValidationsSchema),
    (req: Request, res: Response, next: NextFunction) => TaskController.create(req, res, next));

// get all tasks
router.get('/tasks/', authMiddleware, 
    (req: Request, res: Response, next: NextFunction) => TaskController.getAll(req, res, next));

// get task by id
router.get('/tasks/:id', authMiddleware, 
    (req: Request, res: Response, next: NextFunction) => TaskController.getOne(req, res, next));

// patch task by id
router.patch('/tasks/:id', authMiddleware, 
    (req: Request, res: Response, next: NextFunction) => TaskController.patchOne(req, res, next));

// delete task by id
router.delete('/tasks/:id', authMiddleware, 
    (req: Request, res: Response, next: NextFunction) => TaskController.deleteOne(req, res, next));

export default router;