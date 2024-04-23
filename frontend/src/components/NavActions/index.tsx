import React from 'react'

import styles from "./NavAction.module.css";
import Button from '../../elements/Button';

import modal from '../../app/store/modal';

const NavActions = () => {
  return (
    <div className={styles.navActionsWrapper}>
        <span 
        className={styles.addBtn}
        onClick={() => modal.switchOpen('create')}>Добавить задачу</span>
    </div>
  )
}

export default NavActions;