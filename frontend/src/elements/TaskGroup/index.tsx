import React from 'react'

import styles from "./TaskGroup.module.css";

import taskFilter from '../../app/store/taskFilter';

import { observer } from 'mobx-react-lite';


type TaskGroupProps = {
    label: string
}


const TaskGroup = observer((props: TaskGroupProps) => {
    let style = `${styles.btn}`;
    style += taskFilter.isGrouped ? ` ${styles.active}` : '';

    return (
        <div className={style} onClick={() => taskFilter.changeIsGrouped()}>
            { props.label }
        </div>
    )
})

export default TaskGroup;