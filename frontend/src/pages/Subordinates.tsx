import React from 'react';

import { Link } from 'react-router-dom';
import { routesConfig } from '../app/config/routeConfig';


const Subordinates = () => {
  return (
    <div style={{margin: '3rem 1rem'}}>
      <h1>*Страница для управления подчиненными*</h1>
      <div>
        Здесь можно будет реализовать функции добавления/удаления подчиненных.
      </div>
      <Link to={routesConfig.home}>
        вернуться на главную страницу
      </Link>
    </div>
  )
}

export default Subordinates