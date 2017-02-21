/**
 * Created by alexandermann on 2017-01-27.
 */
import {
  BEGIN_FETCH_INVITE_REQUESTS,
  FETCH_INVITE_REQUESTS_FAILURE,
  FETCH_INVITE_REQUESTS_SUCCESS,
  CHECK_INVITE_REQUEST,
  UNCHECK_INVITE_REQUEST,
} from './constants';
import {
  CLEAR_MESSAGES,
  APPROVE_INVITE_SUCCESS,
  APPROVE_INVITE_FAILURE,
} from '../../../shared/components/Messages/constants';
import { handleResponse } from '../helpers';

export function fetchInviteRequests() {
  return (dispatch) => {
    dispatch(beginFetchInviteRequests());
    return fetch('/request')
      .then((response) => {
        if (response.ok) {
          return response.json().then((json) => {
            dispatch(fetchInviteRequestsSuccess(Array.isArray(json.data) ? json.data : [json.data]));
          });
        }
        dispatch(fetchInviteRequestsFailure());
      });
  };
}

export function toggleInviteRequestCheckbox(inviteRequestId, checkedRequestsArray) {
  return (dispatch) => {
    if (checkedRequestsArray.includes(inviteRequestId)) {
      return dispatch({
        type: UNCHECK_INVITE_REQUEST,
        inviteRequestId,
      });
    }
    dispatch({
      type: CHECK_INVITE_REQUEST,
      inviteRequestId,
    });
  };
}

export function approveInvites(inviteIds, sentByUserId) {
  return (dispatch) => {
    dispatch({
      type: CLEAR_MESSAGES,
    });
    return fetch('/request/approve', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        invites_approved: inviteIds,
        sent_by_user_account_id: sentByUserId,
      }),
    })
      .then((response) => {
        handleResponse(dispatch, response, APPROVE_INVITE_SUCCESS, APPROVE_INVITE_FAILURE);
      });
  }
    ;
}

function beginFetchInviteRequests() {
  return { type: BEGIN_FETCH_INVITE_REQUESTS };
}

function fetchInviteRequestsSuccess(inviteRequests) {
  return { type: FETCH_INVITE_REQUESTS_SUCCESS, inviteRequests };
}

function fetchInviteRequestsFailure() {
  return { type: FETCH_INVITE_REQUESTS_FAILURE };
}
