import {Routes, Route} from "react-router-dom";

import { routesConfig } from "./config/routeConfig";

import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import SubordinatesPage from "../pages/Subordinates";
import TaskPage from "../pages/Task";


const AppRoutes = () => {
  return (
    <Routes>
        <Route path={routesConfig.home} element={<TaskPage />} />
        <Route path={routesConfig.register} element={<RegisterPage />} />
        <Route path={routesConfig.login} element={<LoginPage />} />   
        <Route path={routesConfig.subordinates} element={<SubordinatesPage />} />     
    </Routes>
  )
}

export default AppRoutes