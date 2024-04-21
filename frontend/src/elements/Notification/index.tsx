import React from 'react'

import styles from "./Notification.module.css";

type NotificationProps = {
    messages: string[]
}

const Notification = ({ messages }: NotificationProps ) => {
  return (
    <div className={styles.notificationWrapper}>
        {messages.map(msg => (
            <div className={styles.notification} key={messages.indexOf(msg)}>
                <p>{ msg }</p>
            </div>
        ))}
    </div>
  )
}

export default Notification;