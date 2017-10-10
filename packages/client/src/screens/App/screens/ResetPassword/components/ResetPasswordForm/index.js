import React from 'react'
import PropTypes from 'prop-types'
import {
  Header,
  Message,
  Grid,
  Form,
  Input,
  Button,
  Icon,
  Segment,
} from 'semantic-ui-react'

class ResetPasswordForm extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }
  state = { password: '', confirm: '', error: false, errorMessage: '' }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { password, confirm } = this.state
    // basic validation for the password fields
    if (password !== confirm) {
      return this.setState({
        error: true,
        errorMessage: 'Passwords do not match',
      })
    } else if (password === '' || confirm === '') {
      return this.setState({
        error: true,
        errorMessage: 'Please complete both password fields',
      })
    }
    // clear the error if there was one previously
    this.setState({ error: false, errorMessage: '' })
    // call the onSubmit function passed down through props with the confirmed password
    return this.props.onSubmit(this.state.password)
  }

  renderMessage() {
    return (
      <Message warning={this.props.error} success={this.props.success} icon>
        {this.props.success && <Icon name="check circle" />}
        {this.props.error && <Icon name="warning" />}
        <Message.Content>
          {this.props.success && (
            <Message.Header>Password reset succesfully</Message.Header>
          )}
          {this.props.error && (
            <Message.Header>{this.props.error}</Message.Header>
          )}
        </Message.Content>
      </Message>
    )
  }

  render() {
    return (
      <Grid centered verticalAlign="middle">
        <Grid.Column width={6} textAlign="center">
          <Header as="h2" content={'Enter your new password'} color="teal" />
          {(this.props.success || this.props.error) && this.renderMessage()}
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment padded>
              <Header as="h3">
                Enter your email address below and we'll send you password reset
                instructions.
              </Header>
              <Form.Field inline>
                <Input
                  name="password"
                  type="password"
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="New Password"
                  onChange={this.handleChange}
                  value={this.state.password}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  name="confirm"
                  type="password"
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Confirm Password"
                  onChange={this.handleChange}
                  value={this.state.confirm}
                />
              </Form.Field>
              {this.state.error && (
                <Header as="h5" content={this.state.errorMessage} color="red" />
              )}
              <Button
                fluid
                color="teal"
                size="large"
                loading={this.props.loading}
              >
                Reset Password
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

export default ResetPasswordForm
