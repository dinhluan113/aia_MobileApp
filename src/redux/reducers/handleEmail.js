import { CURRENT_EMAIL } from '../actions/type';

const initialState = '';
export default function (state = initialState, action) {
    switch (action.type) {
        case CURRENT_EMAIL:
            return action.value;

        default:
            return state;
    }
    return state;
}