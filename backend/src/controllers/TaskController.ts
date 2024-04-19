import { Request, Response, NextFunction} from "express-serve-static-core";

import { checkValidationErrors } from "../utils/helpers";
import TaskService from "../services/TaskService";
import SessionService from "../services/SessionService";


class TaskController {
    async create(req: Request, res: Response, next: NextFunction){
        try {
            // validation
            await checkValidationErrors(req);
            // await TaskService.isValidPriorityType(req.body.priority);
            req.body.expiresAt = new Date();
            
            // making auth user be author by default
            req.body.author = (await SessionService.verify(req.cookies["sessionId"])).id;

            // creating task
            const task = await TaskService.add(req.body);

            res.status(201).send(task);
        } catch(err) {
            next(err);            
        }
    }
    async getAll(req: Request, res: Response, next: NextFunction){
        try {
            const tasks = await TaskService.getList();

            res.send(tasks);
        } catch(err) {
            next(err);            
        }
    }
    async getOne(req: Request, res: Response, next: NextFunction){
        try {
            const task = await TaskService.getOne(req.params.id);
            res.send(task); 
        } catch(err) {
            next(err);            
        }
    }
    async patchOne(req: Request, res: Response, next: NextFunction){
        try {
            const task = await TaskService.patchOne(req.params.id, req.body);
            res.send(task);          
        } catch(err) {
            next(err);            
        }
    }
    async deleteOne(req: Request, res: Response, next: NextFunction){
        try {
            await TaskService.deleteOne(req.params.id);

            res.status(204).send();
        } catch(err) {
            next(err);
        }     
    }
}

export default new TaskController();