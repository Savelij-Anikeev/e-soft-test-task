import React from 'react';

import styles from "./Form.module.css";

interface FormProps {
  onSubmit: any
  children: React.ReactNode
  headingText: string
}

const Form: React.FC<FormProps> = ({ onSubmit, children, headingText }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit && onSubmit(event.target, event);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formWrapper}>
        <h1 className={styles.headingText}>{ headingText }</h1>
        <div className={styles.formBody}>
            {children}
        </div>
    </form>
    );
};

export default Form;