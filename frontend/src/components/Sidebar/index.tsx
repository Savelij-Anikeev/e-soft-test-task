import React from 'react'

import styles from "./Sidebar.module.css";

import LogoSidebar from '../../elements/LogoSidebar';
import MenuSidebar from '../../elements/MenuSidebar';
import ProfileSidebar from '../../elements/ProfileSidebar';

const Sidebar = () => {
  return (
    <div className={styles.sidebarWrapper}>
        <div className={styles.sidebarInner}>
          <LogoSidebar />
          <MenuSidebar />
          {/* <ProfileSidebar /> */}
        </div>
    </div>
  )
}

export default Sidebar;