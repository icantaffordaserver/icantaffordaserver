/**
 * Created by alexandermann on 2017-03-26.
 */
import isEmpty from 'validator/lib/isEmpty'
import isEmail from 'validator/lib/isEmail'

import config from '../config'

export function validateLogin(email, password) {
  const isFieldEmpty = isEmpty(email) || isEmpty(password)
  if (isFieldEmpty) return 'Please fill in both email and password'
  const isEmailValid = isEmail(email)
  if (!isEmailValid) return 'Please enter a valid email'
  return false
}

export function validateSignUp(firstName, lastName, email, password) {
  const isFieldEmpty =
    isEmpty(firstName) || isEmpty(lastName) || isEmpty(email) || isEmpty(password)
  if (isFieldEmpty) return 'All fields must be completed'
  const isEmailValid = isEmail(email)
  if (!isEmailValid) return 'Please enter a valid email'
  return false
}

export function uploadProfileImg(file, userId, firstName, lastName) {
  const form = new FormData()
  form.append(
    'query',
    `mutation CreateFile($input: CreateFileInput!) {
      createFile(input: $input) {
        changedFile {
          id
          name
          blobMimeType
          blobUrl
          user {
            id
            username
          }
        }
      }
    }`,
  )
  form.append(
    'variables',
    JSON.stringify({
      input: {
        name: `${firstName} ${lastName} Profile Picture`,
        userId,
        blobFieldName: 'profileImage',
      },
    }),
  )
  // The file's key matches the value of the field `blobFieldName` in the variables
  form.append('profileImage', file)

  return fetch(`https://${config.scapholdUrl}`, {
    method: 'POST',
    body: form,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('scaphold_user_token')}`,
    },
  }).then(res => res.json())
}
