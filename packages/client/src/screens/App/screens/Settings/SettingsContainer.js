import React, { Component } from 'react'
import { graphql, compose, withApollo } from 'react-apollo'
import { Flex, Box } from 'grid-styled'

import { Message } from 'semantic-ui-react'
import TitleSection from './components/TitleSection'
import EmailPasswordForm from './components/EmailPasswordForm'
import LocationForm from './components/LocationForm'
import DeleteAccountForm from './components/DeleteAccountForm'
import ConfirmAndCancel from '../Profile/components/shared/ConfirmAndCancel.js'

import currentUserQuery from '../../shared/graphql/queries/currentUserQuery'
import updateUserMutation from '../../shared/graphql/mutations/updateUserMutation'
import deleteUserMutation from '../../shared/graphql/mutations/deleteUserMutation'
import updatePasswordMutation from '../../shared/graphql/mutations/updatePasswordMutation'
import { SettingsWrapper } from './styles'

const FullScreen = Flex.extend`
  height: 100%;
`
class SettingsContainer extends Component {
  state = {
    showModal: false,
    deleteAccount: '',
    feedback: '',
    error: '',
  }

  handleCloseModal = () => this.setState({ showModal: false })

  handleOpenModal = () => this.setState({ showModal: true })

  handleInputChange = async event => {
    await this.setState({ [event.target.name]: event.target.value })

    if (!this.canSubmit())
      this.setState({ error: 'Some of your fields do not match.' })
    else this.setState({ error: '' })
  }

  handleClear = () =>
    this.setState({
      email: null,
      repeatEmail: null,
      password: null,
      repeatPassword: null,
      location: null,
      deleteAccount: '',
      loading: false,
      success: false,
    })

  handleSave = async () => {
    const { email, password, location } = this.state
    const { user } = this.props.data
    this.setState({ loading: true })
    try {
      if (email) {
        //Update any non-password changes
        await this.props.updateUser({
          variables: {
            email,
            id: user.id,
            location,
            refetchQueries: [{ query: currentUserQuery }],
          },
        })
      }

      if (password) {
        // Update password if requested
        await this.props.updatePassword({
          variables: {
            email: user.email,
            newPassword: password,
          },
          refetchQueries: [{ query: currentUserQuery }],
        })
      }

      this.setState({
        email: null,
        password: null,
        loading: false,
        success: true,
        error: '',
      })
    } catch (error) {
      console.error(error)
      this.setState({ loading: false, error: error.Message })
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

  canSubmit = () => {
    const { email, repeatEmail, password, repeatPassword } = this.state
    return email === repeatEmail && password === repeatPassword
  }
  renderMessages() {
    if (this.state.error) return <Message warning>{this.state.error}</Message>
    if (this.state.success)
      return <Message success>{this.state.success}</Message>
  }
  render() {
    const { location, deleteAccount, feedback, showModal } = this.state

    if (this.props.data.loading) return null
    return (
      <FullScreen wrap>
        <Flex width={1} wrap>
          <Box width={1} p={2}>
            <TitleSection title={'SETTINGS'} />
          </Box>
          <Box width={1} p={2}>
            {this.renderMessages()}
            <EmailPasswordForm handleInputChange={this.handleInputChange} />
          </Box>
          <Box width={1} p={2}>
            <LocationForm
              location={location}
              handleLocationChange={this.handleLocationChange}
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
              loading={this.state.loading}
              handleSave={this.handleSave}
              handleCancel={this.handleClear}
              canSubmit={this.canSubmit}
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
