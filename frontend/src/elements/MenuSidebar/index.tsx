import React from 'react'

import { routesConfig } from '../../app/config/routeConfig';
import { Link } from 'react-router-dom';

import styles from './MenuSidebar.module.css';


const MenuSidebar = () => {
  return (
      <ul className={styles.menuWrapper}>
          <li className={styles.menuPoint}>
              <Link to={routesConfig.subordinates}
              className={styles.menuLink}
              >Подчиненные</Link>
          </li>
          <li className={styles.menuPoint}>
              <Link to={routesConfig.subordinates}
              className={styles.menuLink}
              >Выйти</Link>
          </li>
      </ul>
  )
}

export default MenuSidebar;