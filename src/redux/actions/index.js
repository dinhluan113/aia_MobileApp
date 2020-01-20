import { LOGIN, LOGOUT, CURRENT_DATE, JWT_TOKEN } from './type';

export const doLogin = () => ({ type: LOGIN });
export const doLogout = () => ({ type: LOGOUT });

export function doSetcrrDate(date) {
    return { type: CURRENT_DATE, value: date }
}

export function doSetToken(token) {
    return { type: JWT_TOKEN, value: token }
}
