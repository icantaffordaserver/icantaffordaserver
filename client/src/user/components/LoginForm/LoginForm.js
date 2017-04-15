import React from 'react';
import {
  Grid,
  Segment,
  Input,
  Button,
  Header,
  Image,
  Form,
  Divider,
  Message,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import { validateLogin } from '../../utils';

const propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool.isRequired,
  error: React.PropTypes.string,
};

const defaultProps = {
  error: '',
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event, data) => {
    event.preventDefault(); // prevent page reload
    this.setState({ error: '' }); // clear any old errors
    const { email, password } = data.formData;
    const loginErrors = validateLogin(email, password);
    if (typeof loginErrors === 'string') {  // if validate login returns string we have an error
      this.setState({ error: loginErrors });
      return;
    }
    this.props.onSubmit(email, password);
  };

  renderErrors = () => {
    if (this.state.error !== '') return <Message error header={this.state.error} />;
    if (this.props.error !== '') return <Message error header={this.props.error} />;
    return null;
  };

  render() {
    const error = this.state.error !== '' || this.props.error !== '';
    return (
      <Grid centered verticalAlign="middle">
        <Grid.Column width={6}>
          <Image src={logo} alt="Shift" size="medium" centered />
          <Segment padded loading={this.props.loading}>
            <Form onSubmit={this.handleSubmit} size="large" error={error}>
              {this.renderErrors()}
              <Header as="h2" color="teal" textAlign="center">
                Log-in to your account
              </Header>
              <Form.Field>
                <Input
                  name="email"
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  onChange={this.handleChange}
                  value={this.state.email}
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
                  value={this.state.password}
                />
              </Form.Field>
              <Button fluid color="teal" size="large">Login</Button>
            </Form>
            <Divider horizontal>Or</Divider>
            <Link to="/signup">
              <Button fluid color="blue" size="large" content=" Sign Up " />
            </Link>
            <Header as="h4" textAlign="center">
              <Link to="/forgot">
                <strong>Forgot your password?</strong>
              </Link>
            </Header>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;

export default Login;
