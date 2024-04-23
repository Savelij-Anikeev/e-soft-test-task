import React from 'react'

import subordinatesLogo from "../../shared/media/people-50.png";
import exitLogo from "../../shared/media/logout-48.png";

import { routesConfig } from '../../app/config/routeConfig';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import styles from './MenuSidebar.module.css';
import user from '../../app/store/user';


const MenuSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    user.data = undefined;
    navigate(routesConfig.login, { replace: true });
  }

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
              {/* <Link to={routesConfig.login}
              className={styles.menuLink}
              > */}
              <div className={styles.menuLink} style={{cursor: "pointer"}} onClick={() => handleLogout()}>
                <img src={exitLogo} 
                alt="Выход" 
                title="Выход"
                className={styles.logo}
                />
              </div>
              {/* </Link> */}
          </li>
      </ul>
  )
}

export default MenuSidebar;