/**
 * Created by alexandermann on 2017-01-20.
 */
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

import { LOGOUT_SUCCESS } from '../Login/constants';

export function logout() {
  cookie.remove('token');
  browserHistory.push('/');
  return {
    type: LOGOUT_SUCCESS,
  };
}
