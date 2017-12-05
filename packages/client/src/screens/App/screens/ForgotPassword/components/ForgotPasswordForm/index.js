import React from 'react'
import PropTypes from 'prop-types'
import {
  Grid,
  Header,
  Form,
  Segment,
  Input,
  Message,
  Icon,
} from 'semantic-ui-react'

import { ResetPasswordButton } from './styles'

class Forgot extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
  }

  state = {
    email: '',
    error: '',
  }

  renderMessage() {
    // use props for server errors, state for client side errors if an error message
    // exists in state then show it
    if (this.state.error !== '') {
      return (
        <Message warning icon>
          <Icon name="warning" />
          <Message.Content>
            <Message.Header>{this.state.error}</Message.Header>
          </Message.Content>
        </Message>
      )
    } else if (this.props.success || this.props.error) {
      return (
        <Message warning={this.props.error} success={this.props.success} icon>
          {this.props.success && <Icon name="check circle" />}
          {this.props.error && <Icon name="warning" />}
          <Message.Content>
            <Message.Header>{this.props.message}</Message.Header>
          </Message.Content>
        </Message>
      )
    }
    return null
  }

  render() {
    return (
      <Grid centered verticalAlign="middle">
        <Grid.Column width={6} textAlign="center">
          {this.renderMessage()}
          <Form onSubmit={this.props.onSubmit} size="large">
            <Segment padded>
              <Header as="h2" color="Black">
                Forgot Password
              </Header>
              <Header as="h3">
                Enter your email address below and we'll send you password reset
                instructions.
              </Header>
              <Form.Field>
                <Input
                  name="email"
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  onChange={this.props.onChange}
                  value={this.props.email}
                />
              </Form.Field>
              <ResetPasswordButton
                fluid
                size="large"
                loading={this.props.loading}
              >
                Reset Password
              </ResetPasswordButton>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Forgot
