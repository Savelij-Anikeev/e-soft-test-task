import { getTasks } from "../api/task-api";
import { TaskType } from "../types/task";

import { makeAutoObservable  } from "mobx";

class Task {
    list: TaskType[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    loadTasks(data: TaskType[]) {
        this.list = data;
    }
}

export default new Task();