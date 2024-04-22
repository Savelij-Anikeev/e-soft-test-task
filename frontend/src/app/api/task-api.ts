import axios from "axios";
import { API_BASE_URL } from "../config/apiConfig";

import task from "../store/task";

import { GroupedTaskElem, TaskType, taskTypeEnum } from "../types/task";
import taskFilter from "../store/taskFilter";


export async function getTasks() {
    try { 
        let procFilter: string = 'all';
        switch (taskFilter.filter){
            case 'DAY' as taskTypeEnum:
                procFilter = 'day';
                break;
            case 'FUTURE' as taskTypeEnum:
                procFilter = 'moreThanWeek';
                break;
            case 'WEEK' as taskTypeEnum:
                procFilter = 'week';
                break;
        }

        


        const { data } = await axios.get(API_BASE_URL + `tasks/`, {params: {time: procFilter}});
        return data as TaskType[];
        
    } catch (err) {
        console.log(`${err}`);
        throw err;
    }
}

export async function createTask(
data: Pick<TaskType, "header"&"description"&"expiresAt"&"priority"&"responsibleId">
): Promise<undefined> {
    try {
        await axios.post(API_BASE_URL + 'tasks/', data);
        return;
    } catch (err) {
        throw err;
        return;
    }
}

export async function patchTask(taskId: string, data: Partial<TaskType>): Promise<undefined> {
    try {
        await axios.patch(API_BASE_URL + `tasks/${taskId}`, data);
        return;
    } catch (err) {
        console.log(`${err}`);
        return;
    }
}

export async function deleteTask(taskId: string): Promise<undefined>  {
    try {
        await axios.delete(API_BASE_URL + `tasks/${taskId}`);
        return;
    } catch (err) {
        console.log(`${err}`);
        return;
    }
}

export async function getGroupedTasks(): Promise<GroupedTaskElem[]> {
    try {
        const response = await axios.get(API_BASE_URL + 'tasks/', { params: { groupByResponsible: true } });
        return response.data;
    } catch (err) {
        console.log(`${err}`);
        return [];
    }
}
