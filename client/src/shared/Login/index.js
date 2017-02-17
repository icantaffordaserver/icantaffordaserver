import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {
  Grid,
  Segment,
  Input,
  Button,
  Header,
  Image,
  Form,
  Divider,
} from 'semantic-ui-react';
import Messages from '../Messages';
import { loginRequest } from '../redux/auth/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = { email: '', password: '' };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleLogin(event) {
    event.preventDefault();
    this.props.dispatch(loginRequest({ email: this.state.email, password: this.state.password }));
  }


  render() {
    return (
      <Grid centered verticalAlign="middle">
        <Grid.Column width={6} textAlign="center">
          <Header as="h2" color="teal">
            <Image src="http://semantic-ui.com/examples/assets/images/logo.png" />
            Log-in to your account
          </Header>
          <Messages messages={this.props.messages} />
          <Form onSubmit={this.handleLogin} size="large">
            <Segment padded>
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
              <Form.Field>
                <Input
                  name="password"
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Button fluid color="teal" size="large">Login</Button>
              <Divider horizontal>Or</Divider>
              <Button as={Link} to="/signup" fluid color="blue" size="large">Sign up</Button>
              <Header as="h4">
                <Link to="/forgot">
                  <strong>Forgot your password?</strong>
                </Link>
              </Header>
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

export default connect(mapStateToProps)(Login);
