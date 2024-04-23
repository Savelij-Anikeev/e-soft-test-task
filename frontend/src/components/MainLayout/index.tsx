import React, { useEffect, useState } from 'react'

import styles from "./MainLayout.module.css";

import user from '../../app/store/user';

import Sidebar from '../Sidebar';
import TaskLayout from '../TaskLayout';
import { useNavigate } from 'react-router-dom';
import { routesConfig } from '../../app/config/routeConfig';
import Modal from '../Modal';


const MainLayout = () => { 
  const navigate = useNavigate();
  

  useEffect(() => {
    if (!user.data || !localStorage.getItem('token')) {
      navigate(routesConfig.login);
    }
  }, [])

  return (
    <div className={styles.wrapper}>
        <Modal />
        <Sidebar />
        <TaskLayout />
    </div>
  )
}

export default MainLayout;