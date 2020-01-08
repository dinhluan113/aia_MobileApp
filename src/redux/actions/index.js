import { LOGIN, LOGOUT } from './type';

export const doLogin = () => ({ type: LOGIN });
export const doLogout = () => ({ type: LOGOUT });