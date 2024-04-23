import React, { useEffect, useState, useMemo} from 'react'

import styles from "./TaskGrouped.module.css";

import Task from '../Task';

import task from '../../app/store/task';
import user from '../../app/store/user';

import { observer } from 'mobx-react-lite';
import taskFilter from '../../app/store/taskFilter';
import { taskTypeEnum } from '../../app/types/task';


const TaskGrouped = observer(() => {
    useEffect(() => {
        taskFilter.changeFilter(taskTypeEnum.ALL);
        task.loadGroupedTaskList();
        task.loadTasks();
    }, []);    

            {/* { task.groupedList.map(e => <p>{e.responsibleId.id}</p>) } */}

    return (
        <div className={styles.taskGroupWrapper}>
            <div className={styles.taskGroupInner}>
            
                {task.groupedList.map(elem =>
                    <div className={styles.element} key={elem.responsibleId.login}>
                    <div 
                    className={styles.elementHeader}
                    >
                    <span>{ elem.responsibleId.firstName} {elem.responsibleId.secondName.at(0)}.</span>
                    <span>{ elem.responsibleId.login }</span>
                    </div>
                    <div className={styles.elementBody}>
                        {elem.tasks.map(task => 
                            <Task key={task.id} {...task} />
                )}

            </div>
        </div>
    )}
            </div>
        </div>
    )
})

export default TaskGrouped;