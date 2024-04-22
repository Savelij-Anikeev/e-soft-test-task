import { makeAutoObservable } from "mobx";

import { taskTypeEnum } from "../types/task";

import { getTasks } from "../api/task-api";

class TaskFilter {
    filter: taskTypeEnum = "ALL"  as taskTypeEnum;
    isGrouped: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    changeFilter(value: taskTypeEnum) {        
        this.filter = value;
    }
    changeIsGrouped() {
        this.isGrouped = !this.isGrouped;
    }
}

export default new TaskFilter();