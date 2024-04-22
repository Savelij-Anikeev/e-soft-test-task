import { TaskType, GroupedTaskElem } from "../types/task";

import { makeAutoObservable, runInAction } from "mobx";

import { deleteTask, getTasks, patchTask, createTask, getGroupedTasks } from "../api/task-api";


class Task {
    list: TaskType[] = [];
    groupedList: GroupedTaskElem[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    async addTask(data: TaskType) {
        await createTask(data);
    }

    async loadTasks() {
        runInAction(() => {
            getTasks()
            .then(tasks => this.setTask(tasks))
            .catch(err => console.log(`${err}`))
        })
    }

    async deleteOne(id: string)
    {
        await deleteTask(id); 
        this.list.filter(e => e.id !== id);
    }

    async updateOne(id: string, data: Partial<TaskType>) {
        await patchTask(id, data);
    }

    async loadGroupedTaskList() {
        const tasks = await getGroupedTasks();        
        this.setGroupedTasks(tasks);
    }

    setTask(task: TaskType[]) {
        this.list = task;
    }

    setGroupedTasks(tasks: any) {
        this.groupedList = [];
        this.groupedList = tasks;
    }
}

export default new Task();