import { makeAutoObservable } from "mobx";

import { taskTypeEnum } from "../types/task";

import { getTasks } from "../api/task-api";

class TaskFilter {
    filter: taskTypeEnum = "ALL"  as taskTypeEnum;
    
    constructor() {
        makeAutoObservable(this);
    }

    change(value: taskTypeEnum) {        
        this.filter = value;
    }
}

export default new TaskFilter();