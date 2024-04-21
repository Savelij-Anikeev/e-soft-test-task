import React from 'react'

import styles from "./ProfileSidebar.module.css";

import userLogo from "../../shared/media/user-60.png";

import { observer } from 'mobx-react-lite';
import user from '../../app/store/user';


const ProfileSidebar = observer(() => {
  return (
    <div className={styles.profileWrapper}>
        <div className={styles.picture}>
            <img src={userLogo} className={styles.userLogo} alt="profile picture" />
        </div>
        <p className={styles.fullName}>{ user.data?.shortName || user.data?.secondName }</p>
        {/* <p className={styles.authority}>руководитель</p> */}
    </div>
  )
})

export default ProfileSidebar;