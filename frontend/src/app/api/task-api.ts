import axios from "axios";
import { API_BASE_URL } from "../config/apiConfig";

import task from "../store/task";

import { TaskType, taskTypeEnum } from "../types/task";
import taskFilter from "../store/taskFilter";


export async function getTasks() {
    try { 
        console.log(taskFilter.filter);

        let procFilter = 'all';
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

        console.log(taskFilter.filter, taskTypeEnum.ALL);
        


        const { data } = await axios.get(API_BASE_URL + `tasks/`, {params: {time: procFilter}});
        console.log(data);
        task.loadTasks(data as TaskType[]);
        
    } catch (err) {
        console.log(`${err}`);
        throw err;
    }
}
