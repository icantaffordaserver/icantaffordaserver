/**
 * Created by alexandermann on 2017-01-21.
 */
import {SET_MATCHED_USERS, SELECT_MATCH} from './constants';
import {
    CLEAR_MESSAGES,
    SET_CONNECTION_TIME_FAILURE,
    SET_CONNECTION_TIME_SUCCESS,
    DELETE_CONNECTION_FAILURE,
    DELETE_CONNECTION_SUCCESS,
} from '../../shared/Messages/constants'

export function fetchMatchedUsers() {
    return (dispatch) => {
        fetch('/connections')
            .then((response) => {
                if (response.ok) {
                    return response.json().then((json) => {
                        dispatch({type: SET_MATCHED_USERS, matchedUsers: json});
                    });
                }
            });
    }
}

export function setConnectionTime(connectionId, connectionTime) {
    return dispatch => {
        dispatch({
            type: CLEAR_MESSAGES
        });
        return fetch(`/connections/${connectionId}`, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                connection_time: connectionTime
            })
        }).then(response => {
            if (response.ok) {
                return response.json().then(json => {

                    dispatch({
                        type: SET_CONNECTION_TIME_SUCCESS,
                        messages: [json]
                    });
                })
            } else {
                return response.json().then(json => {
                    dispatch({
                        type: SET_CONNECTION_TIME_FAILURE,
                        messages: Array.isArray(json) ? json : [json]
                    });
                })
            }
        })

    };
}

export function selectMatch(matchIndex) {
    return {type: SELECT_MATCH, matchIndex: matchIndex};
}

export function deleteConnection(connectionId) {
    return dispatch => {
        dispatch({
            type: CLEAR_MESSAGES
        });
        return fetch(`/connections/${connectionId}`, {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},

        }).then(response => {
            if (response.ok) {
                return response.json().then(json => {

                    dispatch({
                        type: DELETE_CONNECTION_SUCCESS,
                        messages: [json]
                    });
                })
            } else {
                return response.json().then(json => {
                    dispatch({
                        type: DELETE_CONNECTION_FAILURE,
                        messages: Array.isArray(json) ? json : [json]
                    });
                })
            }
        })

    };
}