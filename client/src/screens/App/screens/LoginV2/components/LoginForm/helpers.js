import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';

export function validateLogin(email, password) {
  const isFieldEmpty = isEmpty(email) || isEmpty(password);
  if (isFieldEmpty) return 'Please fill in both email and password';
  const isEmailValid = isEmail(email);
  if (!isEmailValid) return 'Please enter a valid email';
  return false;
}
