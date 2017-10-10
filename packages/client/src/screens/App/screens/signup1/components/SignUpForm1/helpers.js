import isEmpty from 'validator/lib/isEmpty'
import isEmail from 'validator/lib/isEmail'
import moment from 'moment'

export function validateSignUp(obj) {
  const DOB_FORMAT = 'DD/MM/YYYY'
  const isFieldEmpty =
    isEmpty(obj.firstName) ||
    isEmpty(obj.lastName) ||
    isEmpty(obj.email) ||
    isEmpty(obj.password) ||
    isEmpty(obj.birthday) ||
    isEmpty(obj.bio) ||
    isEmpty(obj.location)
  if (isFieldEmpty) return 'All fields must be completed'
  const isEmailValid = isEmail(obj.email)
  if (!isEmailValid) return 'Please enter a valid email'

  const oldEnough = moment(obj.birthday, DOB_FORMAT).isBefore(
    moment().subtract(18, 'y'),
  )

  if (!oldEnough) return 'Must be over the age of 18'
  return false
}
