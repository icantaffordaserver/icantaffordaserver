/**
 * Created by alexandermann on 2017-01-23.
 */
import cookie from 'react-cookie';
import {browserHistory} from 'react-router';
import moment from 'moment';

import {CLEAR_MESSAGES, LOGIN_FAILURE} from '../Messages/constants';
import {LOGIN_SUCCESS} from './constants'

export function login(email, password) {
    return (dispatch) => {

        dispatch({
            type: CLEAR_MESSAGES
        });
        return fetch('/login', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then((response) => {
            if (response.ok) {
                return response.json().then((json) => {
                    dispatch({
                        type: LOGIN_SUCCESS,
                        token: json.token,
                        user: json.user
                    });
                    cookie.save('token', json.token, {expires: moment().add(1, 'hour').toDate()});
                    browserHistory.push('/account');
                });
            } else {
                return response.json().then((json) => {
                    dispatch({
                        type: LOGIN_FAILURE,
                        messages: Array.isArray(json) ? json : [json]
                    });
                });
            }
        });
    };
}