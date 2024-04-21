import React from 'react'

import styles from "./TaskFilter.module.css";
import { taskTypeEnum } from '../../app/types/task';

import taskFilter from '../../app/store/taskFilter';
import { observer } from 'mobx-react-lite';


interface TaskFilterProps {
    label: string
    name: taskTypeEnum
}


const TaskFilter = observer((props: TaskFilterProps) => {        
    const styleClasses = (taskFilter.filter === props.name) 
    ? `${styles.taskFilter} ${styles.active}`
    : `${styles.taskFilter}`;
    return (
        <span 
        className={styleClasses}
        onClick={() => taskFilter.change(props.name)}>
            { props.label }
        </span>
  )
});

export default TaskFilter;