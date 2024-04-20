import { BaseTaskType, TaskCreateType, TaskPriority, TaskStatus } from "../types/models/taskTypes";
import Task from "../models/Task";
import APIError from "../exceptions/api-error";
import { isRecordExists } from "../utils/helpers";

import { Op } from "sequelize";


class TaskService {
    async add(data: BaseTaskType) {
        data.status = TaskStatus.ToPerform;
        const task = (await Task.create({...data}));

        return task;
    }
    async getList(currentUserId: string, timeFilter: string | undefined = undefined, isGrouped: boolean = false) {
        if (isGrouped) {
            //  if groupByResponsible === true
            const result: any[] = [];

            const relatedResponsibleIdList = await Task.findAll({
                where: { creatorId: currentUserId },
                attributes: ['responsibleId'],
                group: ['responsibleId'],
                raw: true,
            });
              
            for (const { responsibleId } of relatedResponsibleIdList) {
                const tasks = await Task.findAll({
                    order: [['updatedAt', 'DESC']],
                    where: { responsibleId },
                });
              
                result.push({ responsibleId, tasks });
            }

            return result;

        } else if (timeFilter) {
            // if there are params
            // configuratng constants
            const day = new Date();
            day.setHours(0, 0, 0, 0);
            const tomorrow = new Date(day);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const week = new Date();
            week.setDate(day.getDate() + 7);

            let expiredOptions;

            switch(timeFilter) {
                case 'day':
                    return await Task.findAll({
                        order: [['updatedAt', 'DESC']],
                        where: {
                            responsibleId: currentUserId,
                            expiresAt: {
                                [Op.between]: [day, tomorrow],
                            },}});
                case 'week':
                    return await Task.findAll({
                        order: [['updatedAt', 'DESC']],
                        where: {
                            responsibleId: currentUserId,
                            expiresAt: {
                                [Op.between]: [day, week],
                            },},});
                case 'moreThanWeek':
                    return await Task.findAll({
                        order: [['updatedAt', 'DESC']],
                        where: {
                            responsibleId: currentUserId,
                            expiresAt: {
                                [Op.gt]: week,
                          },},});
                }
        }
        return await Task.findAll({ 
            order: [['updatedAt', 'DESC']],
            where: { 
                [Op.or]: [
                    { creatorId: currentUserId }, 
                    { responsibleId: currentUserId }
                ] 
        }});

    }
    async getOne(id: string): Promise<BaseTaskType> {
            try {
                const task = await Task.findOne({where: {id}});
                if(!task){
                    throw APIError.BadRequestError('invalid id');
                }
                return task as unknown as BaseTaskType;


            } catch {
                throw APIError.NotFoundError(`invalid id`);
            }
    }
    async patchOne(id: string, data: Partial<BaseTaskType>, hasFullPermission: boolean = false): Promise<BaseTaskType> {
        try {
            // checking if task relate to currnet user or it's subordinates
            // if it doesnt user can only change status
            if(!hasFullPermission) {
                if (data.status) {
                    data = {status: data.status};
                } else {
                    data = {};
                }
            }
            await Task.update({ ...data }, { where: { id } });
            const task = await Task.findOne({ where: { id } });
            await isRecordExists(task, id);

            return task as unknown as BaseTaskType;
        } catch {
            throw APIError.NotFoundError(`not found`);
        }
    }
    async deleteOne(id: string) {
        try {
            await Task.destroy({ where: { id } })
        } catch {
            throw APIError.NotFoundError(`not found`);
        }
    }

    // DOESNT WORK, FIX
    async isValidTaskType(status: string) {
        const result = TaskStatus[status as keyof typeof TaskStatus];
        if(!result) {
            throw APIError.BadRequestError(`invalid status value. There are the choices: ${TaskPriority}`)
        }
    }
    async isValidPriorityType(priority: string) {
        const result = TaskPriority[priority as keyof typeof TaskPriority];
        if(!result) {
            throw APIError.BadRequestError(`invalid priority value. There are the choices: ${TaskPriority}`)
        }
    }
}

export default new TaskService();