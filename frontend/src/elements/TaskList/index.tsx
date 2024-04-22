import styles from "./TaskList.module.css";

import Task from '../Task';

import { observer } from 'mobx-react-lite';
import { useEffect } from "react";

import task from '../../app/store/task';
import taskFilter from "../../app/store/taskFilter";

const TaskList = observer(() => {  
  useEffect(() => {
    task.loadTasks();

  }, [taskFilter.filter, task.groupedList])
  
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