import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { routesConfig } from '../../app/config/routeConfig';

import { Link, redirect, useNavigate } from 'react-router-dom';

import Button from '../../elements/Button';
import Input from '../../elements/Input';
import Form from '../../elements/Form';

import { Login } from "../../app/api/user-api";
import Notification from '../../elements/Notification';


const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [ apiError, setApiError ] = useState<string>('');

  const onSubmit = async (data: any) => {
    const result = await Login(data);
    
    if (result.status) {
      navigate(routesConfig.home);
    }
    setApiError(result.msg);

  };

  return (
    <>
      { apiError && <Notification messages={[apiError]} /> }
      <Form onSubmit={handleSubmit(onSubmit)} headingText='Вход в систему'>
        <div>
          <Input type="text" 
            placeholder="Логин" 
            register={register('login', {required: "Поле логин обязательно"})} />
          {errors.login && <p className="inputError">{String(errors.login.message)}</p>}
          <Input type="password" 
            placeholder="Пароль" 
            register={register('password', {required: "Поле пароль обязательно"})} />
          {errors.password && <p className="inputError">{String(errors.password.message)}</p>}
          <div style={{margin: "1rem 0 4rem 0"}}>
            <Link to={routesConfig.register}>регистрация</Link>
          </div>
        </div>
        <Button value="Войти" onClick={() => {}}/>
      </Form>
    </>
  );
};

export default LoginForm;