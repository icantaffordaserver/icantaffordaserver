/**
 * Created by alexandermann on 2017-04-15.
 */
import moment from 'moment';

// check in ms if the time in the future is larger than the time now in ms
export default function isTimeRemaining(timeToCountdownTo) {
  return Date.now() < moment(timeToCountdownTo).valueOf();
}
