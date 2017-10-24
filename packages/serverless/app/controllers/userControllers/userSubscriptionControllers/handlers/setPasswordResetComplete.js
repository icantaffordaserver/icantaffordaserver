const fromEvent = require('graphcool-lib').fromEvent

// TODO: NEEDS TO BE REFACTORED
module.exports = function(event) {
  const id = event.data.User.node.id
  const graphcool = fromEvent(event)
  const api = graphcool.api('simple/v1/toktumi-dev')

  function getPasswordReset(id) {
    return api
      .request(
        `
    query {
      allPasswordResets(filter: {user: {id: "${id}"}}) {
        id
      }
    }`,
      )
      .then(passWordResetResult => {
        console.log(passWordResetResult)
        if (passWordResetResult.error) {
          return Promise.reject(passWordResetResult.error)
        } else {
          return passWordResetResult.allPasswordResets[0].id
        }
      })
  }

  function updatePasswordReset(id) {
    return api
      .request(
        `
      mutation {
        updatePasswordReset(
          id:"${id}",
          complete:true
        ){
          id
        }
      }`,
      )
      .then(passwordResetMutationResult => {
        return passwordResetMutationResult.updatePasswordReset.id
      })
  }

  return getPasswordReset(id)
    .then(resetId => {
      if (resetId === null) {
        return Promise.reject('No reset found.')
      } else {
        return updatePasswordReset(resetId)
      }
    })
    .then(id => {
      return { data: { id } }
    })
    .catch(error => {
      console.log(error)

      // don't expose error message to client!
      return { error: 'An unexpected error occured.' }
    })
}
