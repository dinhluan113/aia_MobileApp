import { LOGIN, LOGOUT, CURRENT_DATE } from './type';

export const doLogin = () => ({ type: LOGIN });
export const doLogout = () => ({ type: LOGOUT });

export function doSetcrrDate(date) {
    return { type: CURRENT_DATE, value: date }
}
