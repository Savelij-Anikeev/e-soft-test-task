import React from 'react'

import styles from "./Button.module.css";

type ButtonProps = {
    value: string;
    type?: string;
    onClick: Function;
}

const Button = (props: ButtonProps) => {
  return (
    <input type={props.type || "submit"} 
    value={props.value} 
    onClick={() => props.onClick()}
    className={styles.button}/>
  )
}

export default Button;