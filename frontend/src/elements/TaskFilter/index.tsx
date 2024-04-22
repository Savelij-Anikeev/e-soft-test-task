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
    // checking if active
    let styleClasses = (taskFilter.filter === props.name) 
    ? `${styles.taskFilter} ${styles.active}`
    : `${styles.taskFilter}`;

    // checking if 'isGrouped' === true
    let isCovered = taskFilter.isGrouped ? ` ${styles.covered}` : ``; 
    styleClasses += isCovered;

    return (
        <span 
        className={styleClasses}
        onClick={!taskFilter.isGrouped ? () => taskFilter.changeFilter(props.name) : () => {}}>
            { props.label }
        </span>
  )
});

export default TaskFilter;