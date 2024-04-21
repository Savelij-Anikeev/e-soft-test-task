import styles from "./TaskList.module.css";

import Task from '../Task';

import task from '../../app/store/task';

import { observer } from 'mobx-react-lite';
import { useEffect } from "react";
import { getTasks } from "../../app/api/task-api";
import TaskFilter from "../../app/store/taskFilter";

const TaskList = observer(() => {  
  useEffect(() => {
    getTasks();
  }, [TaskFilter.filter, task.loadTasks])

  return (
    <div className={styles.tasksWrapper}>
      <div className={styles.tasksInner}>
        {task.list.length 
        ? task.list.map(e => <Task key={e.id} {...e} />
        )
        : <h3>
            Задач пока нет
          </h3>}
      </div>
    </div>
  )
})
export default TaskList;