import { Request, Response, NextFunction} from "express-serve-static-core";

import { checkValidationErrors } from "../utils/helpers";
import TaskService from "../services/TaskService";
import SessionService from "../services/SessionService";

import User from "../models/User";
import Task from "../models/Task";

import APIError from "../exceptions/api-error";
import UserService from "../services/UserService";


import { BaseTaskType } from "../types/models/taskTypes";


class TaskController {
    async create(req: Request, res: Response, next: NextFunction){
        try {
            // validation
            await checkValidationErrors(req);
            
            // making auth user be author by default
            req.body.creatorId = String(await SessionService.verify(req.headers.authorization!));

            // creating task
            const task = await TaskService.add(req.body);

            res.status(201).send(task);
        } catch(err) {
            next(err);            
        }
    }
    async getAll(req: Request, res: Response, next: NextFunction){
        try {
            // getting current user
            const currentUserId = String(await SessionService.verify(req.headers.authorization!));
            const tasks = (await TaskService.getList(currentUserId, String(req.query.time), Boolean(req.query.groupByResponsible)))

            
            res.send(await this.replaceIdWithUser(tasks));
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
            const userId = String(await SessionService.verify(req.headers.authorization!));
            const taskCandidate = await TaskService.getOne(req.params.id);
            let hasFullPermission = false;
            
            if (userId === taskCandidate.creatorId) {
                hasFullPermission = true;
            }
            if (userId !== taskCandidate.creatorId && userId !== taskCandidate.responsibleId)
            {
                throw APIError.UnauthorizedError('not enough permission');
            }

            const task = await TaskService.patchOne(req.params.id, req.body, hasFullPermission);

            res.send(task);          
        } catch(err) {
            next(err);            
        }
    }
    async deleteOne(req: Request, res: Response, next: NextFunction){
        try {
            const userId = String(await SessionService.verify(req.headers.authorization!));
            const taskCandidate = await TaskService.getOne(req.params.id);
            if (userId !== taskCandidate.creatorId) {
                throw APIError.UnauthorizedError('not enough permission');
            }

            await TaskService.deleteOne(req.params.id);
            res.status(204).send();
        } catch(err) {
            next(err);
        }     
    }

    async replaceIdWithUser(arr: any): Promise<any> {
        return await Promise.all(
            arr.map(async (element: any) => {
                element.responsibleId = await UserService.getById(element.responsibleId);
                return element;
            })
        )

    }
}

export default new TaskController();