import { LOGIN, LOGOUT } from '../actions/type';

const initialState = false;

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return true;

        case LOGOUT:
            return false;

        default:
            return state;
    }
}