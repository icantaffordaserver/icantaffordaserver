/**
 * Created by alexandermann on 2017-04-03.
 */

export default `
  mutation deleteVerifyEmail($id: ID!) {
    deleteVerifyEmail(input: {id: $id}) {
      clientMutationId
    }
  }
`;
