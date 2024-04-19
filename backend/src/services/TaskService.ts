import { BaseTaskType, TaskCreateType, TaskPriority, TaskStatus } from "../types/models/taskTypes";
import Task from "../models/Task";
import APIError from "../exceptions/api-error";
import { isRecordExists } from "../utils/helpers";

class TaskService {
    async add(data: BaseTaskType): Promise<BaseTaskType> {
        data.status = TaskStatus.ToPerform;
        const task: BaseTaskType = (await Task.create(data)) as BaseTaskType;

        return task;
    }
    async getList(): Promise<BaseTaskType[]> {
        const tasks = await Task.findAll();

        return tasks as BaseTaskType[];
    }
    async getOne(id: string): Promise<BaseTaskType> {
            try {
                const task = await Task.findOne({where: {id}});
                return task as BaseTaskType;

            } catch {
                throw APIError.NotFoundError(`invalid id`);
            }
    }
    async patchOne(id: string, data: Partial<BaseTaskType>): Promise<BaseTaskType> {
        try {
            await Task.update({ ...data }, { where: { id } });
            const task = await Task.findOne({ where: { id } });
            await isRecordExists(task, id);

            return task as BaseTaskType;
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