import React from 'react'

import styles from "./TaskLayout.module.css";

import NavTask from '../NavTask';
import TaskList from '../../elements/TaskList';


const TaskLayout = () => {
  return (
    <div className={styles.taskLayoutWrapper}>
      <NavTask />
      <TaskList />
    </div>
  )
}

export default TaskLayout;