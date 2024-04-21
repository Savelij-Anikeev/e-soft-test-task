import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite';

import styles from "./Task.module.css";
import { TaskType } from '../../app/types/task';

import { getNormalTime } from '../../shared/utils';

interface TaskProps extends TaskType {

}


const Task: React.FC<TaskProps> = observer((props) => {
    const nowDate = new Date(Date.now());
    const expiredDate = new Date(props.expiresAt);
    const isExpired = nowDate > expiredDate
    const classes = isExpired ? `` : ``;

    return (
        <div className={styles.taskWrapper}>
            <p className={styles.point}>
                <span className={styles.key}>имя:</span> 
                <span className={styles.value}>{props.header}</span>
            </p>
            <p className={styles.point}>
                <span className={styles.key}>приоритет:</span> 
                <span className={styles.value}>{props.priority}</span>
            </p>
            <p className={styles.point}>
                <span className={styles.key}>дедлайн:</span> 
                <span className={styles.value}>{getNormalTime(expiredDate)}</span>
            </p>
            <p className={styles.point}>
                <span className={styles.key}>ответственный:</span> 
                <span className={styles.value}>
                    {props.responsibleId.login}
                    <br/>
                    {props.responsibleId.secondName} {props.responsibleId.firstName}
                </span>
            </p>
            <p className={`${styles.point} ${styles.lastPoint}`}>
                <span className={`${styles.key} ${styles.lastKey}`}>статус:</span> 
                <span className={`${styles.value} ${styles.lastValue}`}>{props.status}</span>
            </p>
        </div>
  )
})

export default Task;