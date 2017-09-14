export default `
    mutation createVerifyEmailMutation($emailToVerify: String!, $userId: ID!, $token:String!, $expiry:DateTime!) {
        createVerifyEmail(emailToVerify: $emailToVerify, expiry: $expiry, token: $token userId: $userId) {
            id
        }
    }
`
