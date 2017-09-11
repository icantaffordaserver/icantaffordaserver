/**
 * Created by alexandermann on 2017-03-06.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { graphql, compose, withApollo } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import MyAccount from '../components/MyAccount'

import currentUserQuery from '../../../shared/graphql/queries/currentUserQuery'
import changeEmailMutation from '../../../../../graphql/changeEmailMutation'
import updateUserMutation from '../../../shared/graphql/mutations/updateUserMutation'
import deleteUserMutation from '../../../../../graphql/account/deleteUserMutation'

const propTypes = {
  data: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
}

class MyAccountContainer extends React.Component {
  state = {
    loading: false,
  }

  handleSave = async (email, password, phoneNumber) => {
    event.preventDefault()
    const { user: dbUser } = this.props.data

    this.setState({ loading: true })
    if (dbUser.email !== email) {
      await this.props.changeEmailMutation({
        variables: {
          input: {
            emailToVerify: email,
            userId: dbUser.id,
          },
        },
      })
    }
    await this.props.updateUser({
      variables: {
        input: {
          id: this.props.data.user.id, // pass the id in to the mutation
          password: password || null,
          phoneNumber: phoneNumber || null,
        },
      },
    })
    await this.props.data.refetch() // refetch the current user
    this.setState({ loading: false })
  }

  deleteAccount = async () => {
    try {
      this.setState({ loading: true })
      await this.props.deleteUser({
        variables: {
          id: this.props.data.user.id,
        },
      })
      this.props.client.resetStore()
      this.setState({ loading: false })
      this.props.history.push('/')
    } catch (err) {
      console.log('Unable to delete user:', err)
    }
  }

  render() {
    if (this.props.data.loading) return null

    return (
      <MyAccount
        loading={this.props.data.loading || this.state.loading}
        user={this.props.data.user}
        onChange={this.handleChange}
        onSubmit={this.handleSave}
        deleteAccount={this.deleteAccount}
      />
    )
  }
}

MyAccountContainer.propTypes = propTypes

export default compose(
  withApollo,
  withRouter,
  graphql(currentUserQuery),
  graphql(changeEmailMutation, { name: 'changeEmailMutation' }),
  graphql(updateUserMutation, { name: 'updateUser' }),
  graphql(deleteUserMutation, { name: 'deleteUser' }),
)(MyAccountContainer)
