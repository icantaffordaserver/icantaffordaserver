/**
 * Created by alexandermann on 2017-03-01.
 */
import React from 'react';
import { graphql, withApollo, compose } from 'react-apollo';
import SignupComponent from '../components/Signup';
import SignupMutation from '../../graphql/auth/SignupMutation';
import SignInMutation from '../../graphql/auth/SignInMutation';

const propTypes = {};

const defaultProps = {};

class SignupContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = { firstName: '', lastName: '', email: '', password: '' };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSignup(event) {
    event.preventDefault();

    const { email, password, firstName, lastName } = this.state;
    await this.props.signupMutation({
      variables: {
        email,
        password,
        firstName,
        lastName,
      },
    });
    const signInResponse = await this.props.signInMutation({
      variables: {
        email,
        password,
      },
    });

    // save the token in local storage, reset the store to requery user data, and redirect to dashboard
    window.localStorage.setItem('graphcoolToken', signInResponse.data.signinUser.token); // save token
    this.props.client.resetStore();
    this.props.replace('/');

  }

  render() {
    const { firstName, lastName, email, password } = this.state;
    return (
      <SignupComponent
        handleSubmit={this.handleSignup}
        handleChange={this.handleChange}
        firstName={firstName}
        lastName={lastName}
        email={email}
        password={password}
      />
    );
  }

}

SignupContainer.propTypes = propTypes;
SignupContainer.defaultProps = defaultProps;

export default compose(
  graphql(SignupMutation, { name: 'signupMutation' }), // define the name of the mutation on the props object
  graphql(SignInMutation, { name: 'signInMutation' })
)(withApollo(SignupContainer));
