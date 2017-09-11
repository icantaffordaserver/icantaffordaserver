/**
 * Created by alexandermann on 2017-03-26.
 */

import config from '../../../../../../../../../config'

export default function uploadProfileImg(file, userId, firstName, lastName) {
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
