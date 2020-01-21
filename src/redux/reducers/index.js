import { combineReducers } from 'redux';
import handleLogIn from './handleLogIn.js';
import handleDate from './handleDate.js';
import handleToken from './handleToken.js';
import handleEmail from './handleEmail.js';

export default combineReducers({
    loginStatus: handleLogIn,
    getCurrentDate: handleDate,
    getJWTToken: handleToken,
    getCurrentEmail: handleEmail,
});