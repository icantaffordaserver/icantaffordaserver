/**
 * Created by alexandermann on 2017-02-16.
 */
// This file contains the sagas used for async actions in our app. It's divided into
// "effects" that the sagas call (`authorize` and `logout`) and the actual sagas themselves,
// which listen for actions.

// Sagas help us gather all our side effects (network requests in this case) in one place

import { browserHistory } from 'react-router';
import { take, call, put, takeEvery, race } from 'redux-saga/effects';
import { signup, login, logout as logger } from './api';
import { saveSession, clearSession } from './services';

import * as types from './constants';

/**
 * Effect to handle authorization
 * @param  {string} email               The username of the user
 * @param  {string} password               The password of the user
 * @param  {object} options                Options
 * @param  {boolean} options.isRegistering Is this a register request?
 */
export function* authorize({ email, password, isRegistering }) {
  // Send an action to tell Redux that we are sending a request
  yield put({ type: types.SENDING_REQUEST, sending: true });

  // Try to either log in the user or register them depending on the request
  try {
    let response;

    // For either log in or registering, we call the proper function in the `auth`
    // module, which is asynchronous. Because we're using generators, we can work
    // as if it's synchronous because we pause execution until the call is done
    // with `yield`!
    if (isRegistering) {
      response = yield call(signup, email, password);
    } else {
      response = yield call(login, email, password);
    }
    return response;
  } catch (err) {
    console.log('An error occurred');
    // If we get an error we send Redux the appropriate action and return
    yield put({ type: types.REQUEST_ERROR, error: err.message });

    return false;
  } finally {
    // When done, we tell Redux that we are finished sending a request
    yield put({ type: types.SENDING_REQUEST, sending: false });
  }
}

/**
 * Effect to handle logging out
 */
export function* logout() {
  // We tell Redux we're in the middle of a request
  yield put({ type: types.SENDING_REQUEST, sending: true });

  // Similar to above, we try to log out by calling the `logout` function in the
  // `auth` module. If we get an error, we send an appropriate action. If we don't,
  // we return the response.
  try {
    const response = yield call(logger);
    yield put({ type: types.SENDING_REQUEST, sending: false });

    return response;
  } catch (err) {
    yield put({ type: types.REQUEST_ERROR, error: err.message });
    return false;
  }
}

/**
 * Log in saga
 */
export function* loginFlow(action) {
  const { email, password } = action.payload;

  // A `LOGOUT` action may happen while the `authorize` effect is going on, which may
  // lead to a race condition. This is unlikely, but just in case, we call `race` which
  // returns the "winner", i.e. the one that finished first
  const winner = yield race({
    auth: call(authorize, { email, password, isRegistering: false }),
    logout: take(types.LOGOUT),
  });

  // If `authorize` was the winner...
  if (winner.auth) {
    // ...we send Redux the appropriate actions
    yield put({ type: types.SET_AUTH, newAuthState: true, user: winner.auth.user }); // User is logged in
    yield put({ type: types.CHANGE_FORM, newFormState: { email: '', password: '' } }); // Clear form
    yield call(saveSession, winner.auth.token, winner.auth.user); // save the authentication token to localStorage
    forwardTo('/'); // Go to dashboard page

    // If `logout` won...
  } else if (winner.logout) {
    // ...we send Redux appropriate action
    yield put({ type: types.SET_AUTH, newAuthState: false, user: null }); // User is not logged in (not authorized)
    yield call(logout); // Call `logout` effect
    forwardTo('/'); // Go to root page
  }
}

/**
 * Log out saga
 * This is basically the same as the `if (winner.logout)` of above, just written
 * as a saga that is always listening to `LOGOUT` actions
 */
export function* logoutFlow() {
  yield put({ type: types.SET_AUTH, newAuthState: false, user: null });
  yield call(clearSession);
  yield call(logout);
  forwardTo('/');
}

/**
 * Register saga
 * Very similar to log in saga!
 */
export function* registerFlow(action) {
  const { email, password } = action.payload;

  // We call the `authorize` task with the data, telling it that we are registering a user
  // This returns `true` if the registering was successful, `false` if not
  const wasSuccessful = yield call(authorize, { email, password, isRegistering: true });

  // If we could register a user, we send the appropriate actions
  if (wasSuccessful) {
    yield put({ type: types.SET_AUTH, newAuthState: true }); // User is logged in (authorized) after being registered
    yield put({ type: types.CHANGE_FORM, newFormState: { email: '', password: '' } }); // Clear form
    forwardTo('/'); // Go to dashboard page
  }
}

// The root saga is what we actually send to Redux's middleware. In here we takeEvery
// saga so that they are all "active" and listening.
// Sagas are fired once at the start of an app and can be thought of as processes running
// in the background, watching actions dispatched to the store.
export default function* root() {

  // And we're listening for various actions
  yield takeEvery(types.LOGIN_REQUEST, loginFlow);
  yield takeEvery(types.LOGOUT, logoutFlow);
  yield takeEvery(types.REGISTER_REQUEST, registerFlow);
}

// Little helper function to abstract going to different pages
function forwardTo(location) {
  browserHistory.push(location);
}
