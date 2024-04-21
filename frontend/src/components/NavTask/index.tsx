import React from 'react'

import { taskTypeEnum } from '../../app/types/task';

import styles from "./NavTask.module.css";

import TaskFilter from '../../elements/TaskFilter';


// interface NavTaskProps {
//   currentFilter: taskTypeEnum
//   onClick: Function
// }

const NavTask: React.FC<any> = () => {
  const taskFilterList = [
    { name: 'ALL', label: 'все' },
    { name: 'DAY', label: 'на сегодня' },
    { name: 'WEEK', label: 'на неделю' },
    { name: 'FUTURE', label: 'на будущее' },
  ]

  return (
    <nav className={styles.nav}>
        <h2 className={styles.headingText}>Задачи</h2>
        <div className={styles.taskFilters}>
          { taskFilterList.map(e => (
            <TaskFilter 
            key={taskFilterList.indexOf(e)} 
            label={e.label}
            name={e.name as taskTypeEnum} />
          )) }
        </div>
    </nav>
  )
}

export default NavTask;