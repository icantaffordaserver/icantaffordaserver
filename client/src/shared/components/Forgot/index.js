import React from 'react';
import { connect } from 'react-redux';
import { Grid, Header, Form, Segment, Input, Button } from 'semantic-ui-react';
import { forgotPassword } from './actions';
import Messages from '../Messages';

class Forgot extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleForgot = this.handleForgot.bind(this);
    this.state = { email: '' };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleForgot(event) {
    event.preventDefault();
    this.props.dispatch(forgotPassword(this.state.email));
  }

  render() {
    return (
      <Grid centered verticalAlign="middle">
        <Grid.Column width={6} textAlign="center">
          <Header as="h2" color="teal">
            Forgot Password
          </Header>
          <Messages messages={this.props.messages} />
          <Form onSubmit={this.handleForgot} size="large">
            <Segment padded>
              <Header as="h3">Enter your email address below and we'll send you password reset instructions.</Header>
              <Form.Field>
                <Input
                  name="email"
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Button fluid color="teal" size="large">Reset Password</Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  messages: state.messages,
});

export default connect(mapStateToProps)(Forgot);
