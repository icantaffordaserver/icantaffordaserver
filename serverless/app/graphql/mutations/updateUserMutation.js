export default `
  mutation updateUserPassword ($id: ID!, $password: String!){
    updateUser(id: $id, password: $password){
      id
    }
  }
`;
