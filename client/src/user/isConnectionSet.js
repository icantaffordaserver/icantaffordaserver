/**
 * Created by alexandermann on 2017-04-13.
 */

// check if a connectionTime is in the future
// can further build on this by getting the values in the db of the connection times and determining
// if there is a connection set for a time in the future, then check if it has a firestarter and
// time etc..
export default (connectionTime) => Date.now() < Date.parse(connectionTime);
