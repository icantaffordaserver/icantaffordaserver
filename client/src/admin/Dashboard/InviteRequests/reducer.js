/**
 * Created by alexandermann on 2017-01-27.
 */
import {
  FETCH_INVITE_REQUESTS_SUCCESS,
  FETCH_INVITE_REQUESTS_FAILURE,
  BEGIN_FETCH_INVITE_REQUESTS,
  CHECK_INVITE_REQUEST,
  UNCHECK_INVITE_REQUEST,
} from './constants';

const initialState = {
  all: [],
  checkedRequests: [],
  isPolling: false,
};

export default function inviteRequests(state = initialState, action) {
  switch (action.type) {
    case BEGIN_FETCH_INVITE_REQUESTS:
      return {
        ...state,
        isPolling: true,
      };
    case FETCH_INVITE_REQUESTS_SUCCESS:
      return {
        ...state,
        all: action.inviteRequests,
        isPolling: false,
      };
    case FETCH_INVITE_REQUESTS_FAILURE:
      return {
        ...state,
        isPolling: false,
      };
    case UNCHECK_INVITE_REQUEST:
      state.checkedRequests.splice(state.checkedRequests.indexOf(action.inviteRequestId), 1);
      return {
        ...state,
        checkedRequests: [...state.checkedRequests],
      };
    case CHECK_INVITE_REQUEST:
      return {
        ...state,
        checkedRequests: state.checkedRequests.concat(action.inviteRequestId),
      };
    default:
      return state;
  }
}
