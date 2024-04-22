import React from 'react'

import subordinatesLogo from "../../shared/media/people-50.png";
import exitLogo from "../../shared/media/logout-48.png";

import { routesConfig } from '../../app/config/routeConfig';
import { Link } from 'react-router-dom';

import styles from './MenuSidebar.module.css';


const MenuSidebar = () => {
  return (
      <ul className={styles.menuWrapper}>
          <li className={styles.menuPoint}>
              <Link to={routesConfig.subordinates}
              className={styles.menuLink}
              >
                <img src={subordinatesLogo} 
                alt="Подчиненные" 
                title="Подчиненные"
                className={styles.logo}/>
              </Link>
          </li>
          <li className={styles.menuPoint}>
              <Link to={routesConfig.subordinates}
              className={styles.menuLink}
              >
                <img src={exitLogo} 
                alt="Выход" 
                title="Выход"
                className={styles.logo}/>
              </Link>
          </li>
      </ul>
  )
}

export default MenuSidebar;