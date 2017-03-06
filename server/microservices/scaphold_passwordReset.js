/**
 * Created by alexandermann on 2017-03-03.
 */
module.exports = function validateEmail(ctx, cb) {
  cb(null, {
    input: {
      email: 'xyz',
      resetToken: 'asldkfjasldkfjas;lkdf',
      resetExpires: 'xyz',
    },
  });
};
