import React from 'react';
import { Link } from 'react-router-dom';
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
import logo from './logo.png';

const propTypes = {
  email: React.PropTypes.string.isRequired,
  password: React.PropTypes.string.isRequired,
  handleChange: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
};

class Login extends React.Component {

  render() {
    return (
      <Grid centered verticalAlign="middle">
        <Grid.Column width={6} textAlign="center">
          <Image src={logo} alt="Shift" size="medium" centered />
          <Form onSubmit={this.props.handleSubmit} size="large">
            <Segment padded>
              <Header as="h2" color="teal">
                Log-in to your account
              </Header>
              <Form.Field>
                <Input
                  name="email"
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  onChange={this.props.handleChange}
                  value={this.props.email}
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
                  onChange={this.props.handleChange}
                  value={this.props.password}
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

Login.propTypes = propTypes;

export default Login;
