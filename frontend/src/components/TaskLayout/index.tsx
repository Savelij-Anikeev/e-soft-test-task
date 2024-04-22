import React, { useEffect, useState } from 'react'

import styles from "./TaskLayout.module.css";

import NavTask from '../NavTask';
import TaskList from '../../elements/TaskList';
import NavActions from '../NavActions';

import taskFilter from '../../app/store/taskFilter';
import TaskGrouped from '../../elements/TaskGrouped';

import { observer } from "mobx-react-lite";
import task from '../../app/store/task';


const TaskLayout = observer(() => {
  return (
    <div className={styles.taskLayoutWrapper}>
      <div className={styles.navWrapper}>
        <NavTask />
        <NavActions />
      </div>
      {!taskFilter.isGrouped
      ? <TaskList />
      : <TaskGrouped />
      }
    </div>
  )
})

export default TaskLayout;