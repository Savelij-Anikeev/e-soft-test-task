import React, { useEffect, useMemo } from 'react'

import { useForm } from 'react-hook-form';

import styles from "./EditTaskForm.module.css";
import Button from '../Button';

import modal from '../../app/store/modal';
import task from '../../app/store/task';
import user from '../../app/store/user';

import { createTask, patchTask, deleteTask } from "../../app/api/task-api";
import { TaskType, taskTypeEnum } from '../../app/types/task';
import { getNormalTime } from '../../shared/utils';

import { observer } from 'mobx-react-lite';
import taskFilter from '../../app/store/taskFilter';


interface EditTaskForm {
  taskId: string
}


const EditTaskForm = observer((props: EditTaskForm) => {
    useEffect(() => {
      // task.loadTasks();

    }, [task.list])

    const { register, formState: { errors }, handleSubmit } = useForm();
    const currenTaskData: TaskType = task.list.find(e => e.id === props.taskId)!;
    const hasFullPermission: boolean = currenTaskData.creatorId === user.data?.id;

    let responsibleCandidates = [user.data!].concat(user.subordinates);
    
    async function onSubmit(data: any) {
      await task.updateOne(currenTaskData.id, data);
      await task.loadTasks();
      modal.switchOpen('create');       
    }

    async function handleDelete() {
      await task.deleteOne(currenTaskData.id);
      await task.loadTasks();
      modal.switchOpen('create');
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formInputs}>
            <label className={styles.label}>
              Заголовок:
              {hasFullPermission 
              ?<>
                <input 
                type="text" 
                className={`${styles.input} ${styles.baseInput}`}
                defaultValue={currenTaskData.header}
                {...register('header', 
                {required: 'Заголовок не может быть пустым'})}
                />
                {errors?.header && <p>{String(errors?.header?.message)}</p>}
              </>
              : <p>{currenTaskData.header}</p>}
            </label>

            <label className={styles.label}>
              Описание:
              {hasFullPermission
              ?<>
              <textarea 
              className={`${styles.textarea} ${styles.baseInput}`}
              defaultValue={currenTaskData.description}
              {...register('description', 
              {required: 'Описание не может быть пустым'})}
              />
              {errors?.description && <p>{String(errors?.description?.message)}</p>}
              </>
              : <p>{currenTaskData.description}</p>}
            </label>

            <label className={styles.label}>
              Дедлайн:
              {hasFullPermission
              ?<>
              <input type="datetime-local"
              className={`${styles.input} ${styles.baseInput}`}
              defaultValue={(new Date(currenTaskData.expiresAt).toISOString()).split('.')[0]}
              {...register('expiresAt', 
              {required: 'Дедлайн должен быть указан'})}/>
              {errors?.expiresAt && <p>{String(errors?.expiresAt?.message)}</p>}
              </>
              :<p>{getNormalTime(new Date(currenTaskData.expiresAt))}</p>}
            </label>

            <label className={styles.label}>
            Выберите приоритет:
            {hasFullPermission
            ? <>
            <select id="priority" 
              className={`${styles.select} ${styles.baseInput}`}
              defaultValue={currenTaskData.priority}
              {...register('priority')}>
              <option value="высокий">высокий</option>
              <option value="средний">средний</option>
              <option value="низкий">низкий</option>
            </select>
            </>
            : <p>{currenTaskData.priority}</p>}
            </label>


            <label className={styles.label}>
              Выберите ответственного:
              {hasFullPermission
              ? <>
              <select id="responsibleId" 
              className={`${styles.select} ${styles.baseInput}`}
              defaultValue={currenTaskData.responsibleId.id}
              {...register('responsibleId')}>
                {responsibleCandidates.map(e => (
                  <option key={e.id} value={e.id}>{e.secondName} {e.firstName}</option>
                ))}
              </select>
              </> 
              : <p>{currenTaskData.responsibleId.secondName} {currenTaskData.responsibleId.firstName}</p>}
            </label>

            <label className={styles.label}>
              Выберите статус:
              <select {...register('status')} 
              className={`${styles.select} ${styles.baseInput}`}
              defaultValue={currenTaskData.status}
              >
                <option value="К выполнению">К выполнению</option>
                <option value="выполняется">выполняется</option>
                <option value="выполнена">выполнена</option>
                <option value="отменена">отменена</option>
              </select>
              {errors?.status && <p>{String(errors?.status?.message)}</p>}
            </label>
          </div>
          <div className={styles.formButtons}>
            { hasFullPermission &&
            <Button value='Удалить задачу' onClick={() => handleDelete()} type='button' />
            }
            <Button value='Изменить задачу' onClick={() => {}}/>
          </div>
        </form>
  )
})

export default EditTaskForm;
