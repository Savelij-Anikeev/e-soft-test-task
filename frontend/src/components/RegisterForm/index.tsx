import React from 'react';
import { Register } from '../../app/api/user-api';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Link, useNavigate } from 'react-router-dom';

import Notification from '../../elements/Notification';
import Input from '../../elements/Input';
import Form from '../../elements/Form';
import Button from '../../elements/Button';
import { routesConfig } from '../../app/config/routeConfig';

const RegistrationForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [ apiError, setApiError ] = useState<string>('');

  const onSubmit = async (data: any) => {
    const result = await Register(data);
    
    if (result.status) {
      navigate(routesConfig.home);
    }
    setApiError(result.msg);

  };

  return (
    <>
      { apiError && <Notification messages={[apiError]} /> }
      <Form onSubmit={handleSubmit(onSubmit)} headingText='Регистрация'>
        <div>
          <Input type="text" 
            placeholder="Имя" 
            register={register('firstName', {required: "Имя не может быть пустым!"})} />
            {errors.firstName && <p className="inputError">{String(errors.firstName.message)}</p>}
          <Input type="text" 
            placeholder="Фамилия" 
            register={register('secondName', {required: "Фамилия не может быть пустой!"})} />
            {errors.secondName && <p className="inputError">{String(errors.secondName.message)}</p>}
          <Input type="text" 
            placeholder="Отчество" 
            register={register('thirdName')} />
            {errors.thirdName && <p className="inputError">{String(errors.thirdName.message)}</p>}
          <Input type="password" 
            placeholder="Пароль" 
            register={register('password', {
              required: "Пароль не может быть пустым!", 
              minLength: {
                value: 8,
                message: "Пароль не может быть короче 8 символов"
              }
              })} />
            {errors.password && <p className="inputError">{String(errors.password.message)}</p>}
        </div>
        <div style={{margin: "1rem 0 4rem 0"}}>
          <Link to={routesConfig.login}>Войти</Link>
        </div>
        <Button value='Зарегистрироваться' onClick={() => {}}/>
      </Form>
    </>
  );
};

export default RegistrationForm;