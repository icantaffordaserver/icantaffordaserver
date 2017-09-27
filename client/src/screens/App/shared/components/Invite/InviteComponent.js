import React, { Component } from 'react'
import { withApollo, graphql, compose } from 'react-apollo'

import currentUserQuery from '../../graphql/queries/currentUserQuery'
import sendInviteMutation from '../../graphql/mutations/sendInviteMutation'

import { Button, Modal, Header, Icon, Message } from 'semantic-ui-react'
import {
  Form,
  FormButton,
  FormGroup,
  FormInput,
  FormLabel,
} from '../../../styles/Forms'

class InviteComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      success: false,
      loading: false,
      error: '',
    }
    this.handleInvite = this.handleInvite.bind(this)
  }

  onChange = e => {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  handleInvite = async (e, data) => {
    e.preventDefault()

    this.setState({ loading: true, error: '', success: false })
    const { emailToInvite, firstName, lastName } = this.state

    try {
      if (!emailToInvite || !firstName || !lastName)
        throw new Error('Please fill out all fields.')

      const response = await this.props.mutate({
        variables: {
          emailToInvite,
          firstName,
          lastName,
          userId: this.props.data.user.id,
        },
      })

      this.setState({ loading: false, success: true })
    } catch (error) {
      this.setState({ loading: false, error: error.message })
    }
  }

  renderMessage = () => {
    return (
      <div style={{ marginBottom: '1em' }}>
        {this.state.error && <Message color="red">{this.state.error}</Message>}
        {this.state.success && <Message color="green">Success!</Message>}
      </div>
    )
  }

  render = () => {
    return (
      <Modal trigger={<Button>Send Invite</Button>} basic>
        <div
          className="hnbfcgjknm"
          style={{
            marginTop: '20%',
            height: 'fit-content',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#fff',
            color: '#333',
            padding: '2em',
          }}
        >
          <Form onSubmit={this.handleInvite}>
            <Header
              size={'huge'}
              style={{ textAlign: 'center', marginBottom: '1em' }}
            >
              <Icon name="send" /> Invite a Friend!
            </Header>
            {this.renderMessage()}
            <FormGroup>
              <FormLabel htmlFor="firstName">First Name:</FormLabel>
              <FormInput
                name="firstName"
                placeholder="e.g. John"
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="lastName">Last Name:</FormLabel>
              <FormInput
                name="lastName"
                placeholder="e.g. Smith"
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="emailToInvite">Email:</FormLabel>
              <FormInput
                name="emailToInvite"
                placeholder="e.g. your@email.com"
                onChange={this.onChange}
              />
            </FormGroup>
            <FormButton loading={this.state.loading}>Submit</FormButton>
          </Form>
        </div>
      </Modal>
    )
  }
}

export default compose(
  withApollo,
  graphql(currentUserQuery),
  graphql(sendInviteMutation),
)(InviteComponent)
