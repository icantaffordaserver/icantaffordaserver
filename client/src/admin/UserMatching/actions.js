/**
 * Created by alexandermann on 2017-01-21.
 */
import {
  CLEAR_MESSAGES,
  MATCH_USERS_FAILURE,
  MATCH_USERS_SUCCESS,
} from '../../shared/components/Messages/constants';
import { SET_USERS, SET_SEARCH_TEXT, SET_SELECTED_USER, SET_USER_INDEX } from './constants';

export function fetchUsers() {
  return dispatch => fetch('/users')
      .then((response) => {
        if (response.ok) {
          return response.json().then((json) => {
            dispatch({ type: SET_USERS, users: json.data });
          });
        }
      });
}

export function submitMatchedUsers(user1Id, user2Id, adminUserId) {
  return (dispatch) => {
    dispatch({
      type: CLEAR_MESSAGES,
    });
    return fetch('/connections', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user1_id: user1Id,
        user2_id: user2Id,
        admin_user_id: adminUserId,
      }),
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: MATCH_USERS_SUCCESS,
            messages: [json],
          });
        });
      }
      return response.json().then((json) => {
        dispatch({
          type: MATCH_USERS_FAILURE,
          messages: Array.isArray(json) ? json : [json],
        });
      });
    });
  };
}

export function setSearchText(searchText) {
  return (dispatch) => {
    dispatch({
      type: SET_SEARCH_TEXT,
      searchText,
    });
  };
}

export function setUserIndex(userIndex) {
  return (dispatch) => {
    dispatch({
      type: SET_USER_INDEX,
      userIndex,
    });
  };
}

export function setSelectedUser(selectedUsers) {
  return (dispatch) => {
    dispatch({
      type: SET_SELECTED_USER,
      selectedUsers,
    });
  };
}
