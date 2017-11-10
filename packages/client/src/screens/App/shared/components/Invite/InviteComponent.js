import React, { Component } from 'react'
import { withApollo, graphql, compose } from 'react-apollo'

import currentUserQuery from '../../graphql/queries/currentUserQuery'
import sendInviteMutation from '../../graphql/mutations/sendInviteMutation'

import { Modal, Icon, Message } from 'semantic-ui-react'
import {
  Form,
  Button,
  FormGroup,
  Input,
  Label,
  ColumnContainer,
  Title,
} from '../../../styles'

class InviteComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      success: false,
      loading: false,
      error: '',
    }
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
      <Modal trigger={<Button>Invite a Friend!</Button>} basic>
        <ColumnContainer white>
          <Form onSubmit={this.handleInvite}>
            <Title medium fullWidth>
              <Icon name="send" /> Invite a Friend!
            </Title>
            {this.renderMessage()}
            <FormGroup>
              <Label htmlFor="firstName">First Name:</Label>
              <Input
                name="firstName"
                placeholder="e.g. John"
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="lastName">Last Name:</Label>
              <Input
                name="lastName"
                placeholder="e.g. Smith"
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="emailToInvite">Email:</Label>
              <Input
                name="emailToInvite"
                placeholder="e.g. your@email.com"
                onChange={this.onChange}
              />
            </FormGroup>
            <Button loading={this.state.loading}>Submit</Button>
          </Form>
        </ColumnContainer>
      </Modal>
    )
  }
}

export default compose(
  withApollo,
  graphql(currentUserQuery),
  graphql(sendInviteMutation),
)(InviteComponent)
