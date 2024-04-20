import User from "../../models/User"


export enum TaskPriority {
    High = "высокий",
    Mid = "средний",
    Low = "низкий"
}

export enum TaskStatus {
    ToPerform = "К выполнению",
    Performing = "выполняется",
    Done = "выполнена",
    Canceled = "отменена"
}


export type BaseTaskType = {
    id: string
    header: string
    description: string
    expiresAt: Date
    priority: TaskPriority
    status: TaskStatus
    creatorId: User | string
    responsibleId: User | string
}

export type TaskCreateType = Omit<BaseTaskType, "id">
