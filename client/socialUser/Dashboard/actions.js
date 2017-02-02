/**
 * Created by alexandermann on 2017-01-31.
 */
import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCHING_UPCOMING_CONNECTIONS } from './constants';

function* fetchUpcomingConnections(action) {
  try {
    console.log('hello saga world ');
    yield put({ type: FETCHING_UPCOMING_CONNECTIONS });
    // const upcomingConnections = yield call();
  } catch (err) {
    console.log(err);
  }
}

function* resendVerificationEmail(action) {
  try {
    yield put({ type: 'RESENDING_VERIFICATION_EMAIL' });
  } catch (error) {
    yield put({ type: 'RESEND_VERIFICATION_FAILED', error });
  }
}

export default function* mySaga() {
  console.log('test saga if I work at all');
  yield takeLatest(FETCHING_UPCOMING_CONNECTIONS, fetchUpcomingConnections);
  yield takeLatest(FETCHING_UPCOMING_CONNECTIONS, resendVerificationEmail);
}
