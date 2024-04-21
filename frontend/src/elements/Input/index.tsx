import React from 'react';
import { FieldError } from 'react-hook-form';

import styles from "./Input.module.css";

interface InputProps {
  type: string;
  placeholder: string;
  register: any;
  // error?: FieldError | undefined;
}

const Input: React.FC<InputProps> = ({ type, placeholder, register }) => {
  return (
    <>
      <input type={type} 
      className={styles.input}
      placeholder={placeholder} 
      {...register} />
      {/* {error && <p className={styles.error}>{error.message}</p>} */}
    </>
  );
};

export default Input;