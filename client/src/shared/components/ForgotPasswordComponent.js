import React from 'react';
import { Grid, Header, Form, Segment, Input, Button, Message, Icon } from 'semantic-ui-react';

const propTypes = {
  onChange: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  email: React.PropTypes.string.isRequired,
  loading: React.PropTypes.bool.isRequired,
  success: React.PropTypes.bool.isRequired,
  error: React.PropTypes.bool.isRequired,
  message: React.PropTypes.string.isRequired,
};

class Forgot extends React.Component {
  renderMessage() {
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

  render() {
    return (
      <Grid centered verticalAlign="middle">
        <Grid.Column width={6} textAlign="center">
          <Header as="h2" color="teal">
            Forgot Password
          </Header>
          {(this.props.success || this.props.error) && this.renderMessage()}
          <Form onSubmit={this.props.onSubmit} size="large">
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
              <Button fluid color="teal" size="large" loading={this.props.loading}>Reset
                Password</Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

Forgot.propTypes = propTypes;

export default Forgot;
