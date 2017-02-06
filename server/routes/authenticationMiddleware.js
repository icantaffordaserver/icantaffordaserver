/**
 * Created by alexandermann on 2017-02-03.
 */
/**
 * Login required middleware
 */
export function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
}
