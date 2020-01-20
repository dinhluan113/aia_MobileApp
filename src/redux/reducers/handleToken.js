import { JWT_TOKEN } from '../actions/type';

const initialState = '';
export default function (state = initialState, action) {
    switch (action.type) {
        case JWT_TOKEN:
            return action.value;

        default:
            return state;
    }
    return state;
}