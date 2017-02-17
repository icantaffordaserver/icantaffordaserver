/**
 * Created by alexandermann on 2017-01-23.
 */
import {
  CLEAR_MESSAGES,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  CHANGE_PASSWORD_SUCCESS,
  DELETE_ACCOUNT_SUCCESS,
} from '../Messages/constants';
import { logout } from '../Header/actions';

export function updateProfile(state, token) {
  return (dispatch) => {
    dispatch({
      type: CLEAR_MESSAGES,
    });
    return fetch('/account', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: state.email,
        first_name: state.firstName,
        last_name: state.lastName,
        gender: state.gender,
        location: state.location,
        website: state.website,
      }),
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            messages: [json],
          });
        });
      }
      return response.json().then((json) => {
        dispatch({
          type: UPDATE_PROFILE_FAILURE,
          messages: Array.isArray(json) ? json : [json],
        });
      });
    });
  };
}

export function changePassword(password, confirm, token) {
  return (dispatch) => {
    dispatch({
      type: CLEAR_MESSAGES,
    });
    return fetch('/account', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        password,
        confirm,
      }),
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: CHANGE_PASSWORD_SUCCESS,
            messages: [json],
          });
        });
      }
      return response.json().then((json) => {
        dispatch({
          type: CHANGE_PASSWORD_FAILURE,
          messages: Array.isArray(json) ? json : [json],
        });
      });
    });
  };
}

export function deleteAccount(token) {
  return (dispatch) => {
    dispatch({
      type: CLEAR_MESSAGES,
    });
    return fetch('/account', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch(logout());
          dispatch({
            type: DELETE_ACCOUNT_SUCCESS,
            messages: [json],
          });
        });
      }
    });
  };
}
