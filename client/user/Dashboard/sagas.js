/**
 * Created by alexandermann on 2017-02-01.
 */
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_UPCOMING_CONNECTIONS,
  RESEND_VERIFICATION_EMAIL,
  FETCH_UPCOMING_CONNECTIONS_SUCCESS,
  REQUEST_CONNECTION,
} from './constants';

function* fetchUpcomingConnections(action) {
  try {
    yield put({ type: 'FETCHING_UPCOMING_CONNECTIONS' });
    const upcomingConnections = yield call(axios.get, 'dashboard/myconnections');
    yield put({
      type: FETCH_UPCOMING_CONNECTIONS_SUCCESS,
      myConnections: upcomingConnections.data.myConnections,
    });
  } catch (err) {
    console.log(err);
  }
}

function* requestConnection(action) {
  try {
    yield put({ type: 'REQUESTING_CONNECTION' });
    yield call(axios.post, 'dashboard/connectionrequest', { comment: action.comment });
    yield put({ type: 'REQUEST_CONNECTION_SUCCESS' });
  } catch (err) {
    yield put({ type: 'REQUEST_CONNECTION_FAILURE' });
  }
}

function* resendVerificationEmail(action) {
  try {
    yield put({ type: 'RESENDING_VERIFICATION_EMAIL' });
    yield call(axios.get, 'verify/resend');
    yield put({ type: 'RESEND_VERIFICATION_EMAIL_SUCCESS' });
  } catch (error) {
    yield put({ type: 'RESEND_VERIFICATION_FAILED', error });
  }
}

export default function* mySaga() {
  yield takeLatest(FETCH_UPCOMING_CONNECTIONS, fetchUpcomingConnections);
  yield takeLatest(RESEND_VERIFICATION_EMAIL, resendVerificationEmail);
  yield takeLatest(REQUEST_CONNECTION, requestConnection);
}
