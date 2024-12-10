import {$authHost, $host} from "./index";
import {jwtDecode} from "jwt-decode";

export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: 'USER'});
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password});
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
}

export const checkAuth = async () => {
    const {data} = await $authHost.get('api/user/auth');
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
}

export const checkRole = async () => {
    const token = localStorage.getItem('token');
    console.log('Token being sent:', token);
    const {data} = await $authHost.get('api/user/auth/role');
    console.log('Role data:', data); // Посмотреть, что приходит от сервера
    return data.role === 'ADMIN';
}