import {SET_ACTIVE_FORM} from '../actions/index';

// All reducers get two arguments, the current state and action
// reducers are only ever called when an action occurs
// State argument is not the application state, only the state this reducer is responsible for
export default function (state = null, action) {
    switch (action.type) {

        case SET_ACTIVE_FORM:
            return action.activeForm;

        default:
            return state;
    }
}