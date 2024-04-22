import React from 'react'

import { Link } from 'react-router-dom';

import styles from './LogoSidebar.module.css';

import logo from "../../shared/media/logo-30.png";
import { routesConfig } from '../../app/config/routeConfig';

const LogoSidebar = () => {
  return (
    <div className={styles.wrap}>
        <Link to={routesConfig.home} className={styles.logoText}>
            <img src={logo} alt="logo" className={styles.logo} title='COSMOS TODO'/>
            {/* <h2>
                COSMOS
            </h2> */}
        </Link>
    </div>
  )
}

export default LogoSidebar;