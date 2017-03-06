/**
 * Created by alexandermann on 2017-03-02.
 */
import React from 'react';
import { graphql } from 'react-apollo';
import ForgotPasswordComponent from '../components/ForgotPasswordComponent';
import forgotPasswordMutation from '../../graphql/auth/forgotPasswordMutation';

const propTypes = {
  mutate: React.PropTypes.func.isRequired,
};

class ForgotPasswordContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { email: '', loading: false, success: false, error: false, message: '' };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { email } = this.state;
    try {
      this.setState({ loading: true });
      await this.props.mutate({ variables: { email } });
      this.setState({
        loading: false,
        success: true,
        error: false,
        message: 'Check your inbox for password reset instructions.',
      });
    } catch (err) {
      this.setState({ loading: false, success: false, error: true, message: err.message });
    }
  }

  render() {
    return (
      <ForgotPasswordComponent
        email={this.state.email}
        loading={this.state.loading}
        success={this.state.success}
        error={this.state.error}
        message={this.state.message}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

ForgotPasswordContainer.propTypes = propTypes;

export default graphql(forgotPasswordMutation)(ForgotPasswordContainer);
