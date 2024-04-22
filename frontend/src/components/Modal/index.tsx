import React, { useState } from 'react'

import styles from './Modal.module.css';

import closeIcon from "../../shared/media/close-50.png";

import modal from '../../app/store/modal';

import { observer } from "mobx-react-lite";

import CreateTaskForm from '../../elements/CreateTaskForm';
import EditTaskForm from '../../elements/EditTaskForm';


const Modal = observer(() => {
  return (
    <> {modal.isOpen &&
        <div className={styles.overlay}>
            
            <div className={styles.content}>
                <div className={styles.contentHeader}>
                    <h3 className={styles.titleText}>
                      {modal.modalMode === 'create' 
                        ? 'создание задачи' 
                        : 'изменение задачи'}
                    </h3>
                    <img src={closeIcon} 
                    alt="close" 
                    className={styles.closeIcon} 
                    onClick={() => modal.switchOpen('create')}/>
                </div>
                {modal.modalMode === 'create' 
                  ? <CreateTaskForm />
                  : <EditTaskForm taskId={modal.modalMode} />
                }
            </div>
        </div>}
    </>
  )
})

export default Modal;