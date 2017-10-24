export default `
    query getResetToken($id: ID!){
        PasswordReset(id:$id){
            token
            user {
                firstName
                email
            }
        }
    }
`;
