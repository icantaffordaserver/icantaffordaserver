/**
 * Created by alexandermann on 2017-04-14.
 */
import moment from 'moment';
import countdown from 'countdown';

// check in ms if the time in the future is larger than the time now in ms
export function isTimeRemaining(timeToCountdownTo) {
  return Date.now() < moment(timeToCountdownTo).valueOf();
}

// accepts a timeToCountdownTo which is a string in ISO8601 format
export function timeRemainingString(timeToCountdownTo) {
  return countdown(moment(timeToCountdownTo)).toString();
}
