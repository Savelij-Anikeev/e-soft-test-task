import React, { useEffect } from 'react'

import styles from "./MainLayout.module.css";

import user from '../../app/store/user';

import Sidebar from '../Sidebar';
import TaskLayout from '../TaskLayout';
import { useNavigate } from 'react-router-dom';
import { routesConfig } from '../../app/config/routeConfig';


const MainLayout = () => { 
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.data) {
      navigate(routesConfig.login);
    }
  }, [])




  return (
    <div className={styles.wrapper}>
        <Sidebar />
        <TaskLayout />
    </div>
  )
}

export default MainLayout;