/**
 * Created by alexandermann on 2017-05-28.
 */
// check if a connectionTime is in the future
// can further build on this by getting the values in the db of the connection times and determining
// if there is a connection set for a time in the future, then check if it has a firestarter and
// time etc..
export const isConnectionSet = (connectionTime) => Date.now() < Date.parse(connectionTime)

export const extractYouTubeId = url => {
  let ID = ''
  url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)
  if (url[2] !== undefined) {
    ID = url[2].split(/[^0-9a-z_\-]/i)
    ID = ID[0]
  } else {
    ID = url
  }
  return ID
}
