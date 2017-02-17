/**
 * Created by alexandermann on 2017-01-20.
 */
import moment from 'moment';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

import { CLEAR_MESSAGES, SIGNUP_FAILURE, SIGNUP_SUCCESS } from '../Messages/constants';

export function signup(firstName, lastName, email, password, inviteId) {
  return (dispatch) => {
    dispatch({
      type: CLEAR_MESSAGES,
    });
    return fetch(`/signup/invite/${inviteId}`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ first_name: firstName, last_name: lastName, email, password }),
    }).then(response => response.json().then((json) => {
      if (response.ok) {
        dispatch({
          type: SIGNUP_SUCCESS,
          token: json.token,
          user: json.user,
        });
        browserHistory.push('/');
        cookie.save('token', json.token, { expires: moment().add(1, 'hour').toDate() });
      } else {
        dispatch({
          type: SIGNUP_FAILURE,
          messages: Array.isArray(json) ? json : [json],
        });
      }
    }));
  };
}
