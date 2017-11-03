import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { graphql, compose, withApollo } from 'react-apollo'
import { isEmail } from 'validator'

import isVerified from '../../../shared/HoCs/isVerified'
import isAuthenticated from '../../../shared/HoCs/isAuthenticated'
import ProfileComponent from '../components/ProfileComponent'

import currentUserQuery from '../../../shared/graphql/queries/currentUserQuery'
import updateUserMutation from '../../../shared/graphql/mutations/updateUserMutation'

class ProfileContainer extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    client: PropTypes.object.isRequired,
  }

  state = {
    loading: false,
    success: false,
    error: false,
    editing: false,
  }

  componentWillReceiveProps = nextProps => {
    if (!nextProps.data.loading) {
      //this.handleEditProfile(nextProps.data.user);
    }
  }

  handleOpen = () => {
    this.setState({ editing: !this.state.editing })
  }
  handleEditProfile = userData => {
    //TODO: Figure out how to edit user email and password
    this.setState({ loading: true })
    if (userData.email) {
      if (!isEmail(userData.email)) {
        this.setState({ error: true })
        return
      }
    }
    this.props
      .updateUser({
        variables: {
          id: userData.id,
          firstName: userData.firstName,
          lastName: userData.lastName,
          bio: userData.bio,
          location: userData.location,
          email: userData.email,
          profilePhotoId: userData.profilePhoto,
        },
        refetchQueries: [{ query: currentUserQuery }],
      })
      .then(response => {
        this.setState({ loading: false, success: true, editing: false })
      })
      .catch(err => {
        console.error(err)
        this.setState({ loading: false, error: true })
        this.props.client.resetStore()
      })
  }

  render() {
    if (this.props.data.loading) return null

    return (
      <ProfileComponent
        onSubmit={this.handleEditProfile}
        user={this.props.data.user}
        error={this.state.error}
        loading={this.state.loading}
        success={this.state.success}
        editing={this.state.editing}
        open={this.handleOpen}
      />
    )
  }
}

export default compose(
  isVerified,
  isAuthenticated,
  graphql(currentUserQuery),
  graphql(updateUserMutation, { name: 'updateUser' }),
  withApollo,
)(ProfileContainer)
