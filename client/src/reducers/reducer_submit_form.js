import {SUBMIT_FORM} from '../actions/index';

// All reducers get two arguments, the current state and action
// reducers are only ever called when an action occurs
// State argument is not the application state, only the state this reducer is responsible for
export default function (state = null, action) {
    switch (action.type) {

        case SUBMIT_FORM:
            return action.payload;

        default:
            return state;
    }
}