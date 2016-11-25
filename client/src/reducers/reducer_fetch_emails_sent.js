import {FETCH_EMAILS_SENT} from '../actions/index';

const INITIAL_STATE = {
    all: []
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {

        case FETCH_EMAILS_SENT:
            return {...state, all: action.payload.data};

        default:
            return state;
    }
}