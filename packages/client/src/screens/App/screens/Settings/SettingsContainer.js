import React, { Component } from 'react'
import { graphql, compose, withApollo } from 'react-apollo'
import { Flex, Box } from 'grid-styled'

import TitleSection from './components/TitleSection'
import EmailPasswordForm from './components/EmailPasswordForm'
import LocationForm from './components/LocationForm'
import DeleteAccountForm from './components/DeleteAccountForm'
import ConfirmAndCancel from '../Profile/components/shared/ConfirmAndCancel.js'

import currentUserQuery from '../../shared/graphql/queries/currentUserQuery'
import updateUserMutation from '../../shared/graphql/mutations/updateUserMutation'
import deleteUserMutation from '../../shared/graphql/mutations/deleteUserMutation'
import updatePasswordMutation from '../../shared/graphql/mutations/updatePasswordMutation'

const FullScreen = Flex.extend`
  height: 90vh;
`
class SettingsContainer extends Component {
  state = {
    showModal: false,
    email: '',
    repeatEmail: '',
    password: '',
    repeatPassword: '',
    location: '',
    deleteAccount: '',
    feedback: '',
  }

  handleCloseModal = () => this.setState({ showModal: false })

  handleOpenModal = () => this.setState({ showModal: true })

  handleInputChange = event =>
    this.setState({ [event.target.name]: event.target.value })

  handleClear = () =>
    this.setState({
      email: '',
      repeatEmail: '',
      password: '',
      repeatPassword: '',
      location: '',
      deleteAccount: '',
    })

  handleSave = () => {
    const {
      email,
      repeatEmail,
      password,
      repeatPassword,
      location,
    } = this.state
    const { user } = this.props.data

    if (password === repeatPassword && password !== '') {
      this.props
        .updatePassword({
          variables: {
            email: user.email,
            newPassword: password,
          },
          refetchQueries: [{ query: currentUserQuery }],
        })
        .then(() => {
          this.props.history.push('/profile')
        })
        .catch(err => {
          console.error(err)
        })
    }

    if (email === repeatEmail && email !== '' && location === '') {
      this.props
        .updateUser({
          variables: {
            id: user.id,
            email,
          },
          refetchQueries: [{ query: currentUserQuery }],
        })
        .then(() => {
          this.props.history.push('/profile')
        })
        .catch(err => {
          console.error(err)
        })
    }

    if (email === repeatEmail && email !== '' && location !== '') {
      this.props
        .updateUser({
          variables: {
            id: user.id,
            email,
            location,
          },
          refetchQueries: [{ query: currentUserQuery }],
        })
        .then(() => {
          this.props.history.push('/profile')
        })
        .catch(err => {
          console.error(err)
        })
    }

    if (email === repeatEmail && email === '' && location !== '') {
      this.props
        .updateUser({
          variables: {
            id: user.id,
            location,
          },
          refetchQueries: [{ query: currentUserQuery }],
        })
        .then(() => {
          this.props.history.push('/profile')
        })
        .catch(err => {
          console.error(err)
        })
    }
  }

  handleDelete = () => {
    const { deleteAccount } = this.state
    const { user } = this.props.data

    if (deleteAccount === 'GOODBYE') {
      this.props
        .deleteUser({
          variables: {
            id: user.id,
          },
        })
        .then(() => {
          this.props.client.resetStore()
          this.props.history.push('/signup')
        })
        .catch(err => {
          console.error(err)
        })
    }

    this.setState({ showModal: false })
  }

  render() {
    const {
      email,
      repeatEmail,
      password,
      repeatPassword,
      location,
      deleteAccount,
      feedback,
      showModal,
    } = this.state

    if (this.props.data.loading) return null
    return (
      <FullScreen wrap>
        <Flex width={1} wrap>
          <Box width={1} p={2}>
            <TitleSection title={'SETTINGS'} />
          </Box>
          <Box width={1} p={2}>
            <EmailPasswordForm
              email={email}
              repeatEmail={repeatEmail}
              password={password}
              repeatPassword={repeatPassword}
              handleInputChange={this.handleInputChange}
            />
          </Box>
          <Box width={1} p={2}>
            <LocationForm
              location={location}
              handleInputChange={this.handleInputChange}
            />
          </Box>
          <Box width={1} p={2}>
            <DeleteAccountForm
              showModal={showModal}
              deleteAccount={deleteAccount}
              feedback={feedback}
              handleInputChange={this.handleInputChange}
              handleDelete={this.handleDelete}
              handleCloseModal={this.handleCloseModal}
              handleOpenModal={this.handleOpenModal}
            />
          </Box>
          <Box width={1} p={2}>
            <ConfirmAndCancel
              handleSave={this.handleSave}
              handleCancel={this.handleClear}
            />
          </Box>
        </Flex>
      </FullScreen>
    )
  }
}

// export default SettingsContainer
export default compose(
  graphql(currentUserQuery),
  graphql(updatePasswordMutation, { name: 'updatePassword' }),
  graphql(updateUserMutation, { name: 'updateUser' }),
  graphql(deleteUserMutation, { name: 'deleteUser' }),
  withApollo,
)(SettingsContainer)
