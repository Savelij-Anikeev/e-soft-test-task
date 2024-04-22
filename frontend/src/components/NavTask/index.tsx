import React from 'react'

import { taskTypeEnum } from '../../app/types/task';

import styles from "./NavTask.module.css";

import TaskFilter from '../../elements/TaskFilter';
import TaskGroup from '../../elements/TaskGroup';


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
          <TaskGroup key="isGrouped"
          label="по подчиненным"/>
          {/* <Button value="по подчиненным" 
          onClick={() => taskFilter.changeIsGrouped()}/> */}
        </div>
    </nav>
  )
}

export default NavTask;