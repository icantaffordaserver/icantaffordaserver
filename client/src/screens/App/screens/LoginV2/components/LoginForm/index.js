import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Grid,
  Segment,
  Input,
  Image,
  Form,
  Divider,
  Message,
} from 'semantic-ui-react';

import logo from '../../../../shared/assets/logo.png';
import { LoginButton, FormLabel, FormLink } from './styles';
import { validateLogin } from './helpers';

class LoginForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
  };

  static defaultProps = {
    error: '',
  };

  state = {
    email: '',
    password: '',
    error: '',
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event, data) => {
    event.preventDefault(); // prevent page reload
    this.setState({ error: '' }); // clear any old errors
    const { email, password } = data.formData;
    const loginErrors = validateLogin(email, password);
    if (typeof loginErrors === 'string') {
      // if validate login returns string we have an error
      this.setState({ error: loginErrors });
      return;
    }
    this.props.onSubmit(email, password);
  };

  renderErrors = () => {
    if (this.state.error !== '') {
      return <Message error header={this.state.error} />;
    }
    if (this.props.error !== '') {
      return <Message error header={this.props.error} />;
    }
    return null;
  };

  render() {
    const error = this.state.error !== '' || this.props.error !== '';

    return (
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column width={9}>
          <Segment padded loading={this.props.loading}>
            <Image src={logo} alt="Shift" size="medium" centered />

            <Form onSubmit={this.handleSubmit} size="large" error={error}>
              {this.renderErrors()}
              <Form.Group inline widths={9}>
                <Form.Field width={16}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    fluid
                    name="email"
                    placeholder="your@email.com"
                    onChange={this.handleChange}
                    value={this.state.email}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group inline widths={9}>
                <Form.Field width={16}>
                  <FormLabel htmlFor="passowrd">Password</FormLabel>
                  <Input
                    fluid
                    name="password"
                    placeholder="*********"
                    type="password"
                    onChange={this.handleChange}
                    value={this.state.password}
                  />
                </Form.Field>
              </Form.Group>
              <LoginButton size="large" width={6}>
                Login
              </LoginButton>
              <Divider />
              <Segment basic inline>
                <Link to="/">
                  <FormLink href="/"> Forgot Passowrd? </FormLink>
                </Link>
                <Divider vertical />
                <Link to="/">
                  <FormLink href="/"> Don't have an account? </FormLink>
                </Link>
              </Segment>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default LoginForm;
