import isEmpty from 'validator/lib/isEmpty'
import isEmail from 'validator/lib/isEmail'
import isBefore from 'validator/lib/isBefore'

export function validateSignUp(firstName, lastName, email, password, dob) {
  const isFieldEmpty =
    isEmpty(firstName) || isEmpty(lastName) || isEmpty(email) || isEmpty(password) || isEmpty(dob.toString())
  if (isFieldEmpty) return 'All fields must be completed'
  const isEmailValid = isEmail(email)
  if (!isEmailValid) return 'Please enter a valid email'
  let todayMinus18 = new Date()
  let dd = todayMinus18.getDate()
  let mm = todayMinus18.getMonth()+1
  let yyyy = todayMinus18.getFullYear()-18

  todayMinus18 = dd + '/' + mm + '/' + yyyy

  const oldEnough = isBefore(dob.toString(),todayMinus18.toString())
  if (!oldEnough) return 'Must be over the age of 18'
  return false
}
