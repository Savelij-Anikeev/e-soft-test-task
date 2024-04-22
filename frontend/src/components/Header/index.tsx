import React from 'react'

import styles from "./Header.module.css";


const Header = () => {
  return (
    <header className={styles.header}>
        <span>Cosmos</span>
        <span>подчиненные</span>
    </header>
  )
}

export default Header;