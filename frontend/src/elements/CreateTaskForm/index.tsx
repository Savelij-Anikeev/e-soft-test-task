import React, { useEffect } from 'react'

import { useForm } from 'react-hook-form';

import styles from "./CreateTaskForm.module.css";
import Button from '../Button';

import user from '../../app/store/user';
import modal from '../../app/store/modal';
import task from '../../app/store/task';

import { createTask } from "../../app/api/task-api";
import { observer } from 'mobx-react-lite';


const CreateTaskForm = observer(() => {
    useEffect(() => {

    }, [task.loadTasks])

    const { register, formState: { errors }, handleSubmit } = useForm();
    let responsibleCandidates = [user.data!].concat(user.subordinates);
    
    async function onSubmit(data: any) {
      await task.addTask(data);
      await task.loadTasks();
      modal.switchOpen('create'); 
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formInputs}>
            <label className={styles.label}>
              Заголовок:
              <input 
              type="text" 
              className={`${styles.input} ${styles.baseInput}`}
              {...register('header', 
              {required: 'Заголовок не может быть пустым'})}
              />
              {errors?.header && <p>{String(errors?.header?.message)}</p>}
            </label>

            <label className={styles.label}>
              Описание:
              <textarea 
              className={`${styles.textarea} ${styles.baseInput}`}
              {...register('description', 
              {required: 'Описание не может быть пустым'})}
              />
              {errors?.description && <p>{String(errors?.description?.message)}</p>}
            </label>

            <label className={styles.label}>
              Дедлайн:
              <input type="datetime-local"
              className={`${styles.input} ${styles.baseInput}`}
              {...register('expiresAt', 
              {required: 'Дедлайн должен быть указан'})}/>
              {errors?.expiresAt && <p>{String(errors?.expiresAt?.message)}</p>}
            </label>

            <label className={styles.label}>
            Выберите приоритет:
            <select id="priority" 
              className={`${styles.select} ${styles.baseInput}`}
              {...register('priority')}>
              <option value="высокий">высокий</option>
              <option value="средний">средний</option>
              <option value="низкий">низкий</option>
            </select>
            </label>

            <label className={styles.label}>
              Выберите ответственного:
              <select id="responsibleId" 
              className={`${styles.select} ${styles.baseInput}`}
              {...register('responsibleId')}>
                {responsibleCandidates.map(e => (
                  <option key={e.id} value={e.id}>{e.secondName} {e.firstName}</option>
                ))}
              </select>
            </label>
          </div>

          <Button value='Добавить задачу' onClick={() => {}}/>
        </form>
  )
})

export default CreateTaskForm;
