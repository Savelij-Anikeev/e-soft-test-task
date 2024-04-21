import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';

import "./app/css/index.css";
import "./app/css/normalize.css";

import { BrowserRouter } from "react-router-dom";

import axios from 'axios';

axios.defaults.withCredentials = false

axios.interceptors.request.use((request) => {  
  request.headers.Authorization = localStorage.getItem('token');
  return request;
})


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    {/* <React.StrictMode> */}
      <App />
    {/* </React.StrictMode> */}
  </BrowserRouter>
);

