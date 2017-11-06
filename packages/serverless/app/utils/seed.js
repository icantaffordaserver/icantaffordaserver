import UserData from './MOCK_DATA.json'
import ConnectionData from './connections.json'

import client from '../../config/GraphQLClient'

export default async (req, res) => {
  const loggedInUserId = 'cj9ofpke800mp0150oabzwop9' // This is to seed connections

  //Uncomment if you need to delete users and replace id array with users you'd like to keep
  // const { allUsers } = await client.request(`query{allUsers{id}}`)

  // allUsers.map(async user => {
  //   if (
  //     !['cj967wrtq008c0151v3id3wkg', 'cj967z5th00940151pabux3g9'].includes(
  //       user.id,
  //     )
  //   ) {
  //     const res = await client.request(
  //       `mutation delete($id: ID!){
  //         deleteUser(id:$id){
  //           id
  //         }
  //       }`,
  //       { id: user.id },
  //     )
  //   }
  // })

  // UserData.map(async User => {
  //   const { signUpUser } = await client.request(
  //     `
  //   mutation signUp(
  //     $email: String!
  //     $password: String!
  //     $firstName: String!
  //     $lastName: String!
  //     $birthday: String!
  //     $bio: String!
  //     $location: String
  //     $inviteId: ID
  //   ) {
  //     signUpUser(
  //       email: $email
  //       password: $password
  //       firstName: $firstName
  //       lastName: $lastName
  //       birthday: $birthday
  //       bio: $bio
  //       location: $location
  //       inviteId: $inviteId
  //     ) {
  //       id
  //     }
  //   }
  //   `,
  //     User,
  //   )

  //   // const { user } = await client.request(
  //   //   `mutation verify($id: ID!){
  //   //   updateUser(id:$id, emailVerified:true){
  //   //     id
  //   //   }
  //   // }`,
  //   //   { id: signUpUser.id },
  //   // )
  // })

  const { allUsers } = await client.request(
    `query{
      allUsers(
        last: ${ConnectionData.length}, 
        filter:{
          id_not: "${loggedInUserId}"
        }
      ){
        id
      }
    }`,
  )

  for (let i = 0; i < ConnectionData.length; i++) {
    let connection = ConnectionData[i]
    let response = await client.request(
      `
      mutation connection($connectionTime:DateTime!, $status:ConnectionStatus!, $participantsIds:[ID!]!, $token:String!){
        createConnections(connectionTime:$connectionTime, status:$status, participantsIds:$participantsIds, token:$token){
          id
        }
      }
    `,
      Object.assign({}, connection, {
        participantsIds: [loggedInUserId, allUsers[i].id],
      }),
    )
  }
}
