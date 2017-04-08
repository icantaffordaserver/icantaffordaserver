import React from 'react';
import { Grid, Header, Form, Segment, Input, Button, Message, Icon } from 'semantic-ui-react';
import isEmail from 'validator/lib/isEmail';

const propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool.isRequired,
  success: React.PropTypes.bool.isRequired,
  error: React.PropTypes.bool.isRequired,
  message: React.PropTypes.string.isRequired,
};

class Forgot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      error: '',
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event, data) => {
    event.preventDefault();
    this.setState({ error: '' }); // clear any existing errors

    const { email } = data.formData;

    if (!isEmail(email)) {
      this.setState({ error: 'Please enter a valid email' });
    } else {
      this.props.onSubmit(email);
    }
  };

  renderMessage() {
    // use props for server errors, state for client side errors
    // if an error message exists in state then show it
    if (this.state.error !== '') {
      return (
        <Message warning icon>
          <Icon name="warning" />
          <Message.Content>
            <Message.Header>{this.state.error}</Message.Header>
          </Message.Content>
        </Message>
      );
    } else if (this.props.success || this.props.error) {
      return (
        <Message warning={this.props.error} success={this.props.success} icon>
          {this.props.success && <Icon name="check circle" />}
          {this.props.error && <Icon name="warning" />}
          <Message.Content>
            <Message.Header>{this.props.message}</Message.Header>
          </Message.Content>
        </Message>
      );
    }
    return null;
  }

  render() {
    return (
      <Grid centered verticalAlign="middle">
        <Grid.Column width={6} textAlign="center">
          <Header as="h2" color="teal">
            Forgot Password
          </Header>
          {this.renderMessage()}
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment padded>
              <Header as="h3">
                Enter your email address below and we'll send you password reset instructions.
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
              <Button fluid color="teal" size="large" loading={this.props.loading}>
                Reset
                Password
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

Forgot.propTypes = propTypes;

export default Forgot;
