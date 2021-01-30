import { SET_TITLE } from './constants';

const initialState = {
    navTitle: "Testing"
};

function rootReducer(state = initialState, action) {
    if (action.type === SET_TITLE) {
        return Object.assign({}, state, {
            navTitle: action.payload
        });
    }

    return state;
};

export default rootReducer;
