import { CURRENT_DATE } from '../actions/type';

const _crrDate = new Date();
const initialState = {
    'Month': _crrDate.getMonth() + 1,
    'Year': _crrDate.getFullYear()
};
export default function (state = initialState, action) {
    if (typeof action.value == "object" && typeof action.value != "undefined" && action.value.Month > 0 && action.value.Year > 0) {
        switch (action.type) {
            case CURRENT_DATE:
                return {
                    'Month': action.value.Month,
                    'Year': action.value.Year
                };

            default:
                return state;
        }
    }
    return state;
}