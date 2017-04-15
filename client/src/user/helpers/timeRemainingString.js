/**
 * Created by alexandermann on 2017-04-15.
 */
import moment from 'moment';
import countdown from 'countdown';

// accepts a timeToCountdownTo which is a string in ISO8601 format
export default function timeRemainingString(timeToCountdownTo) {
  return countdown(moment(timeToCountdownTo)).toString();
}
