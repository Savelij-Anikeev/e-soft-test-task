import axios, { AxiosError } from "axios";
import { UserType } from "../types/user";

import { API_BASE_URL } from "../config/apiConfig";
import user from "../store/user";


axios.defaults.withCredentials = true;


export async function Login(data: Pick<UserType, "login" & "password">): Promise<{status: boolean, msg: string}> {
    try {
        
        const response = await axios.post(API_BASE_URL + 'login/', data);
        
        localStorage.setItem('token', String(response.data.sessionId));
        user.setData(response.data);

        await getSubordinates();
        
        return {status: true, msg: 'success'};

    } catch (err: any) {
        
        if (err.response.status === 404) {
            return {status: false, msg: 'Пользователь с таким login не найден!'};
        } else if (400 <= err.response.status && err.response.status <= 499) {
            return {status: false, msg: 'Неверный пароль!'};
        }
        return {status: false, msg: `Внутренняя ошибка: ${err}`}
    }

}

export async function Register(
    data: Partial<UserType>
): Promise<{status: boolean, msg: string}> {
    try {
        // registering user and logining automatically
        const response = await axios.post(API_BASE_URL + 'register/', data);
        
        const loginResponse = await Login({login: response.data.login, password: data.password});

        return {status: loginResponse.status, msg: loginResponse.msg};
    } catch (err) {
        return {status: false, msg: `Ошибка: ${err}`}
    }
}

export async function getSubordinates(): Promise<UserType[]> {
    try {
        const { data } = await axios.get(API_BASE_URL + 'subordinates/');
        user.setSubordinates(data);

        return data;
    } catch (err) {
        // console.log((`${err}`));
        throw err;
        return [];
    }
}