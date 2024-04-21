import React from 'react'
import styles from './AuthLayout.module.css';


const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.wrapper}>
        { children }
    </div>
  )
}

export default AuthLayout