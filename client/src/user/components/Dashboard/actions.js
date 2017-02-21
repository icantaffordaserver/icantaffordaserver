/**
 * Created by alexandermann on 2017-01-31.
 */
import {
  RESEND_VERIFICATION_EMAIL,
  FETCH_UPCOMING_CONNECTIONS,
  REQUEST_CONNECTION,
} from './constants';

export function resendVerificationEmail() {
  return {
    type: RESEND_VERIFICATION_EMAIL,
  };
}

export function getMyConnections() {
  return {
    type: FETCH_UPCOMING_CONNECTIONS,
  };
}

export function requestConnection(comment) {
  return {
    type: REQUEST_CONNECTION,
    comment,
  };
}