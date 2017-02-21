/**
 * Created by alexandermann on 2017-02-03.
 */
/**
 * Created by alexandermann on 2017-01-23.
 */
import { FETCH_UPCOMING_CONNECTIONS_SUCCESS } from './constants';

const initialState = {
  allConnections: [],
  isQueued: true,
};

export default function myConnections(state = initialState, action) {
  switch (action.type) {
    case FETCH_UPCOMING_CONNECTIONS_SUCCESS:
      return {
        allConnections: [...action.allConnections],
        isQueued: action.isQueued,
      };
    default:
      return state;
  }
}
