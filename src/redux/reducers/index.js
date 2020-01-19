import { combineReducers } from 'redux';
import handleLogIn from './handleLogIn.js';
import handleDate from './handleDate.js';

export default combineReducers({
    loginStatus: handleLogIn,
    getCurrentDate: handleDate,
});