import { combineReducers } from 'redux';
import handleLogIn from './handleLogIn.js';

export default combineReducers({
    loginStatus: handleLogIn
});