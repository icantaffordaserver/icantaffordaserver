import isEmpty from 'validator/lib/isEmpty'
import isEmail from 'validator/lib/isEmail'

export function validateSignUp(firstName, lastName, email, password) {
  const isFieldEmpty =
    isEmpty(firstName) || isEmpty(lastName) || isEmpty(email) || isEmpty(password)
  if (isFieldEmpty) return 'All fields must be completed'
  const isEmailValid = isEmail(email)
  if (!isEmailValid) return 'Please enter a valid email'
  return false
}
