/**
 * Created by alexandermann on 2017-01-23.
 */
import { browserHistory } from 'react-router';
import * as types from '../Messages';
export function resetPassword(password, confirm, pathToken) {
  return (dispatch) => {
    dispatch({
      type: types.CLEAR_MESSAGES,
    });
    return fetch(`/reset/${pathToken}`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password,
        confirm,
      }),
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          browserHistory.push('/login');
          dispatch({
            type: types.RESET_PASSWORD_SUCCESS,
            messages: [json],
          });
        });
      }
      return response.json().then((json) => {
        dispatch({
          type: types.RESET_PASSWORD_FAILURE,
          messages: Array.isArray(json) ? json : [json],
        });
      });
    });
  };
}
