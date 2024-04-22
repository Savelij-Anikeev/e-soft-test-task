import { UserType } from "./user";


export enum taskTypeEnum {
    ALL = "all",
    DAY = "day",
    WEEK = "week",
    FUTURE = "moreThanWeek",
}

export type taskTypeEnumString = keyof typeof taskTypeEnum;

export enum taskStatusEnum {
    'К выполнению', 'выполняется', 'выполнена', 'отменена'
}
export enum taskPriorityEnum {
    'высокий', 'средний', 'низкий'
}

export type TaskType = {
    id: string;
    header: string;
    description: string;
    
    createdAt?: Date;
    updatedAt?: Date;
    expiresAt: Date;

    priority: taskPriorityEnum;
    status: taskStatusEnum;

    creatorId: string;
    responsibleId: UserType;
}

export type GroupedTaskElem = {
    responsibleId: UserType;
    tasks: TaskType[];
}