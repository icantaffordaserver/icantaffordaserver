import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Form, Header, Segment, Grid, Button, Divider } from 'semantic-ui-react';
import { signup } from './actions';
import { facebookLogin, twitterLogin, googleLogin, vkLogin, githubLogin } from '../OAuth/actions';
import Messages from '../Messages';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = { firstName: '', lastName: '', email: '', password: '' };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSignup(event) {
    event.preventDefault();
    this.props.dispatch(signup(
      this.state.firstName,
      this.state.lastName,
      this.state.email,
      this.state.password,
      this.props.params.inviteId,
    ));
  }

  handleFacebook() {
    this.props.dispatch(facebookLogin());
  }

  handleTwitter() {
    this.props.dispatch(twitterLogin());
  }

  handleGoogle() {
    this.props.dispatch(googleLogin());
  }

  handleVk() {
    this.props.dispatch(vkLogin());
  }

  handleGithub() {
    this.props.dispatch(githubLogin());
  }

  render() {
    return (
      <Grid centered verticalAlign="middle">
        <Grid.Column width={6} textAlign="left">
          <Messages messages={this.props.messages} />
          <Form onSubmit={this.handleSignup} size="large">
            <Header textAlign="center" as="h2" color="teal">Create an account</Header>
            <Segment padded>
              <Form.Field>
                <Form.Input
                  label="First Name"
                  name="firstName"
                  icon="quote left"
                  iconPosition="left"
                  placeholder="First Name"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Last Name"
                  name="lastName"
                  icon="quote left"
                  iconPosition="left"
                  placeholder="Last Name"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Email"
                  name="email"
                  icon="mail"
                  iconPosition="left"
                  placeholder="Email"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Password"
                  name="password"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Button fluid color="teal" size="large">Create Account</Button>
              <Divider horizontal>Or</Divider>
              <Button fluid color="blue" size="large">Create Account with Facebook</Button>
            </Segment>
          </Form>
          <Header textAlign="center" size="tiny">
            By signing up, you agree to the <Link to="/">Terms of Service</Link>.
          </Header>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  messages: state.messages,
});

export default connect(mapStateToProps)(Signup);
